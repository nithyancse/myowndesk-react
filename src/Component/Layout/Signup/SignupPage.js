import React, { Component } from 'react';
import { Segment, Divider, Grid, Container, Button, Image } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import SignupBox from './SignupBox';
import { observer, inject } from 'mobx-react'
import CenterSegment from '../../Common/Segment/CenterSegment'

@inject(['store'])
@observer
class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custResponse: "",
            custColor: "",
        }
        this.handleMessage = this.handleMessage.bind(this);
    }

    handleMessage(message, color) {
        this.setState({
            custResponse: message,
            custColor: color,
        });
    }

    render() {
        const custResponse = this.state.custResponse;
        const custColor = this.state.custColor;
        const minHeight = this.props.store.home.minHeight;

        return (
            <div className="contain" style={{minHeight:minHeight}}>
                <BrowserView device={isBrowser}>
                    <Grid centered columns='equal'>
                        <Grid.Row >
                            <Grid.Column width={7} >
                                {custResponse.length > 0 && <CenterSegment color={custColor} message={custResponse} />}
                                <Segment className="loginbox">
                                    <SignupBox onClick={this.handleClick} handleMessage={this.handleMessage} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </BrowserView>
                <MobileView device={isMobile}>
                    <Grid centered columns='equal'>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                {custResponse.length > 0 && <CenterSegment color={custColor} message={custResponse} />}
                                <Segment className="loginbox">
                                    <SignupBox onClick={this.handleClick} handleMessage={this.handleMessage} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </MobileView>

            </div>
        )
    }
}

export default SignupPage