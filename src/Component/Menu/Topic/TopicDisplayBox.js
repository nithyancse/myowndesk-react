import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Segment, Grid, Button, Image, Header } from 'semantic-ui-react'
import Messages from '../../../Constant/Messages'

@inject(['store'])
@observer
class TopicDisplayBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const topicObject = this.props.store.topic.topicObject;
        let isTopicAvailable = false;
        if (topicObject.title) {
            isTopicAvailable = true;
        }

        return (
            <div className="topicDisplayBox">
                {!isTopicAvailable &&
                    <div>
                        <div className="textaligncenter">
                            {Messages.TOPIC_NOT_AVAILABLE}
                        </div>
                    </div>
                }
                {isTopicAvailable &&
                    <div>
                        <Header as="h3">{topicObject.title}</Header>
                        <div dangerouslySetInnerHTML={{ __html: topicObject.description }}></div>
                    </div>
                }
            </div>
        )
    }
}

export default TopicDisplayBox