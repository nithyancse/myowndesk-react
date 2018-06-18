import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Icon } from 'semantic-ui-react'
import RedirectTo from '../../Constant/RedirectTo'
import constValid from '../../Constant/Validation'
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
            size: "small",
            name: ""
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
        let color = "", message = "";
        if (!name) {
            this.setState({
                name: constValid.MENU_NAME_EMPTY
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
                            if (name == response.data[key].name) {
                                this.props.store.menu.setMenuId(response.data[key].id);
                                this.props.store.menu.setMenuName(name);
                            }
                            list.push(response.data[key]);
                        }
                    } else {
                        list = this.props.store.menu.menuList;
                        let objIndex = list.findIndex((obj => obj.id == menuId));
                        //Log object to Console.
                        console.log("Before update: ", list[objIndex])
                        //Update object's name property.
                        list[objIndex].name = name
                        //Log object to console again.
                        console.log("After update: ", list[objIndex])
                        this.props.store.menu.setMenuId(menuId);
                        this.props.store.menu.setMenuName(name);
                    }
                    this.props.store.menu.setMenuList(list);
                    //clear the errors from server if successfullly registerd
                    this.setState({
                        open: false,
                        name: ""
                    });
                    if (response.status == 208) {
                        color = "yellow";
                        message = "Menu already added";
                    } else if (response.status == 200) {
                        color = "yellow";
                        message = "Menu updated successfully";
                    } else {
                        color = "green";
                        message = "Menu added successfully";
                    }
                    this.props.store.home.setResponseStatus(message);
                    this.props.store.home.setResponseColor(color);
                    alert(message);
                    this.context.router.history.push(RedirectTo.MANAGE_MENU);
                }
            })
            .catch(error => {
                alert(error.response.data.message);
                this.context.router.history.push(RedirectTo.MANAGE_MENU);
                //this.props.handleMessage(error.response.data.message, "red");
            });
        menuSubmitButton.classList.remove("loading");
    }


    render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        const { open, size } = this.state;
        const nameErr = this.state.name;
        const menuNameValue = this.props.store.menu.menuObject.name;
        const menuIdValue = this.props.store.menu.menuObject.id;
        const name = this.state.name;

        return (
            <div>
                <Modal size={'small'} open={open} onClose={this.close} style={{ top: "40%" }}>
                    <Modal.Header>Add Menu</Modal.Header>
                    <Modal.Content>

                        <Form size='large'>

                            <Form.Field>
                                <div className="ui left icon input">
                                    <input
                                        placeholder='Menu Name'
                                        type="text"
                                        defaultValue={menuNameValue}
                                        ref={(name) => this.name = name}
                                    />
                                    {nameErr.length > 0 && <Label pointing='left'>{nameErr}</Label>}
                                </div>
                            </Form.Field>

                        </Form>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>No</Button>
                        <Button positive id="menuSubmitButton" onClick={this.handleMenuSubmit.bind(this)} icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default MenuModal