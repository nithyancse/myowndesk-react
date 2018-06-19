
import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Table, Modal } from 'semantic-ui-react'
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
            open:false,
            originalData : {}
        }
    }

    componentWillMount() {

    }

    handleCreate() {
        this.context.router.history.push(RedirectTo.MENU_MODAL);
    }

    handleEdit(original) {
        this.props.store.menu.setMenuObject(original);
        this.context.router.history.push(RedirectTo.MENU_MODAL);
    }

    handleDelete() {
        let original = this.state.originalData;
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
                    this.close();
                }
            })
            .catch(error => {
                alert(error.response);
                //this.props.handleMessage(error.response.data.message, "red");
            });
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
        const data = this.props.store.menu.menuList;
        const open = this.state.open

        const columns = [{
            Header: 'Menu Name',
            accessor: 'name'
        },
        {
            Header: '',
            Cell: row => (
                <div>
                    <button onClick={() => this.handleEdit(row.original)}>Edit</button>
                    <button onClick={this.closeConfigShow(row.original)}>Delete</button>
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
                        minRows={3}
                    />
                </div>


                <Modal  size={"small"}
                    open={open}
                    onClose={this.close}
                >
                    <Modal.Header>Delete Your Menu</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your menu <b>{this.state.originalData.name}</b>?</p>
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

export default ManageMenuPage