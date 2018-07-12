import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Icon } from 'semantic-ui-react'
import RedirectTo from '../../Constant/RedirectTo'
import Validation from '../../Constant/Validation'
import Messages from '../../Constant/Messages'
import PropTypes from 'prop-types'

@inject(['store'])
@observer
class MenuModal extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: true,
            name: "",
            modalTitle: "",
        }
    }

    close = () => {
        this.setState({ open: false })
        this.context.router.history.push(RedirectTo.MANAGE_MENU);
    }

    handleMenuSubmit(e) {
        let list = [];
        let url = "";
        let menuId = this.props.store.menu.menuObject.id;
        let menuSubmitButton = document.getElementById("menuSubmitButton");
        let name = this.name.value;
        if (!name) {
            this.setState({
                name: Validation.MENU_NAME_EMPTY
            });
            return false;
        } else {
            menuSubmitButton.classList.add("loading");
            e.preventDefault();
        }

        let pageToRedirect = "";

        if (!menuId) {
            menuId = 0;
            url = RedirectTo.AXIOS_ADD_MENU;
        } else {
            url = RedirectTo.AXIOS_UPDATE_MENU;
        }
        axios.post(url, {
            id: menuId,
            name: this.name.value,
            userId: this.props.store.home.user.id
        })
            .then(response => {
                console.log(response);
                if (response.status == 201 || response.status == 208 || response.status == 200) {
                    if (response.status == 201) {
                        for (var key in response.data) {
                            list.push(response.data[key]);
                        }
                    } else {
                        list = this.props.store.menu.menuList;
                        if (url.indexOf("updateMenu") != -1) {
                            let objIndex = list.findIndex((obj => obj.id == menuId));
                            //console.log("Before update: ", list[objIndex])
                            list[objIndex].name = name; //Update object's name property
                            //console.log("After update: ", list[objIndex])
                        }
                    }
                    this.props.store.menu.setMenuList(list);
                    //clear the errors from server if successfullly registerd
                    this.setState({
                        open: false,
                        name: ""
                    });
                    if (response.status == 208) {
                        this.props.store.home.setResponseStatus(Messages.MENU_ADDED_ALREADY);
                        this.props.store.home.setResponseClass(Messages.YELLOW_GREEN);
                    } else if (response.status == 200) {
                        this.props.store.home.setResponseStatus(Messages.MENU_UPDATED_SUCCESS);
                        this.props.store.home.setResponseClass(Messages.GREEN);
                    } else {
                        this.props.store.home.setResponseStatus(Messages.MENU_ADDED_SUCCESS);
                        this.props.store.home.setResponseClass(Messages.GREEN);
                    }
                    this.context.router.history.push(RedirectTo.MANAGE_MENU);
                }
            })
            .catch(error => {
                //console.log(error.response);
                let errorMsg = "", httpStatus = "";
                if (error.response) {
                    httpStatus = (error.response.status).toString();
                    errorMsg = httpStatus.startsWith("5") ? Messages.RESPONSE_ERROR_MSG : Messages.REQUEST_ERROR_MSG;
                } else {
                    errorMsg = Messages.REQUEST_ERROR_MSG;
                }
                this.props.store.home.setResponseStatus(errorMsg);
                this.props.store.home.setResponseClass(Messages.RED);
                this.context.router.history.push(RedirectTo.MANAGE_MENU);
            });
        menuSubmitButton.classList.remove("loading");
    }

    componentWillMount() {
        let modalTitle = Messages.ADD;
        let name = this.props.store.menu.menuObject.name;
        if (typeof name !== "undefined" && name != "") {
            modalTitle = Messages.UPDATE;
        }
        this.setState({
            modalTitle: modalTitle
        });

    }


    render() {
        const open = this.state.open;
        const nameErrMsg = this.state.name;
        const defaultName = this.props.store.menu.menuObject.name;

        return (
            <div>
                <Modal size={'small'} open={open} onClose={this.close} style={{ top: "40%" }}>
                    <Modal.Header>{this.state.modalTitle} {Messages.MENU}</Modal.Header>
                    <Modal.Content>
                        <Form size='large'>
                            <Form.Field>
                                <div className="ui left icon input">
                                    <input
                                        placeholder='Menu Name'
                                        type="text"
                                        defaultValue={defaultName}
                                        ref={(name) => this.name = name}
                                    />
                                    {nameErrMsg.length > 0 && <Label pointing='left'>{nameErrMsg}</Label>}
                                </div>
                            </Form.Field>

                        </Form>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>Cancel</Button>
                        <Button positive id="menuSubmitButton" onClick={this.handleMenuSubmit.bind(this)} icon='checkmark' labelPosition='right' content='Save' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default MenuModal