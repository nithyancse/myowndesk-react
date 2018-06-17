import axios from 'axios'
import React, { Component } from 'react';
import { Image, Dropdown, Icon, Input, Menu } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import Common from '../../Constant/Common'
import Config from '../../Constant/Config'
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
      menuList: []
    }
  }

  componentWillMount() {
    let list = [];
    axios.get(RedirectTo.AXIOS_FETCH_MENU_LIST)
      .then((response) => {
        //console.log(response.data)
        for (var key in response.data) {
          list.push(response.data[key]);
        }
        this.setState({
          menuList: list
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick(menuId, name) {
    this.setState({ activeItem: name })
  }

  render() {

    const { activeItem } = this.state
    const item = this.state.menuList;
    let menuListArray = [];
    for (let i = 0; i < item.length; i++) {
      menuListArray.push(<Menu.Item key={i} name={item[i].name} active={activeItem === item[i].name} onClick={() => this.handleClick(item[i].id, item[i].name)}> {item[i].name} </Menu.Item>);
    }

    return (
      <div className="sidebardiv">
        <Menu inverted vertical stackable className="width100 borderRadius0 sidebarmenu" >
          <Menu.Item name='create' active={activeItem === 'create'} onClick={() => this.handleClick(RedirectTo.LOGIN, "create")}>
            Create Menu
          </Menu.Item>
          {menuListArray}
        </Menu>
      </div>
    )
  }
}

export default BrowserSideBar