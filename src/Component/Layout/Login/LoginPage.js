import React, { Component } from 'react';
import { Segment, Divider, Grid, Container, Button, Image } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react';
import LoginBox from './LoginBox';
import Header from '../Header'
import Footer from '../Footer'
import CenterSegment from '../../Common/Segment/CenterSegment'
import Common from '../../../Constant/Common'

@inject(['store'])
@observer
class LoginPage extends Component {
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

    componentDidMount() {
        this.setState({
            custResponse: this.props.store.home.registerStatus,
            custColor: this.props.store.home.registerStatusColor,
        });
        this.props.store.home.setRegisterStatus(Common.EMPTY);
        this.props.store.home.setRegisterStatusColor(Common.EMPTY);
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
                                <LoginBox onClick={this.handleClick} handleMessage={this.handleMessage} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={16} only='mobile'>
                            {custResponse.length > 0 && <CenterSegment color={custColor} message={custResponse} />}
                            <Segment className="loginBox">
                                <LoginBox onClick={this.handleClick} handleMessage={this.handleMessage} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default LoginPage