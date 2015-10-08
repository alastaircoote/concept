import ComponentManager from '../component-manager'
import React from 'react'

const End = React.createClass({

    contextTypes: {
        numberAnswered: React.PropTypes.number.isRequired,
        score: React.PropTypes.number.isRequired
    },

    childContextTypes: {
        numberAnswered: React.PropTypes.number.isRequired,
        score: React.PropTypes.number.isRequired
    },

    render() {
        return <span>{this.props.children}</span>
    }
})

ComponentManager.registerComponent('End', End)
