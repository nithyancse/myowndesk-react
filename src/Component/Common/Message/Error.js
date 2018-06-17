import React, { Component } from 'react';

export default class Error extends Component {
    render() {
        return (
            <div className="red">
                {this.props.message}
            </div>
        )
    }
}
