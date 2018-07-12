import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Messages from '../../Constant/Messages'
import PropTypes from 'prop-types';
import RedirectTo from '../../Constant/RedirectTo';

@inject(['store'])
@observer
class HomePage extends Component {

    componentWillMount() {
        if(!sessionStorage.getItem(Messages.SESSION_IS_ACTIVE)){
            this.context.router.history.push(RedirectTo.LOGIN);
            return false;
        }
    }
    render() {
        const mainMinHeight = this.props.store.home.mainMinHeight;

        return (
            <div className="maincontain" style={{ minHeight: mainMinHeight }}>
                <div>
                    <Header as='h2'>Hi {this.props.store.home.user.name},</Header>
                    <Header as='h3'>Welcome to My Own Desk</Header>
                    <Header as='h4'> Create your Own Menu and play with it</Header>
                </div>
            </div>
        )
    }
}

export default HomePage