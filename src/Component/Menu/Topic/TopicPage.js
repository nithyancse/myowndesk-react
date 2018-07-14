import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Sidebar, Table, Menu, Input, Icon } from 'semantic-ui-react'
import RedirectTo from '../../../Constant/RedirectTo'
import Validation from '../../../Constant/Validation'
import Messages from '../../../Constant/Messages'
import PropTypes from 'prop-types'
import TopicDisplayBox from './TopicDisplayBox'

@inject(['store'])
@observer
class TopicPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            search: '',
            visible: false
        }
    }

    componentWillMount() {
        if(!sessionStorage.getItem(Messages.SESSION_IS_ACTIVE)){
            this.context.router.history.push(RedirectTo.LOGIN);
            return false;
        }
        let menuId = this.props.store.menu.menuId;
        let isRefresh = this.props.store.home.isRefresh;
        if (isRefresh) {
            let prevTopicId = 0, nextTopicId = 0;
            let isTopicPresent = false;
            let list = [];
            let original = {};
            let url = RedirectTo.AXIOS_FETCH_TOPIC_LIST + menuId;
            axios.get(url)
                .then((response) => {
                    //console.log(response.data)
                    for (var key in response.data) {
                        if (key == 0) {
                            original = response.data[key];
                            isTopicPresent = true;
                        }
                        if (key == 1) {
                            nextTopicId = response.data[key].id;
                        }
                        list.push(response.data[key]);
                    }
                    this.props.store.topic.setTopicList(list);
                    this.props.store.topic.setTopicObject(original);
                    this.props.store.topic.setPrevTopicId(prevTopicId);
                    this.props.store.topic.setNextTopicId(nextTopicId);
                    if (isTopicPresent) {
                        this.context.router.history.push(RedirectTo.TOPIC);
                    } else {
                        this.context.router.history.push(RedirectTo.TOPIC_LIST);
                    }
                })
                .catch((error) => {
                    //console.log(error.response);
                });
        }
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
        this.toggleVisibility();
    }

    handleClick(menuId, name) {
        this.context.router.history.push(RedirectTo.TOPIC_LIST);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const mainMinHeight = this.props.store.home.mainMinHeight;
        const isLoggedIn = this.props.store.home.isLoggedIn;
        let data = this.props.store.topic.topicList;
        const menuName = this.props.store.menu.menuName;
        const prevTopicId = this.props.store.topic.prevTopicId;
        const nextTopicId = this.props.store.topic.nextTopicId;
        const { visible } = this.state;

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
                    <Table.Cell className="link" onClick={() => this.handleTopicDisplayBox(item[i].id)} >
                        {item[i].title}
                    </Table.Cell>
                </Table.Row>
            )
        }

        if (item.length == 0) {
            topicListArray.push(
                <Table.Row key="nodata" textAlign='center'>
                    <Table.Cell colSpan='2'>
                        {Messages.TOPIC_NOT_FOUND}
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <div className="maincontain" style={{ minHeight: mainMinHeight }}>
                <Grid >
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Header as='h3'>{menuName}</Header>
                        </Grid.Column>
                        <Grid.Column width={10} >
                            <div className="floatRight">
                                <BrowserView device={isBrowser}>
                                    {prevTopicId != 0 && <Button content='Previous' icon='left arrow' labelPosition='left' onClick={() => this.handleTopicDisplayBox(prevTopicId)} />}
                                    {nextTopicId != 0 && <Button content='Next' icon='right arrow' labelPosition='right' onClick={() => this.handleTopicDisplayBox(nextTopicId)} />}
                                    <Button content='Topic List' color='green' icon='bars' onClick={this.toggleVisibility} />
                                    <Button content='Manage Topics' color='yellow' name='edit' icon='edit' onClick={this.handleClick.bind(this)} />
                                </BrowserView>
                                <MobileView device={isMobile}>
                                    {prevTopicId != 0 && <Button circular icon='left arrow' onClick={() => this.handleTopicDisplayBox(prevTopicId)} />}
                                    {nextTopicId != 0 && <Button circular icon='right arrow' onClick={() => this.handleTopicDisplayBox(nextTopicId)} />}
                                    <Button circular color='green' icon='bars' onClick={this.toggleVisibility} />
                                    <Button circular color='yellow' name='edit' icon='edit' onClick={this.handleClick.bind(this)} />
                                </MobileView>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        width='thin'
                        direction='right'
                        visible={visible}
                        icon='labeled'
                        vertical
                        inverted
                        className="sidebartopic padding10"
                    >
                        <div style={{ height: '50px' }}>
                            <Input
                                value={this.state.search}
                                icon={<Icon name='search' inverted circular link />}
                                onChange={e => this.setState({ search: e.target.value })}
                                placeholder='Search...'
                                className="floatLeft width80"
                            />
                            <span className="floatRight">
                                <Button circular color='red' icon='close' onClick={this.toggleVisibility} />
                            </span>
                        </div>
                        <div>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Topics
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {topicListArray}
                                </Table.Body>
                            </Table>
                        </div>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <TopicDisplayBox />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <BrowserView device={isBrowser}>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column floated='left' width={3}>
                                {prevTopicId != 0 && <Button floated='left' content='Previous' icon='left arrow' labelPosition='left' onClick={() => this.handleTopicDisplayBox(prevTopicId)} />}
                            </Grid.Column>
                            <Grid.Column floated='right' width={3}>
                                {nextTopicId != 0 && <Button floated='right' content='Next' icon='right arrow' labelPosition='right' onClick={() => this.handleTopicDisplayBox(nextTopicId)} />}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid >
                </BrowserView>
                <MobileView device={isMobile}>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column floated='left' width={3}>
                                {prevTopicId != 0 && <Button circular floated='left' icon='left arrow' onClick={() => this.handleTopicDisplayBox(prevTopicId)} />}
                            </Grid.Column>
                            <Grid.Column floated='right' width={3}>
                                {nextTopicId != 0 && <Button circular floated='right' icon='right arrow' onClick={() => this.handleTopicDisplayBox(nextTopicId)} />}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid >
                </MobileView>
            </div>
        )
    }
}

export default TopicPage