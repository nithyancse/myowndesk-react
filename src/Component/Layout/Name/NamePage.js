import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Segment, Divider, Grid, Container, Button, Image, Input, Icon, } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import Error from '../../Common/Message/Error'
import NameBox from './NameBox';

class NamePage extends Component {
    render() {
        return (
            <div className="contain" >
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