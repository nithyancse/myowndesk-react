import React, { Component } from 'react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Segment, Divider, Grid, Container, Button, Image, Header } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'
import ContentHome1 from './ContentHome1'
import ContentHome2 from './ContentHome2'
import LoginBox from '../Login/LoginBox'
import CenterSegment from '../../../Component/Common/Segment/CenterSegment'

@inject(['store'])
@observer
class LandingPage extends Component {

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

        const minHeight = this.props.store.home.minHeight;
        const custResponse = this.state.custResponse;
        const custColor = this.state.custColor;

        return (
            <div className="contain" style={{minHeight:minHeight}}>
                <BrowserView device={isBrowser}>
                    <Grid columns='equal'>
                        <Grid.Row>
                            <Grid.Column >
                                <ContentHome1 />
                            </Grid.Column>
                            <Grid.Column>
                                <Image size='large' src="public/images/paperless1.png" centered />
                            </Grid.Column>
                        </Grid.Row>
                        {/*<Grid.Row >
                            <Grid.Column>
                                <Image size='large' src="public/images/responsive2.jpg" />
                            </Grid.Column>
                            <Grid.Column >
                                <ContentHome2 />
                            </Grid.Column>
                        </Grid.Row> */}
                    </Grid>
                </BrowserView>
                <MobileView device={isMobile}>
                    <Grid stackable>
                        <Grid.Row >
                            <Grid.Column >
                                <ContentHome1 />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column>
                                {custResponse.length > 0 && <CenterSegment color={custColor} message={custResponse} />}
                                <Segment>
                                    <LoginBox onClick={this.handleClick} handleMessage={this.handleMessage} />
                                </Segment>
                            </Grid.Column>
                            {/*<Header as='h4' className="cwhite">
                                My Own Desk modern workspace designed to reduce busywork-so you can focus on the things that matter.
                            </Header>*/}
                        </Grid.Row>
                    </Grid>
                </MobileView >
            </div>
        )
    }
}

export default LandingPage