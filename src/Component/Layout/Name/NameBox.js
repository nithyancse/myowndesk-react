import axios from 'axios'
import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Input } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Redirect } from 'react-router'
import { observer, inject } from 'mobx-react';
import { isValidEmailId } from '../../../Util/ValidationUtil'
import Messages from '../../../Constant/Messages'
import Validation from '../../../Constant/Validation'
import RedirectTo from '../../../Constant/RedirectTo'

@inject(['store'])
@observer
class NameBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            pageToRedirect: "",
            errorMsg: "",
        }
    }

    handleNameSubmit(e) {
        let httpStatus = "", errorMsg = "";
        let name = this.state.name;
        let arrowButton = document.getElementById("arrowButton");
        if (!name || name.length > 100) {
            this.inputRef.focus();
            return false;
        } else {
            arrowButton.classList.add("loading");
            e.preventDefault();
        }
        var params = new URLSearchParams();
        params.append('id', this.props.store.home.user.id);
        params.append('name', name);

        axios.post(RedirectTo.AXIOS_ADD_NAME, params)
            .then(response => {
                if (response.status == 201) {
                    this.props.store.home.setUserName(name);
                    this.loadMenuList(this.props.store.home.user.id)
                    this.setState({
                        pageToRedirect: RedirectTo.HOME
                    });
                }
            })
            .catch(error => {
                httpStatus = (error.response.status).toString();
                errorMsg = httpStatus.startsWith("5") ? Messages.RESPONSE_ERROR_MSG : Messages.REQUEST_ERROR_MSG;
                this.setState({ errorMsg: errorMsg });
            });

        arrowButton.classList.add("loading");
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

    handleMessage = e => {
        this.setState({
            name: e.target.value
        });
    }

    handleRef = (c) => {
        this.inputRef = c
    }
    render() {

        switch (this.state.pageToRedirect) {
            case RedirectTo.HOME:
                return <Redirect to={RedirectTo.HOME} />;
                break;
        }

        const errorMsg = this.state.errorMsg;

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h1' className="cblue firstContent">Manage your workload, communicate with your team and celebrate success</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column width={10}>
                            <Input fluid ref={this.handleRef} placeholder='Your Name' size='large' onChange={this.handleMessage} />
                            {errorMsg.length > 0 && <Error message={this.state.errorMsg} />}
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button id="arrowButton" circular color='green' size="large" icon='arrow right' onClick={this.handleNameSubmit.bind(this)} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                        </Grid.Column>
                    </Grid.Row>
                    <MobileView device={isMobile}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h3' className="cwhite">
                                    A My Own Desk can improve the security of your business content and maximize the productivity of your workforce.
                                </Header>
                                <Header as='h4' className="cwhite">
                                    Contact us to learn how your business can take full advantage of the scale and capabilities of My Own Desk.
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </MobileView >
                </Grid>
            </div>
        )
    }
}

export default NameBox