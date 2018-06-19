import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Image, Grid, Icon, Button, Segment, Menu, Dropdown, Label, Container, List } from 'semantic-ui-react'
import Header from './Header';
import Footer from './Footer';
import BrowserSideBar from './BrowserSideBar'

const Layout = props => ({
  render() {

    let listOfPrivatePaths = ['/home', '/menu', '/managemenu', '/topic', '/topicList' ]
    let isPrivate = false;
    for (let path of listOfPrivatePaths) {
      if (location.pathname == path) {
        isPrivate = true;
      }
    }

    return (
      <div className="o-container">
        <Header />

        {!isPrivate &&
          <main>{props.children}</main>
        }
        {isPrivate && <div>
          <BrowserView device={isBrowser}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                  <BrowserSideBar />
                </Grid.Column>
                <Grid.Column width={13}>
                  <main>{props.children}</main>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </BrowserView>
          <MobileView device={isMobile}>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column >
                  <main>{props.children}</main>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </MobileView>
        </div>
        }

        {!isPrivate && <Footer />}
        {isPrivate &&
          <BrowserView device={isBrowser}>
            <Footer />
          </BrowserView>
        }
      </div>
    );
  }
});

export default Layout;