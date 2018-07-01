import axios from 'axios'
import React, { Component } from 'react'
import { Dropdown, Input, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Messages from '../../Constant/Messages'
import Config from '../../Constant/Config'
import RedirectTo from '../../Constant/RedirectTo'

@inject(['store'])
@observer
class MobileSideBar extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentWillUnmount() {
        this.props.store.menu.setMenuList([]);
        this.props.store.topic.setTopicList([]);
        this.props.store.topic.setTopicObject({});
    }

    handleMenuClick(menuId, name) {
        this.props.store.menu.setMenuId(menuId);
        this.props.store.menu.setMenuName(name);
        let prevTopicId = 0, nextTopicId = 0;
        let isTopicPresent = false;
        let list = [];
        let original = {};
        let url = RedirectTo.AXIOS_FETCH_TOPIC_LIST + menuId;
        axios.get(url)
            .then((response) => {
                //console.log(response.data)
                for (var key in response.data) {
                    if (key == 0) {
                        original = response.data[key];
                        isTopicPresent = true;
                    }
                    if (key == 1) {
                        nextTopicId = response.data[key].id;
                    }
                    list.push(response.data[key]);
                }
                this.props.store.topic.setTopicList(list);
                this.props.store.topic.setTopicObject(original);
                this.props.store.topic.setPrevTopicId(prevTopicId);
                this.props.store.topic.setNextTopicId(nextTopicId);
                if (isTopicPresent) {
                    this.context.router.history.push(RedirectTo.TOPIC);
                } else {
                    this.context.router.history.push(RedirectTo.TOPIC_LIST);
                }
                this.handleSideBar();
            })
            .catch((error) => {
                //console.log(error);
            });
    }

    handleManageMenu() {
        this.handleSideBar();
        this.context.router.history.push(RedirectTo.MANAGE_MENU);
    }

    handleRedirect(pageToRedirect) {
        if (RedirectTo.LOGOUT === pageToRedirect) {
            //this.props.store.home.setIsLoggedIn(Messages.NO);
            window.location.href = Config.HOME_URL; // on refresh will clear the mobx data
        } else {
            this.context.router.history.push(pageToRedirect);
            this.handleSideBar();
        }
    }

    handleSideBar() {
        this.props.handleSideBar();
    }

    render() {

        const visible = this.props.status;
        const item = this.props.store.menu.menuList;
        let menuListArray = [];
        for (let i = 0; i < item.length; i++) {
            menuListArray.push(<Menu.Item key={i} name={item[i].name} onClick={() => this.handleMenuClick(item[i].id, item[i].name)} className="textalignleft"> {item[i].name} </Menu.Item>);
        }

        return (
            <div>
                <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} icon='labeled' vertical inverted style={{ width: "50%" }}>
                    <Menu.Item name='home' onClick={() => this.handleSideBar()}>
                        <Icon name='close' className="floatRight" />
                    </Menu.Item>
                    <Menu.Item name='home' onClick={() => this.handleRedirect(RedirectTo.HOME)} className="textalignleft">
                        {Messages.MENU_HOME}
                    </Menu.Item>
                    <Menu.Item name='home' onClick={() => this.handleManageMenu()} className="textalignleft">
                        {Messages.MENU_MANAGE}
                    </Menu.Item>
                    {menuListArray}
                    <Menu.Item name='gamepad' onClick={() => this.handleRedirect(RedirectTo.LOGOUT)} className="textalignleft">
                        {Messages.MENU_LOGOUT}
                    </Menu.Item>
                </Sidebar>
            </div>
        )
    }
}

export default MobileSideBar