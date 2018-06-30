
import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Table, Modal } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
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
            open: false,
            originalData: {}
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
        let message = "", color = "";
        axios.delete(RedirectTo.AXIOS_DELETE_MENU + "?menuId=" + original.id)
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
        let firstColumnWidth = 13;
        let secondColumnWidth = 3;
        if(isMobile){
            firstColumnWidth = 11;
            secondColumnWidth = 5;
        } 

        const item = data;
        let menuListArray = [];
        for (let i = 0; i < item.length; i++) {
            menuListArray.push(<Table.Row key={i} >
                <Table.Cell>{item[i].name} </Table.Cell>
                <Table.Cell>
                    <Button circular color='yellow' icon='edit' onClick={() => this.handleEdit(item[i])} />
                    <Button circular color='red' icon='delete' onClick={this.closeConfigShow(item[i])} />
                </Table.Cell>
            </Table.Row>)
        }

        return (

            <div className="maincontain" >
                <Grid>
                    <Grid.Column floated='left' width={11}>
                        <Header as='h3'>Manage your menu</Header>
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                        <div className="floatRight">
                            <BrowserView device={isBrowser}>
                                <Button color='green' onClick={() => this.handleCreate()}>Create</Button>
                            </BrowserView>
                            <MobileView device={isMobile}>
                                <Button circular color='green' icon='add' onClick={() => this.handleCreate()} />
                            </MobileView>
                        </div>
                    </Grid.Column>
                </Grid>

                <Table unstackable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={firstColumnWidth}>Menu Name</Table.HeaderCell>
                            <Table.HeaderCell width={secondColumnWidth}>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {menuListArray}
                    </Table.Body>
                </Table>

                <Modal size={"small"}
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