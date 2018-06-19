import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Icon, Select, Dropdown } from 'semantic-ui-react'
import RedirectTo from '../../../Constant/RedirectTo'
import constValid from '../../../Constant/Validation'
import PropTypes from 'prop-types'

@inject(['store'])
@observer
class TopicModal extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: true,
            title: "",
            description: "",
            type: "",
            typeValue:"", //for dropdown case only becasue validaton error message value set as dropdown value
        }
    }

    close = () => {
        this.setState({ open: false })
        this.context.router.history.push(RedirectTo.MANAGE_MENU);
    }

    handleTopicSubmit(e) {
        let list = [];
        let topicForm = document.getElementById("topicForm");
        let topicId = this.props.store.topic.topicObject.id;
        let topicSubmitButton = document.getElementById("topicSubmitButton");

        let isValid = this.validateTopicForm(e);
        let color = "green";
        if (!isValid) {
            //this.props.handleMessage("", ""); // don't show this error(parent class) if any field error is displayed
            return false;
        } else {
            e.preventDefault();
            topicForm.classList.add("loading");
        }

        let pageToRedirect = "";

        if (!topicId) {
            topicId = 0;
            url = RedirectTo.AXIOS_ADD_MENU;
        } else {
            url = RedirectTo.AXIOS_UPDATE_MENU;
        }
        axios.post(url, {
            id: topicId,
            title: this.title.value,
            userId: this.props.store.home.user.id
        })
            .then(response => {
                console.log(response);
                if (response.status == 201 || response.status == 208 || response.status == 200) {
                    if (response.status == 201) {
                        for (var key in response.data) {
                            if (title == response.data[key].title) {
                                this.props.store.topic.setTopicId(response.data[key].id);
                                this.props.store.topic.setTopicTitle(title);
                            }
                            list.push(response.data[key]);
                        }
                    } else {
                        list = this.props.store.topic.topicList;
                        let objIndex = list.findIndex((obj => obj.id == topicId));
                        //Log object to Console.
                        console.log("Before update: ", list[objIndex])
                        //Update object's title property.
                        list[objIndex].title = title
                        //Log object to console again.
                        console.log("After update: ", list[objIndex])
                        this.props.store.topic.setTopicId(topicId);
                        this.props.store.topic.setTopicTitle(title);
                    }
                    this.props.store.topic.setTopicList(list);
                    //clear the errors from server if successfullly registerd
                    this.setState({
                        open: false,
                        title: ""
                    });
                    if (response.status == 208) {
                        color = "yellow";
                        message = "Topic already added";
                    } else if (response.status == 200) {
                        color = "yellow";
                        message = "Topic updated successfully";
                    } else {
                        color = "green";
                        message = "Topic added successfully";
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

        topicForm.classList.remove("loading");
    }

    validateTopicForm(e) {
        let title = this.title.value;
        let description = this.description.value;
        let type = this.state.typeValue;
        console.log("type-->" + type);
        let titleErrMsg = "", descriptionErrMsg = "", typeErrMsg = "";
        let status = true;

        if (!title) {
            titleErrMsg = constValid.EMAIL.VALID;
            status = false;
        }
        if (!description) {
            descriptionErrMsg = constValid.PASSWORD.VALID;
            status = false;
        }
        if (!type) {
            typeErrMsg = constValid.AGREE;
            status = false;
        }
        this.setState({
            title: titleErrMsg,
            description: descriptionErrMsg,
            type: typeErrMsg
        });
        return status;
    }

    onChange = (e, data) => {
        console.log(data.value);
        this.setState({ typeValue: data.value });
    }

    render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        const open = this.state.open;
        const titleErrMsg = this.state.title;
        const descriptionErrMsg = this.state.description;
        const typeErrMsg = this.state.type;
        const typeValue = this.state.typeValue;

        const defaultTitle = this.props.store.topic.topicObject.title;
        const defaultDescription = this.props.store.topic.topicObject.description;
        const defaultType = this.props.store.topic.topicObject.type;

        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
        ]
        const { searchQuery, selected } = this.state;

        return (
            <div>
                <Modal size={'small'} open={open} onClose={this.close} style={{ top: "40%" }}>
                    <Modal.Header>Add Topic</Modal.Header>
                    <Modal.Content>

                        <Form id="topicForm" size='large'>

                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <div className="ui left icon input">
                                        <input
                                            placeholder='Topic Title'
                                            type="text"
                                            defaultValue={defaultTitle}
                                            ref={(title) => this.title = title}
                                        />
                                        {titleErrMsg.length > 0 && <Label pointing='left'>{titleErrMsg}</Label>}
                                    </div>
                                </Form.Field>

                                <Dropdown
                                    selection
                                    options={options}
                                    value={typeValue}
                                    onChange={this.onChange}
                                />
                                {typeErrMsg.length > 0 && <Label pointing='left'>{typeErrMsg}</Label>}
                            </Form.Group>
                            <Form.Field>
                                <div className="ui left icon input">
                                    <input
                                        placeholder='Topic Title'
                                        type="text"
                                        defaultValue={defaultDescription}
                                        ref={(description) => this.description = description}
                                    />
                                    {descriptionErrMsg.length > 0 && <Label pointing='left'>{descriptionErrMsg}</Label>}
                                </div>
                            </Form.Field>


                        </Form>



                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>No</Button>
                        <Button positive id="topicSubmitButton" onClick={this.handleTopicSubmit.bind(this)} icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default TopicModal