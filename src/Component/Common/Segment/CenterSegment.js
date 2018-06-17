import React, { Component } from 'react';
import { Segment, Message } from 'semantic-ui-react'

class CenterSegment extends Component {
    render() {
        return (
            <div className="loginError textaligncenter">
                <Segment inverted color={this.props.color}>{this.props.message}</Segment>
            </div>
        )
    }
}

export default CenterSegment
