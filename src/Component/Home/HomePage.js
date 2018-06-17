import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Container } from 'semantic-ui-react'

@inject(['store'])
@observer
class HomePage extends Component {
    render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        return (
            <div className="maincontain" >
                {isLoggedIn &&
                <Header as='h3'>Hi {this.props.store.home.user.name}, Welcome to My Own Desk</Header>
                }
            </div>
        )
    }
}

export default HomePage