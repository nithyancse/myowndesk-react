import axios from 'axios'
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Segment, Divider, Grid, Container, Button, Image, Input, Icon, } from 'semantic-ui-react'
import constError from '../../../Constant/Error'
import Error from '../../Common/Message/Error'
import NameBox from './NameBox';

class NamePage extends Component {
    render() {
        return (
            <div className="contain" >
                <Grid columns='equal'>
                    <Grid.Row only='computer tablet' >
                        <Grid.Column >
                            <NameBox />
                        </Grid.Column>
                        <Grid.Column>
                            <Image size='large' src="public/images/responsive2.jpg" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row only='mobile' width={16}>
                        <Grid.Column>
                            <NameBox />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default NamePage