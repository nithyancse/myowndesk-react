import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Message, Segment, Label, Checkbox } from 'semantic-ui-react'
import { isValidEmailId } from '../../../Util/ValidationUtil'
import Validation from '../../../Constant/Validation'
import Messages from '../../../Constant/Messages'
import RedirectTo from '../../../Constant/RedirectTo'

@inject(['store'])
@observer
class SignupBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailId: "",
            password: "",
            confirmPassword: "",
            agree: "",
            pageToRedirect: "",
        }
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    }

    handleSignUpSubmit(e) {
        let registerForm = document.getElementById("registerForm");
        let isValid = this.validateRegisterForm(e);
        let color = "green";

        if (!isValid) {
            this.props.handleMessage("", ""); // don't show this error(parent class) if any field error is displayed
            return false;
        } else {
            e.preventDefault();
            registerForm.classList.add("loading");
        }

        //add the new user 
        axios.post(RedirectTo.AXIOS_ADD_USER, {
            emailId: this.emailId.value,
            password: this.password.value
        })
            .then(response => {
                //console.log(response);
                if (response.status == 201 || response.status == 208) {
                    //clear the errors from server if successfullly registerd
                    this.setState({
                        emailId: "",
                        password: "",
                        confirmPassword: "",
                        agree: "",
                    });
                    if (response.status == 208) { color = "yellow"; }

                    this.props.store.home.setRegisterStatus(response.data.message);
                    this.props.store.home.setRegisterStatusColor(color);

                    registerForm.reset(); // reset the form fields
                    registerForm.classList.remove("loading");  // stop the loading

                    this.setState({
                        pageToRedirect: RedirectTo.LOGIN
                    });

                }
            })
            .catch(error => {
                console.log(error.response);
                //clear the pevious error for loading the new error from server
                this.setState({
                    emailId: "",
                    password: "",
                    confirmPassword: "",
                    agree: "",
                });
                if (error.response.status == 400) {
                    //pojo attribute and form field name should be same for this kind of validation
                    for (let errorObj of error.response.data.fieldErrors) {
                        this.setState({
                            [errorObj.field]: errorObj.defaultMessage,
                        });
                        errorObj.field = errorObj.defaultMessage;
                    }
                } else {
                    this.props.handleMessage(error.response.data.message, "red");
                }
            });

        
    }

    validateRegisterForm(e) {
        let emailId = this.emailId.value;
        let password = this.password.value;
        let confirmPassword = this.confirmPassword.value;
        let agree = this.agree.checked;
        let emailIdErrMsg = "", passwordErrMsg = "", confirmPasswordErrMsg = "", agreeErrMsg = "";
        let status = true;

        if (!isValidEmailId(emailId)) {
            emailIdErrMsg = Validation.EMAIL.VALID;
            status = false;
        }
        if (password.length < 6) {
            passwordErrMsg = Validation.PASSWORD.VALID;
            status = false;
        }
        if (confirmPassword.length < 6) {
            confirmPasswordErrMsg = Validation.CONFIRM_PASSWORD.VALID;
            status = false;
        }
        if (password !== confirmPassword) {
            confirmPasswordErrMsg = Validation.CONFIRM_PASSWORD.NOT_MATCH;
            status = false;
        }
        if (!agree) {
            agreeErrMsg = Validation.AGREE;
            status = false;
        }
        this.setState({
            emailId: emailIdErrMsg,
            password: passwordErrMsg,
            confirmPassword: confirmPasswordErrMsg,
            agree: agreeErrMsg,
        });
        return status;
    }

    render() {

        if (this.state.pageToRedirect == RedirectTo.LOGIN) {
            return <Redirect to={RedirectTo.LOGIN} />;
        }

        const emailIdErrMsg = this.state.emailId;
        const passwordErrMsg = this.state.password;
        const confirmPasswordErrMsg = this.state.confirmPassword;
        const agreeErrMsg = this.state.agree;

        return (
            <div>
                <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 600 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            {Messages.SIGNUP_TITLE}
                        </Header>
                        <Form id="registerForm" size='large'>
                            <Segment>
                                <Form.Field>
                                    <div className="ui left icon input">
                                        <input
                                            placeholder='E-mail address'
                                            type="text"
                                            ref={(emailId) => this.emailId = emailId}
                                        />
                                        <i aria-hidden="true" className="user icon"></i>
                                        {emailIdErrMsg.length > 0 && <Label pointing='left'>{emailIdErrMsg}</Label>}
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui left icon input">
                                        <input
                                            placeholder='Password'
                                            type="password"
                                            ref={(password) => this.password = password}
                                        />
                                        <i aria-hidden="true" className="lock icon"></i>
                                        {passwordErrMsg.length > 0 && <Label pointing='left'>{passwordErrMsg}</Label>}
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui left icon input">
                                        <input
                                            placeholder='Confirm password'
                                            type="password"
                                            ref={(confirmPassword) => this.confirmPassword = confirmPassword}
                                        />
                                        <i aria-hidden="true" className="lock icon"></i>
                                        {confirmPasswordErrMsg.length > 0 && <Label pointing='left'>{confirmPasswordErrMsg}</Label>}
                                    </div>
                                </Form.Field>
                                <Form.Field className="textalignleft" >
                                    <div className="required inline field">
                                        <div className="ui checkbox">
                                            <input
                                                id="tnc"
                                                type="checkbox"
                                                ref={(agree) => this.agree = agree}
                                            />
                                            <label htmlFor="tnc">I agree to the terms and conditions</label>
                                        </div>
                                        {agreeErrMsg.length > 0 && <Label pointing='left'>{agreeErrMsg}</Label>}
                                    </div>
                                </Form.Field>
                                <Button color='teal' fluid size='large' onClick={this.handleSignUpSubmit}>Sign Up</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SignupBox

