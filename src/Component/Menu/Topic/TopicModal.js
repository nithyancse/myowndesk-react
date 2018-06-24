import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Modal, Icon, Select, Dropdown } from 'semantic-ui-react'
import RedirectTo from '../../../Constant/RedirectTo'
import constValid from '../../../Constant/Validation'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

@inject(['store'])
@observer
class TopicModal extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            modalTitle: "",
            title: "",
            description: "",
            descriptionVal: "",
            type: "",
            typeVal: "", //for dropdown case only becasue validaton error message value set as dropdown value
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ descriptionVal: value })
    }

    close = () => {
        this.setState({ open: false })
        this.context.router.history.push(RedirectTo.TOPIC_LIST);
    }

    componentWillMount() {
        let modalTitle = "Add";
        let topicObjectForEdit = this.props.store.topic.topicObjectForEdit;
        let descriptionVal = this.props.store.topic.topicObjectForEdit.description;
        if (typeof topicObjectForEdit.id !== "undefined" && topicObjectForEdit != 0) {
            modalTitle = "Update"
        }

        this.setState({
            open: true,
            modalTitle: modalTitle,
            typeVal: topicObjectForEdit.type,
            descriptionVal: descriptionVal
        });

    }

    componentWillUnmount() {
        this.props.store.topic.setTopicObjectForEdit({});
    }

    handleTopicSubmit(e) {
        let list = [];
        let url = "";
        let topicForm = document.getElementById("topicForm");
        let topicId = this.props.store.topic.topicObjectForEdit.id;
        let topicSubmitButton = document.getElementById("topicSubmitButton");

        let isValid = this.validateTopicForm(e);
        let color = "", message = "";
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
            url = RedirectTo.AXIOS_ADD_TOPIC;
        } else {
            url = RedirectTo.AXIOS_UPDATE_TOPIC;
        }
        axios.post(url, {
            id: topicId,
            title: this.title.value,
            description: this.state.descriptionVal,
            type: this.state.typeVal,
            menuId: this.props.store.menu.menuId
        })
            .then(response => {
                console.log(response);
                if (response.status == 201 || response.status == 208 || response.status == 200) {
                    if (response.status == 201) {
                        for (var key in response.data) {
                            list.push(response.data[key]);
                        }
                    } else {
                        list = this.props.store.topic.topicList;
                        let objIndex = list.findIndex((obj => obj.id == topicId));
                        //Log object to Console.
                        console.log("Before update: ", list[objIndex])
                        //Update object's title property.
                        list[objIndex].title = this.title.value;
                        list[objIndex].description = this.state.descriptionVal;
                        list[objIndex].type = this.state.typeVal;
                        //Log object to console again.
                        console.log("After update: ", list[objIndex])
                    }
                    this.props.store.topic.setTopicList(list);
                    //clear the errors from server if successfullly registerd
                    this.setState({
                        open: false,
                        title: "",
                        description: "",
                        descriptionVal: "",
                        type: "",
                        typeVal: ""
                    });
                    if (response.status == 208) {
                        color = "yellow";
                        message = "Topic already added";
                    } else if (response.status == 200) {
                        color = "green";
                        message = "Topic updated successfully";
                    } else {
                        color = "green";
                        message = "Topic added successfully";
                    }
                    this.props.store.home.setResponseStatus(message);
                    this.props.store.home.setResponseColor(color);
                    alert(message);
                    this.context.router.history.push(RedirectTo.TOPIC_LIST);
                }
            })
            .catch(error => {
                //console.log(error);
                //console.log(error.response);
                this.context.router.history.push(RedirectTo.TOPIC_LIST);
            });

        topicForm.classList.remove("loading");
    }

    validateTopicForm(e) {
        let title = this.title.value;
        let description = this.state.descriptionVal;
        let type = this.state.typeVal;
        console.log("type-->" + type);
        let titleErrMsg = "", descriptionErrMsg = "", typeErrMsg = "";
        let status = true;

        if (!title) {
            titleErrMsg = constValid.TOPIC_TITLE_EMPTY;
            status = false;
        }
        if (!description) {
            descriptionErrMsg = constValid.TOPIC_DESCRIPTION_EMPTY;
            status = false;
        }
        if (!type) {
            typeErrMsg = constValid.TOPIC_TYPE_EMPTY;
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
        this.setState({ typeVal: data.value });
    }

    render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        const open = this.state.open;
        const titleErrMsg = this.state.title;
        const descriptionErrMsg = this.state.description;
        const typeErrMsg = this.state.type;
        const typeVal = this.state.typeVal;

        const defaultTitle = this.props.store.topic.topicObjectForEdit.title;
        const defaultType = this.props.store.topic.topicObjectForEdit.type;

        const options = [
            { key: 'l', text: 'Learn', value: 'L' },
            { key: 's', text: 'Solution', value: 'S' },
            { key: 'q', text: 'Question', value: 'Q' },
        ]
        const { searchQuery, selected } = this.state;

        return (
            <div>
                <Modal size={'large'} open={open} onClose={this.close} style={{ top: "40%" }}>
                    <Modal.Header>{this.state.modalTitle} Topic</Modal.Header>
                    <Modal.Content scrolling>
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
                                    defaultValue={defaultType}
                                    onChange={this.onChange}
                                />
                                {typeErrMsg.length > 0 && <Label pointing='left'>{typeErrMsg}</Label>}
                            </Form.Group>
                            <Form.Field>
                                <div className="ui left">
                                    <ReactQuill value={this.state.descriptionVal}
                                        placeholder={""}
                                        onChange={this.handleChange}
                                        modules={modules}
                                        formats={formats} />
                                    {descriptionErrMsg.length > 0 && <Label pointing='top'>{descriptionErrMsg}</Label>}
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

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': ['black'] }, { 'background': ['green'] }],
        ['link', 'image'],
        ['code-block'],
        ['clean']
    ]
};

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "code-block",
];



export default TopicModal