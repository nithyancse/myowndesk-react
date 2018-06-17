import React, { Component } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Image, Header, Grid, Icon, Button, Segment, Menu, Dropdown, Label, Container, List, Accordion } from 'semantic-ui-react'
import { Redirect } from 'react-router'

class Footer extends Component {
    state = { activeIndex: -1 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state;

        return (
            <div>
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

                <div className="footerbottom ">
                    <Segment inverted className="borderRadius0">
                        <Accordion inverted fluid >
                            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                About
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                    <List.Item as='a'>Religious Ceremonies</List.Item>
                                    <List.Item as='a'>Gazebo Plans</List.Item>
                                </List>
                            </Accordion.Content>
                            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Services
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <List link inverted>
                                    <List.Item as='a'>Banana Pre-Order</List.Item>
                                    <List.Item as='a'>DNA FAQ</List.Item>
                                    <List.Item as='a'>How To Access</List.Item>
                                    <List.Item as='a'>Favorite X-Men</List.Item>
                                </List>
                            </Accordion.Content>
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
