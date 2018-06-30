import React, { Component } from 'react';
import { Image, Header, Grid, Icon, Button, Segment, Menu, Dropdown, Label, Container } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Common from '../../Constant/Common'
import Config from '../../Constant/Config'
import RedirectTo from '../../Constant/RedirectTo'
import MobileSideBar from './MobileSideBar'

@inject(['store'])
@observer
class LogoBar extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            sidebarStatus: false
        }
    }

    handleRedirect(pageToRedirect) {
        if (RedirectTo.LOGOUT === pageToRedirect) {
            //this.props.store.home.setIsLoggedIn(Common.NO);
            window.location.href = Config.HOME_URL; // on refresh will clear the mobx data
        } else {
            this.context.router.history.push(pageToRedirect);
        }
    }

    handleSideBar = (e) => {
        this.setState(prevState => ({
            sidebarStatus: !prevState.sidebarStatus
        }));
    }

    render() {

        const isLoggedIn = this.props.store.home.isLoggedIn;
        const name = this.props.store.home.user.name;

        return (
            <div>
                <BrowserView device={isBrowser}>
                    <Menu fluid inverted className="borderRadius0">
                        <Menu.Item as='a' header onClick={() => this.handleRedirect(RedirectTo.LOGOUT)}>
                            {/*<Image className="tasklogo" size='tiny' src="public/images/Mod_logo_1.png" />*/}
                            <span className="tasktitle" >My Own Desk</span>
                        </Menu.Item>
                        {/*<Menu.Item as='a'>Home</Menu.Item>*/}
                        {!isLoggedIn &&
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Link to={RedirectTo.LOGIN}>
                                        <Button color='green' >Login</Button>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item >
                                    <Link to={RedirectTo.SIGNUP} >
                                        <Button color='green'> Sign Up </Button>
                                    </Link>
                                </Menu.Item>
                            </Menu.Menu>
                        }
                        {isLoggedIn &&
                            <Menu.Menu position='right'>
                                <Dropdown item simple text={name} direction='right' >
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='edit' text='Edit Profile' />
                                        <Dropdown.Item icon='settings' text='Settings' />
                                        <Dropdown.Item icon='log out' text='Logout' onClick={() => this.handleRedirect(RedirectTo.LOGOUT)} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        }
                    </Menu>
                </BrowserView>
                <MobileView device={isMobile}>
                    <Menu size="tiny" inverted className="borderRadius0" >
                        <Menu.Item as='a' header>
                            {isLoggedIn &&
                                <Icon name='bars' size='large' className="tasklogo" onClick={this.handleSideBar} />
                            }
                            {/*<Image className="tasklogo" size='tiny' src="public/images/Mod_logo_1.png" />*/}
                            <span className="tasktitle" >My Own Desk</span>
                        </Menu.Item>
                    </Menu>
                        {isLoggedIn && <MobileSideBar status={this.state.sidebarStatus} handleSideBar={this.handleSideBar} /> }
                </MobileView>
            </div>
        )
    }
}

export default LogoBar
