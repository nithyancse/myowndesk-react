
import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Table } from 'semantic-ui-react'
import RedirectTo from '../../Constant/RedirectTo'
import { CommonUtil } from '../../Util/CommonUtil'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'

@inject(['store'])
@observer
class ManageMenuPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    componentWillMount() {

    }

    handleCreate() {
        this.context.router.history.push(RedirectTo.MENU);
    }

    handleEdit(original) {
        this.props.store.menu.setMenuObject(original);
        this.context.router.history.push(RedirectTo.MENU);
    }

    handleDelete(original) {
        let tempArray = [];
        let message = "", color="";
        axios.delete(RedirectTo.AXIOS_DELETE_MENU+"?menuId="+original.id)
            .then(response => {
                console.log(response);
                if (response.status == 204) {
                    tempArray = this.props.store.menu.menuList;
                    tempArray = tempArray.filter(menu => menu.id != original.id);
                    this.props.store.menu.setMenuList(tempArray);
                    color = "green";
                    message = "Menu deleted successfully";
                    this.props.store.home.setResponseStatus(message);
                    this.props.store.home.setResponseColor(color);
                    alert(message);
                }
            })
            .catch(error => {
                alert(error.response);
                //this.props.handleMessage(error.response.data.message, "red");
            });
    }


    render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        const data = this.props.store.menu.menuList;

        const columns = [{
            Header: 'Menu Name',
            accessor: 'name'
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

                MenuManagePage

            <button onClick={() => this.handleCreate()}>create</button>

                <div>

                    <ReactTable
                        data={data}
                        columns={columns}
                        resolveData={data => data.map(row => row)}
                        showPagination={false}
                        minRows={5}
                    />
                </div>
            </div>
        )
    }
}

export default ManageMenuPage