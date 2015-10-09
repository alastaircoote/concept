import ComponentManager from '../component-manager'
import React from 'react'

const Value = React.createClass({

    contextTypes: {
        numberAnswered: React.PropTypes.number.isRequired,
        score: React.PropTypes.number.isRequired
    },

    render() {
        return <span>{this.context[this.props.id]}</span>
    }
})

ComponentManager.registerComponent('Value', Value)
