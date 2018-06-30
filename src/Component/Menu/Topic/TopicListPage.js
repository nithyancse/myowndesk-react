import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Table, Menu, Icon, Input } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import RedirectTo from '../../../Constant/RedirectTo'
import constValid from '../../../Constant/Validation'
import PropTypes from 'prop-types'

@inject(['store'])
@observer
class TopicListPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            originalData: {},
            search: ''
        }
    }


    componentWillMount() {
        let list = [];
        let menuId = this.props.store.menu.menuId;
        let url = RedirectTo.AXIOS_FETCH_TOPIC_LIST + menuId;
        axios.get(url)
            .then((response) => {
                //console.log(response.data)
                for (var key in response.data) {
                    list.push(response.data[key]);
                }
                this.props.store.topic.setTopicList(list);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleCreate() {
        this.context.router.history.push(RedirectTo.TOPIC_MODAL);
    }

    handleEdit(original) {
        this.props.store.topic.setTopicObjectForEdit(original);
        this.context.router.history.push(RedirectTo.TOPIC_MODAL);
    }

    handleDelete() {
        let original = this.state.originalData;
        let tempArray = [];
        let message = "", color = "";
        axios.delete(RedirectTo.AXIOS_DELETE_TOPIC + "?topicId=" + original.id)
            .then(response => {
                console.log(response);
                if (response.status == 204) {
                    tempArray = this.props.store.topic.topicList;
                    tempArray = tempArray.filter(topic => topic.id != original.id);
                    this.props.store.topic.setTopicList(tempArray);
                    color = "green";
                    message = "Menu deleted successfully";
                    this.props.store.home.setResponseStatus(message);
                    this.props.store.home.setResponseColor(color);
                    alert(message);
                    this.close();
                }
            })
            .catch(error => {
                console.log(error.response);
                //this.props.handleMessage(error.response.data.message, "red");
            });
    }

    handleGoBack() {
        this.context.router.history.push(RedirectTo.TOPIC);
    }

    closeConfigShow = (originalData) => () => {
        this.setState({
            open: true,
            originalData: originalData
        })
    }

    close = () => {
        this.setState({
            open: false,
            originalData: {}
        })
    }

    render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        let data = this.props.store.topic.topicList;
        const open = this.state.open;
        let firstColumnWidth = 13;
        let secondColumnWidth = 3;
        if(isMobile){
            firstColumnWidth = 11;
            secondColumnWidth = 5;
        } 

        if (this.state.search) {
            data = data.filter(row => {
                return row.title.toLowerCase().includes(this.state.search.toLowerCase())
            })
        }

        const item = data;
        let topicListArray = [];
        for (let i = 0; i < item.length; i++) {
            topicListArray.push(<Table.Row key={i} >
                <Table.Cell className="link" onClick={() => this.handleTopicDisplayBox(item[i])} >{item[i].title} </Table.Cell>
                <Table.Cell>
                    <Button circular color='yellow' icon='edit' onClick={() => this.handleEdit(item[i])} />
                    <Button circular color='red' icon='delete' onClick={this.closeConfigShow(item[i])} />
                </Table.Cell>
            </Table.Row>)
        }

        return (
            <div className="maincontain" >
                <Grid >
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h3'>Manage your Topics</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row > 
                        <Grid.Column width={10}>
                            <Input icon={<Icon name='search' inverted circular link />} value={this.state.search}
                                onChange={e => this.setState({ search: e.target.value })}
                                placeholder='Search...'/>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                            <div className="floatRight">
                                <BrowserView device={isBrowser}>
                                    <Button color='green' onClick={() => this.handleCreate()}>Create</Button>
                                    <Button color='grey' onClick={this.handleGoBack.bind(this)}>Go Back</Button>
                                </BrowserView>
                                <MobileView device={isMobile}>
                                    <Button circular color='green' icon='add' onClick={() => this.handleCreate()} />
                                    <Button circular color='grey' icon='backward' onClick={this.handleGoBack.bind(this)} />
                                </MobileView>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                 <Table unstackable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={firstColumnWidth}>Title</Table.HeaderCell>
                            <Table.HeaderCell width={secondColumnWidth}>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {topicListArray}
                    </Table.Body>
                </Table>

                <Modal size={"small"}
                    open={open}
                    onClose={this.close}
                >
                    <Modal.Header>Delete Your Topic</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your topic {this.state.originalData.title}?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close} >No</Button>
                        <Button positive onClick={() => this.handleDelete()} labelPosition='right' icon='checkmark' content='Yes' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default TopicListPage