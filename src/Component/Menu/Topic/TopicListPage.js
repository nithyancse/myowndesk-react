import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Table, Menu } from 'semantic-ui-react'
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
        const open = this.state.open

        const columns = [{
            Header: 'Topic Name',
            accessor: 'title'
        },
        {
            Header: 'Topic Type',
            accessor: 'type'
        },
        {
            Header: '',
            Cell: row => (
                <div>
                    <button onClick={() => this.handleEdit(row.original)}>Edit</button>
                    <button onClick={this.closeConfigShow(row.original)}>Delete</button>
                </div>)
        }]

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
                <Table.Cell>{item[i].type} </Table.Cell>
                <Table.Cell>
                    <button onClick={() => this.handleEdit(item[i])}>Edit</button>
                    <button onClick={this.closeConfigShow(item[i])}>Delete</button>
                </Table.Cell>
            </Table.Row>)
        }

        return (
            <div className="maincontain" >
                <Header as='h4'> Topic page</Header>
                <Button onClick={() => this.handleCreate()}>Create</Button>
                <Button onClick={this.handleGoBack.bind(this)}>Go Back</Button>

                Search: <input
                    value={this.state.search}
                    onChange={e => this.setState({ search: e.target.value })}
                />
                <Table basic>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
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