import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactTable from 'react-table'
import { Redirect } from 'react-router'
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Container } from 'semantic-ui-react'
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
        this.state = {}
     
    }


    componentWillMount() {
        let list = [];
        let menuId =  1;
        let url = RedirectTo.AXIOS_FETCH_TOPIC_LIST+""+menuId;
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
        this.context.router.history.push(RedirectTo.TOPIC);
    }

      render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;

        const data = this.props.store.topic.topicList;

        const columns = [{
            Header: 'Topic Name',
            accessor: 'title'
        },
        {
            Header: '',
            Cell: row => (
                <div>
                    <button onClick={() => this.handleEdit(row.original)}>Edit</button>
                    <button onClick={() => this.handleDelete(row.original)}>Delete</button>
                </div>)
        }]
        return (
            <div className="maincontain" >
                        <Header as='h4'> Topic page</Header>
                        <button onClick={() => this.handleCreate()}>create</button>

                        <ReactTable
                        data={data}
                        columns={columns}
                        resolveData={data => data.map(row => row)}
                        showPagination={false}
                        minRows={5}
                    />
                  
            </div>
        )
    }
}

export default TopicListPage