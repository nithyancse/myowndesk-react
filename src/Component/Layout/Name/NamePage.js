import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Segment, Divider, Grid, Container, Button, Image, Input, Icon, } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import Error from '../../Common/Message/Error'
import NameBox from './NameBox';
import Messages from '../../../Constant/Messages'
import PropTypes from 'prop-types';
import RedirectTo from '../../../Constant/RedirectTo';

@inject(['store'])
@observer
class NamePage extends Component {

    componentWillMount() {
        if(!sessionStorage.getItem(Messages.SESSION_IS_ACTIVE)){
            this.context.router.history.push(RedirectTo.LOGIN);
            return false;
        }
    }

    render() {
        const minHeight = this.props.store.home.minHeight;
        return (
            <div className="contain" style={{minHeight:minHeight}}>
                <BrowserView device={isBrowser}>
                    <Grid columns='equal'>
                        <Grid.Row>
                            <Grid.Column >
                                <NameBox />
                            </Grid.Column>
                            <Grid.Column>
                                <Image size='large' src="public/images/paperless.jpg" centered />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </BrowserView>
                <MobileView device={isMobile}>
                    <Grid columns='equal'>
                        <Grid.Row>
                            <Grid.Column>
                                <NameBox />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </MobileView >
            </div>
        )
    }
}

export default NamePage