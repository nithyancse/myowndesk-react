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
                    <div>
                        <Header as='h2'>Hi {this.props.store.home.user.name},</Header>
                        <Header as='h3'>Welcome to My Own Desk</Header>
                        <Header as='h4'> Create your Own Menu and play with it</Header>
                    </div>
                }
            </div>
        )
    }
}

export default HomePage