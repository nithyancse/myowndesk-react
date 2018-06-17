import React from 'react'
import { Button, Icon, List, Grid, Header, Image } from 'semantic-ui-react'

const ContentHome2 = () => (
    <div>
        <Grid columns='equal'>
            <Grid.Row only='computer tablet'>
                <Grid.Column>
                    <Image size='large' src="public/images/responsive2.jpg" />
                </Grid.Column>
                <Grid.Column >
                    <Header as='h1'>ContentHome2 </Header>
                    <Header as='h3'>Manage your workload, communicate with your team and celebrate success</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile'>
                <Grid.Column >
                    <Header as='h1'>ContentHome2 </Header>
                    <Header as='h3'>Manage your workload, communicate with your team and celebrate success</Header>
                </Grid.Column>
            </Grid.Row>

        </Grid>
    </div >
)

export default ContentHome2