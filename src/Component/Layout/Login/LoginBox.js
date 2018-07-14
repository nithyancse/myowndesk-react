import axios from 'axios'
import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Divider, Label } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Redirect } from 'react-router'
import { observer, inject } from 'mobx-react';
import { isValidEmailId } from '../../../Util/ValidationUtil'
import Validation from '../../../Constant/Validation'
import Messages from '../../../Constant/Messages'
import RedirectTo from '../../../Constant/RedirectTo'
import { setAuthorizationToken } from '../../Common/AxiosData'
import PropTypes from 'prop-types'
import Querystring from 'querystring'

@inject(['store'])
@observer
class LoginBox extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            pageToRedirect: "",
            emailIdErr: '',
            passwordErr: '',
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleSignUpClick() {
        this.context.router.history.push(RedirectTo.SIGNUP);
    }

    handleLoginSubmit(e) {
        let loginButton = document.getElementById("loginButton");
        let isValid = this.validateLoginForm(e);
        if (!isValid) {
            this.props.handleMessage("", ""); // don't show this error(parent class) if any field error is displayed
            return status;
        } else {
            loginButton.classList.add("loading");
            e.preventDefault();
        }

        const data = {
            grant_type: "password",
            //scope: SCOPE_INT,
            username: this.emailId.value,
            password: this.password.value
        };

        let axiosConfig = {
            auth: {
                "username": "myowndesk-client",
                "password": "myowndesk-secret",
            }
        };

        axios.post(RedirectTo.AXIOS_LOGIN, Querystring.stringify(data), axiosConfig)
            .then(response => {
                //console.log(response.data);
                sessionStorage.setItem(Messages.SESSION_ACCESS_TOKEN, response.data.access_token);
                setAuthorizationToken();
                this.getUser();
            })
            .catch(error => {
                //console.log('error ' + error);
                loginButton.classList.remove("loading");
                if (error.response.status == 400) {
                    this.props.handleMessage(Messages.PASSWORD_INCORRECT, "red");
                } else {
                    this.props.handleMessage(Messages.BAD_CREDENTIALS, "red");
                }
            });

    }

    getUser() {
        let loginButton = document.getElementById("loginButton");
        let url = RedirectTo.AXIOS_FETCH_USER;
        axios.get(url)
            .then((response) => {
                //console.log(response.data)
                sessionStorage.setItem(Messages.SESSION_IS_ACTIVE, true);
                sessionStorage.setItem(Messages.SESSION_USER, JSON.stringify(response.data));
                this.props.store.home.setIsActive(true);
                this.props.store.home.setUser(response.data);
                loginButton.classList.remove("loading");
                if (!response.data.name) {
                    this.setState({
                        pageToRedirect: RedirectTo.ADD_NAME
                    });
                } else {
                    this.loadMenuList();
                }
            })
            .catch((error) => {
                let errorMsg = "", httpStatus = "";
                if (error.response) {
                    //console.log(error.response);
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                    httpStatus = (error.response.status).toString();
                    errorMsg = httpStatus.startsWith("5") ? Messages.RESPONSE_ERROR_MSG : Messages.REQUEST_ERROR_MSG;
                  } else if (error.request) {
                    //console.log(error.request);
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    errorMsg = Messages.REQUEST_ERROR_MSG;
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    //console.log('Error', error.message);
                    errorMsg = Messages.COMMON_ERROR_MSG;
                  }
                  this.props.handleMessage(errorMsg, "red");
            });
    }

    loadMenuList() {
        let list = [];
        let loginButton = document.getElementById("loginButton");
        let userId = this.props.store.home.user.id;
        let url = RedirectTo.AXIOS_FETCH_MENU_LIST + userId;
        axios.get(url)
            .then((response) => {
                //console.log(response.data)
                for (var key in response.data) {
                    list.push(response.data[key]);
                }
                this.props.store.menu.setMenuList(list);
                loginButton.classList.remove("loading");
                this.setState({
                    pageToRedirect: RedirectTo.HOME
                });
            })
            .catch((error) => {
                let errorMsg = "", httpStatus = "";
                if (error.response) {
                    httpStatus = (error.response.status).toString();
                    errorMsg = httpStatus.startsWith("5") ? Messages.RESPONSE_ERROR_MSG : Messages.REQUEST_ERROR_MSG;
                  } else if (error.request) {
                    errorMsg = Messages.REQUEST_ERROR_MSG;
                  } else {
                    errorMsg = Messages.COMMON_ERROR_MSG;
                  }
                  this.props.handleMessage(errorMsg, "red");
            });
    }

    validateLoginForm(e) {
        let emailId = this.emailId.value;
        let password = this.password.value;
        let emailIdErrMsg = "", passwordErrMsg = "";
        let status = true;

        if (!emailId) {
            emailIdErrMsg = Validation.EMAIL.ENTER;
            status = false;
        } else {
            /* if (!isValidEmailId(emailId)) {
                emailIdErrMsg = Validation.EMAIL.VALID;
                status = false;
            } */
        }
        if (!password) {
            passwordErrMsg = Validation.PASSWORD.ENTER;
            status = false;
        }
        this.setState({
            emailIdErr: emailIdErrMsg,
            passwordErr: passwordErrMsg,
        });
        return status;
    }

    render() {

        switch (this.state.pageToRedirect) {
            case RedirectTo.ADD_NAME:
                return <Redirect to={RedirectTo.ADD_NAME} />;
                break;
            case RedirectTo.HOME:
                return <Redirect to={RedirectTo.HOME} />;
                break;
            case RedirectTo.SIGNUP:
                return <Redirect to={RedirectTo.SIGNUP} />;
                break;
        }

        const emailIdErr = this.state.emailIdErr;
        const passwordErr = this.state.passwordErr;

        return (
            <div>
                <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 550 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            {Messages.LOGIN_TITLE}
                        </Header>
                        <Form size='large'>
                            <Segment>
                                <Form.Field>
                                    <div className="ui left icon input">
                                        <input
                                            placeholder='E-mail address'
                                            type="text"
                                            ref={(emailId) => this.emailId = emailId}
                                        />
                                        <i aria-hidden="true" className="user icon"></i>
                                        {emailIdErr.length > 0 && <Label pointing='left'>{emailIdErr}</Label>}
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
                                        {passwordErr.length > 0 && <Label pointing='left'>{passwordErr}</Label>}
                                    </div>
                                </Form.Field>
                                <Button id="loginButton" color='teal' fluid size='large' onClick={this.handleLoginSubmit}>Login</Button>
                            </Segment>
                        </Form>
                        <MobileView device={isMobile}>
                            <Message className="marginTop10">
                                New to us?  <span className="link" onClick={this.handleSignUpClick.bind(this)}>Sign Up</span>
                            </Message>
                        </MobileView>
                        {/*<div className="forgot"><a href='#'>Forgot Password</a></div>*/}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default LoginBox