import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactTable from 'react-table'
import { Redirect } from 'react-router'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal } from 'semantic-ui-react'
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
            originalData: {}
        }

    }


    handleTopicDisplayBox(original) {
        this.props.store.topic.setTopicObject(original);
    }

    handleClick(menuId, name) {
        this.context.router.history.push(RedirectTo.TOPIC_LIST);
    }

    render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        const data = this.props.store.topic.topicList;
        const open = this.state.open
        const menuName = this.props.store.menu.menuName;

        const columns = [{
            Header: 'Topic Name',
            Cell: row => (
                <div>
                    <span className="spanlink" onClick={() => this.handleTopicDisplayBox(row.original)}>{row.original.title}</span>
                </div>)
        }]
        return (
            <div className="maincontain" >
            <Button onClick={this.handleClick.bind(this)}>Manage Topics</Button> 
            <Header as='h2'> {menuName}</Header>

               
            
                

                <BrowserView device={isBrowser}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={12}>
                    <TopicDisplayBox />
                </Grid.Column>
                <Grid.Column width={4}>
                <ReactTable
                    data={data}
                    columns={columns}
                    resolveData={data => data.map(row => row)}
                    showPagination={true}
                    showPageSizeOptions= {true}
                    pageSizeOptions= {[5, 10, 20, 25, 50, 100]}
                    defaultPageSize= {10}
                    minRows={5}
                />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </BrowserView>
          <MobileView device={isMobile}>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column >
                    Need to show topic page
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </MobileView>

            </div>
        )
    }
}

export default TopicPage