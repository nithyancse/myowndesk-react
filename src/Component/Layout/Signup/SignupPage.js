import React, { Component } from 'react';
import { Segment, Divider, Grid, Container, Button, Image } from 'semantic-ui-react'
import SignupBox from './SignupBox';
import CenterSegment from '../../Common/Segment/CenterSegment'

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

        return (
            <div className="contain" >
                <Grid centered columns='equal'>
                    <Grid.Row >
                        <Grid.Column width={7} only='computer tablet'>
                            {custResponse.length > 0 && <CenterSegment color={custColor} message={custResponse} />}
                            <Segment className="loginBox">
                                <SignupBox onClick={this.handleClick} handleMessage={this.handleMessage} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={16} only='mobile'>
                            {custResponse.length > 0 && <CenterSegment color={custColor} message={custResponse} />}
                            <Segment className="loginBox">
                                <SignupBox onClick={this.handleClick} handleMessage={this.handleMessage} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default SignupPage