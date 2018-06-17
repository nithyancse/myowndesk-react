import axios from 'axios'
import React, { Component } from 'react'
import { Dropdown, Input, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Common from '../../Constant/Common'
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
        this.state = {
            menuList: []
        }
    }

    componentWillMount() {
        let list = [];
        axios.get('/fetchMenuList?userId=1')
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

    handleRedirect(pageToRedirect) {
        if (RedirectTo.LOGOUT === pageToRedirect) {
            //this.props.store.home.setIsLoggedIn(Common.NO);
            window.location.href = Config.HOME_URL; // on refresh will clear the mobx data
        } else {
            this.context.router.history.push(pageToRedirect);
            this.props.handleSideBar();
        }
    }

    handleSideBar(){
        this.props.handleSideBar();
    }

    render() {
        const visible = this.props.status;
        const item = this.state.menuList;
        let menuListArray = [];
        for (let i = 0; i < item.length; i++) {
        menuListArray.push(<Menu.Item key={i} name={item[i].name} onClick={() => this.handleRedirect(item[i].id, item[i].name)} className="textalignleft"> {item[i].name} </Menu.Item>);
        }

        return (
            <div>
                <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} icon='labeled' vertical inverted style={{ width: "50%" }}>
                    <Menu.Item name='home' onClick={() => this.handleSideBar()}>
                        <Icon name='close' className="floatRight" />
                    </Menu.Item>
                    <Menu.Item name='home' onClick={() => this.handleRedirect(RedirectTo.HOME)} className="textalignleft">
                        Home
                    </Menu.Item>
                    <Menu.Item name='home' onClick={() => this.handleRedirect(RedirectTo.HOME)} className="textalignleft">
                        Create Menu
                    </Menu.Item>
                    {menuListArray}
                    <Menu.Item name='gamepad' onClick={() => this.handleRedirect(RedirectTo.LOGOUT)} className="textalignleft">
                        Logout
                    </Menu.Item>
                </Sidebar>
            </div>
        )
    }
}

export default MobileSideBar