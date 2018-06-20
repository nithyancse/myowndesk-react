import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Segment, Grid, Button, Image, Header } from 'semantic-ui-react'

@inject(['store'])
@observer
class TopicDisplayBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}    
    }

    
    
    render() {

        const topicObject = this.props.store.topic.topicObject;

        return (
            <div className="contain" >
                <Header as="h3">{topicObject.title}</Header>
                <Grid centered columns='equal'>
                    <Grid.Row >
                        <Grid.Column>
                            <Segment>
                            {topicObject.description} 
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default TopicDisplayBox