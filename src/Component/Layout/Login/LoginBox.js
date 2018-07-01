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
import PropTypes from 'prop-types'

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

        let pageToRedirect = "";
        let params = new URLSearchParams();
        params.append('emailId', this.emailId.value);
        params.append('password', this.password.value);

        axios.post(RedirectTo.AXIOS_LOGIN, params)
            .then(response => {
                if (response.status == 200) {
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
                }
            })
            .catch(error => {
                this.props.handleMessage(error.response.data.message, "red");
            });

        loginButton.classList.remove("loading");
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
        userId = 1;
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