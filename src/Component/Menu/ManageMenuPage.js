
import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Table, Modal } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import RedirectTo from '../../Constant/RedirectTo'
import { CommonUtil } from '../../Util/CommonUtil'
import Messages from '../../Constant/Messages'
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

    componentWillUnmount() {
        this.props.store.home.setResponseStatus("");
        this.props.store.home.setResponseClass("");
    }

    handleCreate() {
        this.props.store.menu.setMenuObject({});
        this.context.router.history.push(RedirectTo.MENU_MODAL);
    }

    handleEdit(original) {
        this.props.store.menu.setMenuObject(original);
        this.context.router.history.push(RedirectTo.MENU_MODAL);
    }

    handleDelete() {
        let original = this.state.originalData;
        let tempArray = [];
        axios.delete(RedirectTo.AXIOS_DELETE_MENU + "?menuId=" + original.id)
            .then(response => {
                console.log(response);
                if (response.status == 204) {
                    tempArray = this.props.store.menu.menuList;
                    tempArray = tempArray.filter(menu => menu.id != original.id);
                    this.props.store.menu.setMenuList(tempArray);
                    this.props.store.home.setResponseStatus(Messages.MENU_DELETED_SUCCESS);
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
        const isLoggedIn = this.props.store.home.isLoggedIn;
        const data = this.props.store.menu.menuList;
        const responseStatus = this.props.store.home.responseStatus;
        const responseClass = this.props.store.home.responseClass;
        const open = this.state.open
        let firstColumnWidth = 13;
        let secondColumnWidth = 3;
        if (isMobile) {
            firstColumnWidth = 11;
            secondColumnWidth = 5;
        }

        const item = data;
        let menuListArray = [];
        for (let i = 0; i < item.length; i++) {
            menuListArray.push(
                <Table.Row key={i} >
                    <Table.Cell>{item[i].name} </Table.Cell>
                    <Table.Cell>
                        <Button circular color='yellow' icon='edit' onClick={() => this.handleEdit(item[i])} />
                        <Button circular color='red' icon='delete' onClick={this.closeConfigShow(item[i])} />
                    </Table.Cell>
                </Table.Row>
            )
        }

        if (item.length == 0) {
            menuListArray.push(
                <Table.Row key="nodata" textAlign='center'>
                    <Table.Cell colSpan='2'>
                        {Messages.MENU_NOT_AVAILABLE}
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <div className="maincontain" >
                <BrowserView device={isBrowser}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column floated='left' width={4}>
                                <Header as='h3'>{Messages.MANAGE_YOUR_MENU}</Header>
                            </Grid.Column>
                            {responseStatus.length > 0 &&
                                <Grid.Column width={8} className="textaligncenter">
                                    <span className={responseClass}>{responseStatus}</span>
                                </Grid.Column>
                            }
                            <Grid.Column floated='right' width={4}>
                                <div className="floatRight">
                                    <Button color='green' onClick={() => this.handleCreate()}>Create</Button>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </BrowserView>
                <MobileView device={isMobile}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column floated='left' width={10}>
                                <Header as='h3'>{Messages.MANAGE_YOUR_MENU}</Header>
                            </Grid.Column>
                            <Grid.Column floated='right' width={6}>
                                <div className="floatRight">
                                    <Button circular color='green' icon='add' onClick={() => this.handleCreate()} />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        {responseStatus.length > 0 &&
                            <Grid.Row>
                                <Grid.Column className="textaligncenter">
                                    <span className={responseClass}>{responseStatus}</span>
                                </Grid.Column>
                            </Grid.Row>
                        }
                    </Grid>
                </MobileView>

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
                    <Modal.Header>{Messages.DELETE_YOUR_MENU}</Modal.Header>
                    <Modal.Content>
                        <p>{Messages.ARE_SURE_WANT_TO_DELETE_MENU} <b>{this.state.originalData.name}</b>?</p>
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