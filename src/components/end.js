import ComponentManager from '../component-manager'
import React from 'react'

const End = React.createClass({

    contextTypes: {
        numberAnswered: React.PropTypes.number.isRequired,
        score: React.PropTypes.number.isRequired
    },

    render() {
        return <div>
            <hr/>
            You have answered {this.context.numberAnswered} questions and have {this.context.score} points.
        </div>
    }
})

ComponentManager.registerComponent('End', End)
