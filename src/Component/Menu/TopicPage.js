import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Button, Form, Grid, Header, Message, Segment, Divider, Label, Container } from 'semantic-ui-react'
import RedirectTo from '../../Constant/RedirectTo'
import constValid from '../../Constant/Validation'
import PropTypes from 'prop-types'

@inject(['store'])
@observer
class TopicPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {}
     
    }

      render() {
        const isLoggedIn = this.props.store.home.isLoggedIn;
        const menuId = this.props.store.menu.menuId;
        const menuName = this.props.store.menu.menuName;
        return (
            <div className="maincontain" >
                
                    <div>
                        <Header as='h2'>{menuId}</Header>
                        <Header as='h3'>{menuName}</Header>
                        <Header as='h4'> Topic page</Header>
                    </div>
                    
            </div>
        )
    }
}

export default TopicPage