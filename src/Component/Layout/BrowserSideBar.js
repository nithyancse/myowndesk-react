import axios from 'axios'
import React, { Component } from 'react';
import { Image, Dropdown, Icon, Input, Menu } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react';
import RedirectTo from '../../Constant/RedirectTo'
import PropTypes from 'prop-types'

@inject(['store'])
@observer
class BrowserSideBar extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeItem: ""
    }
  }


  componentWillMount() {
    let list = [];
    let userId =  this.props.store.home.user.id;
    let url = RedirectTo.AXIOS_FETCH_MENU_LIST + userId;
    axios.get(url)
      .then((response) => {
        //console.log(response.data)
        for (var key in response.data) {
          list.push(response.data[key]);
        }
        this.props.store.menu.setMenuList(list);
        this.context.router.history.push(RedirectTo.HOME);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.props.store.menu.setMenuList([]);
    this.props.store.topic.setTopicList([]);
    this.props.store.topic.setTopicObject({});
}


  handleMenuClick(menuId, name) {
    this.props.store.menu.setMenuId(menuId);
    this.props.store.menu.setMenuName(name);
    let list = [];
    let original = {};
    let url = RedirectTo.AXIOS_FETCH_TOPIC_LIST + menuId;
    axios.get(url)
      .then((response) => {
        //console.log(response.data)
        for (var key in response.data) {
          if (key == 0) {
            original = response.data[key];
          }
          list.push(response.data[key]);
        }
        this.props.store.topic.setTopicList(list);
        this.props.store.topic.setTopicObject(original);
      })
      .catch((error) => {
        console.log(error);
      });
    this.context.router.history.push(RedirectTo.TOPIC);
  }

  handleManageMenu() {
    this.context.router.history.push(RedirectTo.MANAGE_MENU);
  }

  render() {

    const { activeItem } = this.state.activeItem
    const item = this.props.store.menu.menuList;
    let menuListArray = [];
    for (let i = 0; i < item.length; i++) {
      menuListArray.push(<Menu.Item key={i} name={item[i].name} active={activeItem === item[i].name} onClick={() => this.handleMenuClick(item[i].id, item[i].name)}> {item[i].name} </Menu.Item>);
    }

    return (
      <div className="sidebardiv">
        <Menu inverted vertical stackable className="width100 borderRadius0 sidebarmenu" >
          <Menu.Item name='manageMenu' active={activeItem === 'manageMenu'} onClick={() => this.handleManageMenu()}>
            Manage Menu
          </Menu.Item>
          {menuListArray}
        </Menu>
      </div>
    )
  }
}

export default BrowserSideBar