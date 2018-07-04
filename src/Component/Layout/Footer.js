import React, { Component } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Image, Header, Grid, Icon, Button, Segment, Menu, Dropdown, Label, Container, List, Accordion } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import { observer, inject } from 'mobx-react';

@inject(['store'])
@observer
class Footer extends Component {
    state = { activeIndex: -1 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    componentDidMount(){
        let { clientHeight, clientWidth } = this.refs.footerdiv;
        this.props.store.home.setFooterWidth(clientWidth);
        this.props.store.home.setFooterHeight(clientHeight);
        let headerHeight= this.props.store.home.headerHeight;
        let footerHeight= this.props.store.home.footerHeight;
        let windowHeight= this.props.store.home.windowHeight;
        let minHeight= windowHeight - (headerHeight + footerHeight );
        let mainMinHeight= windowHeight - headerHeight;
        this.props.store.home.setMinHeight(minHeight+"px");
        if(!isMobile){
            this.props.store.home.setMainMinHeight(mainMinHeight+"px");
        } else {
            this.props.store.home.setMainMinHeight(minHeight+"px");
        }
        console.log("windowHeight " + windowHeight);
        console.log("headerHeight " + headerHeight);
        console.log("footerHeight " + footerHeight);
        console.log("minHeight " + minHeight);
        console.log("mainMinHeight " + mainMinHeight);
        //document.querySelectorAll('.contain').forEach(el => el.style.minHeight = minHeight+'px');
      }

    render() {
        const { activeIndex } = this.state;
        return (
            <div ref="footerdiv" >
                <BrowserView device={isBrowser}>
                    <Segment inverted vertical >
                        <Container>
                            <Grid divided inverted stackable className="footer" >
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <Header inverted as='h4' content='About' />
                                        <List link inverted>
                                            <List.Item as='a'>Sitemap</List.Item>
                                            <List.Item as='a'>Contact Us</List.Item>
                                            <List.Item as='a'>Religious Ceremonies</List.Item>
                                            <List.Item as='a'>Gazebo Plans</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header inverted as='h4' content='Services' />
                                        <List link inverted>
                                            <List.Item as='a'>Banana Pre-Order</List.Item>
                                            <List.Item as='a'>DNA FAQ</List.Item>
                                            <List.Item as='a'>How To Access</List.Item>
                                            <List.Item as='a'>Favorite X-Men</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Header inverted as='h4' content='Task Management' />
                                        <List link inverted>
                                            <List.Item >All Rights Reserved © myowndesk.com</List.Item>
                                            <List.Item >Contact us at support©myowndesk.com</List.Item>
                                            <List.Item >Done by <a href="#"> Nithyanandam Thangamuthu </a> </List.Item>
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                    </BrowserView>
                <MobileView device={isMobile}>

                <div>
                    <Segment inverted className="borderRadius0">
                        <Accordion inverted fluid >
                            <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Task Management
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 2}>
                                <List link inverted>
                                    <List.Item >All Rights Reserved © myowndesk.com</List.Item>
                                    <List.Item >Contact us at support©myowndesk.com</List.Item>
                                    <List.Item >Done by <a href="#"> Nithyanandam Thangamuthu </a> </List.Item>
                                </List>
                            </Accordion.Content>
                        </Accordion>
                    </Segment>
                </div>
                </MobileView>
            </div>
        )
    }
}

export default Footer
