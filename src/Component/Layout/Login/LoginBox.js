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
import { setAuthorizationToken, getAuthorizationToken } from '../../Common/AxiosData'
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


        let pageToRedirect = "";

        axios.post(RedirectTo.AXIOS_LOGIN, Querystring.stringify(data), axiosConfig)
            .then(response => {

                console.log(response.data);
                setAuthorizationToken(response.data.access_token);
                sessionStorage.setItem(Messages.ACCESS_TOKEN, response.data.access_token);
                this.getUser();

            })
            .catch(error => {
                console.log('error ' + error);
                if (error.response.status == 400) {
                    this.props.handleMessage(Messages.PASSWORD_INCORRECT, "red");
                } else {
                    this.props.handleMessage(Messages.BAD_CREDENTIALS, "red");
                }
            });

        loginButton.classList.remove("loading");
    }

    getUser() {
        let tokenStr = sessionStorage.getItem(Messages.ACCESS_TOKEN);
        let axiosConfig = {
            headers: {
                "Authorization": "Bearer " + tokenStr
            }
        };

        let url = RedirectTo.AXIOS_FETCH_USER;
        axios.get(url, axiosConfig)
            .then((response) => {
                //console.log(response.data)
                this.props.store.home.setIsLoggedIn(true);
                this.props.store.home.setUser(response.data);
                if (!this.props.store.home.user.name) {
                    pageToRedirect = RedirectTo.ADD_NAME;
                } else {
                    this.loadMenuList(this.props.store.home.user.id)
                    pageToRedirect = RedirectTo.HOME;
                }
                this.setState({
                    pageToRedirect: pageToRedirect
                });
            })
            .catch((error) => {
                //console.log(error.response);
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

    loadMenuList(userId) {
        let list = [];
        let url = RedirectTo.AXIOS_FETCH_MENU_LIST + userId;
        axios.get(url)
            .then((response) => {
                //console.log(response.data)
                for (var key in response.data) {
                    list.push(response.data[key]);
                }
                this.props.store.menu.setMenuList(list);
            })
            .catch((error) => {
                console.log(error);
            });
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