import React from 'react'
import { Button, Icon, List, Grid, Header, Image } from 'semantic-ui-react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const ContentHome1 = () => (
    <div>
        <BrowserView device={isBrowser}>
            <Header as='h2'>My Own Desk lets you secure, share and edit all your files from anywhere.</Header>
            <Header as='h3'>
                My Own Desk modern workspace designed to reduce busywork-so you can focus on the things that matter.
                Login and put your creative energy to work.
            </Header>
            <Header as='h4'>
                A My Own Desk can improve the security of your business content and maximize the productivity of your workforce.
                Contact us to learn how your business can take full advantage of the scale and capabilities of My Own Desk.
                </Header>
        </BrowserView>
        <MobileView device={isMobile}>
            <Header as='h3'>My Own Desk lets you secure, share and edit all your files from anywhere.</Header>
            <Header as='h4'>
                My Own Desk modern workspace designed to reduce busywork-so you can focus on the things that matter.
            </Header>
            <Header as='h4'>
                Login and put your creative energy to work.
            </Header>
        </MobileView>
    </div >
)

export default ContentHome1