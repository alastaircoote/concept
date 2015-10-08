import ComponentManager from '../component-manager'
import React from 'react'

const Answer = React.createClass({

    getInitialState() {
        return {
            selected: false
        }
    },

    contextTypes: {
         answerQuestion: React.PropTypes.func.isRequired
    },

    getCheckOrCross() {
        if (!this.state.selected) return
        return this.props.correct ? "✓" : "✖"
    },

    render() {
        return <div onClick={this.select}>
            {this.props.children} {this.getCheckOrCross()}
        </div>
    },

    select() {
        this.context.answerQuestion(this.props.correct)
        this.setState({
            selected: true
        })
    }
})

ComponentManager.registerComponent('Answer', Answer)
