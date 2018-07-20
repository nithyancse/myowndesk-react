import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Table, Menu, Icon, Input } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import RedirectTo from '../../../Constant/RedirectTo'
import Validation from '../../../Constant/Validation'
import Messages from '../../../Constant/Messages'
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
        this.props.store.topic.setIsFromTopicPage(false);
        if(!sessionStorage.getItem(Messages.SESSION_IS_ACTIVE)){
            this.context.router.history.push(RedirectTo.LOGIN);
            return false;
        }
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

    componentWillUnmount() {
        this.props.store.home.setResponseStatus("");
        this.props.store.home.setResponseClass("");
    }

    handleCreate() {
        this.props.store.topic.setTopicObjectForEdit({});
        this.context.router.history.push(RedirectTo.TOPIC_MODAL);
    }

    handleEdit(original) {
        this.props.store.topic.setTopicObjectForEdit(original);
        this.context.router.history.push(RedirectTo.TOPIC_MODAL);
    }

    handleDelete() {
        let original = this.state.originalData;
        let tempArray = [];
        axios.delete(RedirectTo.AXIOS_DELETE_TOPIC + "?topicId=" + original.id)
            .then(response => {
                console.log(response);
                if (response.status == 204) {
                    tempArray = this.props.store.topic.topicList;
                    tempArray = tempArray.filter(topic => topic.id != original.id);
                    this.props.store.topic.setTopicList(tempArray);
                    this.props.store.home.setResponseStatus(Messages.TOPIC_DELETED_SUCCESS);
                    this.props.store.home.setResponseClass(Messages.GREEN);
                    this.close();
                }
            })
            .catch(error => {
                //console.log(error.response);
                let httpStatus = (error.response.status).toString();
                let errorMsg = httpStatus.startsWith("5") ? Messages.RESPONSE_ERROR_MSG : Messages.REQUEST_ERROR_MSG;
                this.props.store.home.setResponseStatus(errorMsg);
                this.props.store.home.setResponseClass(Messages.RED);
            });
    }

    handleTopicDisplayBox(topicId) {
        let item = this.props.store.topic.topicList;
        let prevTopicId = 0;
        let nextTopicId = 0;
        let status = false;
        //console.log(topicId);
        for (let i = 0; i < item.length; i++) {
            if (item[i].id == topicId) {
                this.props.store.topic.setTopicObject(item[i]);
                if (i == 0) {
                    prevTopicId = 0;
                    if (i < item.length - 1) {
                        nextTopicId = item[i + 1].id;
                    }
                }
                if (i != 0 && i == item.length - 1) {
                    nextTopicId = 0;
                    prevTopicId = item[i - 1].id;
                }
                if (i != 0 && i != item.length - 1) {
                    prevTopicId = item[i - 1].id;
                    nextTopicId = item[i + 1].id;
                }
                this.props.store.topic.setPrevTopicId(prevTopicId);
                this.props.store.topic.setNextTopicId(nextTopicId);
                break;
            }
        }
        this.context.router.history.push(RedirectTo.TOPIC);
    }

    handleGoBack() {
        this.context.router.history.push(RedirectTo.TOPIC);
    }

    closeConfigShow = (originalData) => () => {
        this.props.store.home.setResponseStatus("");
        this.props.store.home.setResponseClass("");
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
        const mainMinHeight = this.props.store.home.mainMinHeight;
        const isLoggedIn = this.props.store.home.isLoggedIn;
        let data = this.props.store.topic.topicList;
        const responseStatus = this.props.store.home.responseStatus;
        const responseClass = this.props.store.home.responseClass;
        const open = this.state.open;
        let firstColumnWidth = 13;
        let secondColumnWidth = 3;
        if (isMobile) {
            firstColumnWidth = 10;
            secondColumnWidth = 6;
        }

        if (this.state.search) {
            data = data.filter(row => {
                return row.title.toLowerCase().includes(this.state.search.toLowerCase())
            })
        }

        const item = data;
        let topicListArray = [];
        for (let i = 0; i < item.length; i++) {
            topicListArray.push(
                <Table.Row key={i} >
                    <Table.Cell className="link" onClick={() => this.handleTopicDisplayBox(item[i].id)} >{item[i].title} </Table.Cell>
                    <Table.Cell>
                        <Button circular color='yellow' icon='edit' onClick={() => this.handleEdit(item[i])} />
                        <Button circular color='red' icon='delete' onClick={this.closeConfigShow(item[i])} />
                    </Table.Cell>
                </Table.Row>
            )
        }

        if (item.length == 0) {
            topicListArray.push(
                <Table.Row key="nodata" textAlign='center'>
                    <Table.Cell colSpan='2'>
                        {Messages.TOPIC_NOT_AVAILABLE}
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <div className="maincontain" style={{minHeight:mainMinHeight}}>
                <BrowserView device={isBrowser}>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h3'>{Messages.MANAGE_YOUR_TOPIC}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={4}>
                                <Input icon={<Icon name='search' inverted circular link />} value={this.state.search}
                                    onChange={e => this.setState({ search: e.target.value })}
                                    placeholder='Search...' />
                            </Grid.Column>
                            {responseStatus.length > 0 &&
                                <Grid.Column width={6} className="textaligncenter">
                                    <span className={responseClass}>{responseStatus}</span>
                                </Grid.Column>
                            }
                            <Grid.Column floated='right' width={6}>
                                <div className="floatRight">
                                    <Button color='green' onClick={() => this.handleCreate()}>Create</Button>
                                    <Button color='grey' onClick={this.handleGoBack.bind(this)}>Go Back</Button>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </BrowserView>
                <MobileView device={isMobile}>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h3'>{Messages.MANAGE_YOUR_TOPIC}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        {responseStatus.length > 0 &&
                            <Grid.Row>
                                <Grid.Column className="textaligncenter">
                                    <span className={responseClass}>{responseStatus}</span>
                                </Grid.Column>
                            </Grid.Row>
                        }
                        <Grid.Column width={10}>
                            <Input icon={<Icon name='search' inverted circular link />} value={this.state.search}
                                onChange={e => this.setState({ search: e.target.value })}
                                placeholder='Search...' />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <div className="floatRight">
                                <Button circular color='green' icon='add' onClick={() => this.handleCreate()} />
                                <Button circular color='grey' icon='arrow left' onClick={this.handleGoBack.bind(this)} />
                            </div>
                        </Grid.Column>
                    </Grid>
                </MobileView>

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
                    <Modal.Header>{Messages.DELETE_YOUR_TOPIC}</Modal.Header>
                    <Modal.Content>
                        <p>{Messages.ARE_SURE_WANT_TO_DELETE_TOPIC} <b>{this.state.originalData.title}</b>?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close} >Cancel</Button>
                        <Button positive onClick={() => this.handleDelete()} labelPosition='right' icon='checkmark' content='Delete' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default TopicListPage