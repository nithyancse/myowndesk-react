import React from 'react'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Button, Icon, List, Grid, Header, Image } from 'semantic-ui-react'

const ContentHome2 = () => (
    <div>
        <Grid columns='equal'>
            <BrowserView device={isBrowser}>
                <Grid.Row >
                    <Grid.Column >
                        <Header as='h1'>ContentHome2 </Header>
                        <Header as='h3'>Manage your workload, communicate with your team and celebrate success</Header>
                    </Grid.Column>
                </Grid.Row>
            </BrowserView>
        </Grid>
    </div >
)

export default ContentHome2