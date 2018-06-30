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
            <div>
                <Header as="h3">{topicObject.title}</Header>
                <div dangerouslySetInnerHTML={{ __html: topicObject.description }}></div>
            </div>
        )
    }
}

export default TopicDisplayBox