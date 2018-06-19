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
      activeItem : ""
    }
  }

  

  componentWillMount() {
    let list = [];
    //let userId =  this.props.store.home.user.id;
    let userId =  1;
    let url = RedirectTo.AXIOS_FETCH_MENU_LIST+""+userId;
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

  handleClick(menuId, name) {
    this.props.store.menu.setMenuId(menuId);
    this.props.store.menu.setMenuName(name);
    this.context.router.history.push(RedirectTo.TOPIC_LIST);
  }

  handleManageMenu() {
    this.context.router.history.push(RedirectTo.MANAGE_MENU);
  }

  render() {

    const { activeItem } = this.state.activeItem
    const item = this.props.store.menu.menuList;
    let menuListArray = [];
    for (let i = 0; i < item.length; i++) {
      menuListArray.push(<Menu.Item key={i} name={item[i].name} active={activeItem === item[i].name} onClick={() => this.handleClick(item[i].id, item[i].name)}> {item[i].name} </Menu.Item>);
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