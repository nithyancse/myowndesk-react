import React from 'react'
import { Button, Icon, List, Grid, Header, Image } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const ContentHome1 = () => (
    <div>
        <BrowserView device={isBrowser}>
            <Header as='h1' className="cblue firstContent">My Own Desk lets you secure, share and edit all your files from anywhere.</Header>
            <Header as='h3' className="cwhite marginTop60 fontSize22">
                My Own Desk modern workspace designed to reduce busywork-so you can focus on the things that matter.
                Login and put your creative energy to work.
            </Header>
        </BrowserView>
        <MobileView device={isMobile}>
        <Header as='h1' className="cblue firstContent">My Own Desk lets you secure, share and edit all your files from anywhere.</Header>
            <Header as='h3'className="cwhite">
                Login and put your creative energy to work.
            </Header>
        </MobileView>
    </div >
)

export default ContentHome1