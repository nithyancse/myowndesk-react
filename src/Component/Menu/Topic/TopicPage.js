import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Sidebar, Table, Menu } from 'semantic-ui-react'
import RedirectTo from '../../../Constant/RedirectTo'
import constValid from '../../../Constant/Validation'
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


    handleTopicDisplayBox(original) {
        this.props.store.topic.setTopicObject(original);
    }

    handleClick(menuId, name) {
        this.context.router.history.push(RedirectTo.TOPIC_LIST);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        let data = this.props.store.topic.topicList;
        const menuName = this.props.store.menu.menuName;
        const { visible } = this.state

        if (this.state.search) {
            data = data.filter(row => {
                return row.title.toLowerCase().includes(this.state.search.toLowerCase())
            })
        }

        const item = data;
        let topicListArray = [];
        for (let i = 0; i < item.length; i++) {
            topicListArray.push(<Table.Row key={i} ><Table.Cell className="link" onClick={() => this.handleTopicDisplayBox(item[i])} >{item[i].title} </Table.Cell></Table.Row>)

        }

        return (
            <div className="maincontain" >
                <BrowserView device={isBrowser}>
                    <Button onClick={this.handleClick.bind(this)}>Manage Topics</Button>
                    <Header as='h2'> {menuName}</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <TopicDisplayBox />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                Search: <input
                                    value={this.state.search}
                                    onChange={e => this.setState({ search: e.target.value })}
                                />
                                <Table basic>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Topics</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {topicListArray}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </BrowserView>
                <MobileView device={isMobile}>
                    <Button onClick={this.toggleVisibility}>Show Topic List</Button>
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
                        >
                            Search: <input
                                value={this.state.search}
                                onChange={e => this.setState({ search: e.target.value })}
                            />
                            <Table basic>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Topics</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {topicListArray}
                                </Table.Body>
                            </Table>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Button onClick={this.handleClick.bind(this)}>Manage Topics</Button>
                            <Header as='h2'> {menuName}</Header>
                            <Segment basic>
                                <TopicDisplayBox />
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </MobileView>
            </div>
        )
    }
}

export default TopicPage