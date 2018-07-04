import React, { Component } from 'react';
import { Image, Header, Grid, Icon, Button, Segment, Menu, Dropdown, Label, Container } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Messages from '../../Constant/Messages'
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
            sidebarStatus: false,
            minHeight:"0px"
        }
    }

    handleRedirect(pageToRedirect) {
        if (RedirectTo.LOGOUT === pageToRedirect) {
            //this.props.store.home.setIsLoggedIn(Messages.NO);
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

    componentDidMount(){
        this.props.store.home.setWindowWidth(document.documentElement.clientWidth);
        this.props.store.home.setWindowHeight(document.documentElement.clientHeight);
        let { clientHeight, clientWidth } = this.refs.headerdiv;
        this.props.store.home.setHeaderWidth(clientWidth);
        this.props.store.home.setHeaderHeight(clientHeight);
        this.setState({
            minHeight: clientHeight+"px"
        })
    }

    render() {

        const isLoggedIn = this.props.store.home.isLoggedIn;
        const name = this.props.store.home.user.name;
        const minHeight = this.state.minHeight;

        return (
            <div ref="headerdiv">
                <BrowserView device={isBrowser}>
                    <Menu fluid inverted borderless className="borderRadius0 modtitlemenu">
                        <Menu.Item as='a' header className="modtitlediv" onClick={() => this.handleRedirect(RedirectTo.LOGOUT)}>
                            {/*<Image className="tasklogo" size='tiny' src="public/images/Mod_logo_1.png" />*/}
                            <span className="modtitle" >{Messages.MY_OWN_DESK}</span>
                        </Menu.Item>
                        {/*<Menu.Item as='a'>Home</Menu.Item>*/}
                        {!isLoggedIn &&
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Link to={RedirectTo.LOGIN}>
                                        <Button color='green' >{Messages.LOGIN}</Button>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item >
                                    <Link to={RedirectTo.SIGNUP} >
                                        <Button color='green'>{Messages.SIGNUP}</Button>
                                    </Link>
                                </Menu.Item>
                            </Menu.Menu>
                        }
                        {isLoggedIn &&
                            <Menu.Menu position='right' style={{minHeight:minHeight}}>
                                <Dropdown item simple text={name} direction='right'  >
                                    <Dropdown.Menu>
                                        {/*<Dropdown.Item icon='edit' text={Messages.EDIT_PROFILE} />
                                        <Dropdown.Item icon='settings' text={Messages.SETTINGS} /> */}
                                        <Dropdown.Item icon='log out' text={Messages.LOGOUT} onClick={() => this.handleRedirect(RedirectTo.LOGOUT)} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        }
                    </Menu>
                </BrowserView>
                <MobileView device={isMobile}>
                    <Menu size="tiny" borderless inverted className="borderRadius0" >
                        <Menu.Item as='a' header>
                            {isLoggedIn &&
                                <Icon name='bars' size='large' className="tasklogo" onClick={this.handleSideBar} />
                            }
                            {/*<Image className="tasklogo" size='tiny' src="public/images/Mod_logo_1.png" />*/}
                            <span className="modtitle" >{Messages.MY_OWN_DESK}</span>
                        </Menu.Item>
                    </Menu>
                    {isLoggedIn && <MobileSideBar status={this.state.sidebarStatus} handleSideBar={this.handleSideBar} />}
                </MobileView>
            </div>
        )
    }
}

export default LogoBar
