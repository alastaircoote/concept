import ComponentManager from '../component-manager'
import React from 'react'

const Quiz = React.createClass({

    childContextTypes: {
         quiz: React.PropTypes.any.isRequired,
         numberAnswered: React.PropTypes.number.isRequired,
         score: React.PropTypes.number.isRequired
    },

    getChildContext() {
        return {
            quiz: this,
            numberAnswered: this.state.questionsAnswered,
            score: this.state.score
        }
    },

    getInitialState() {
        return {
            score: 0,
            numberOfQuestions: 0,
            questionsAnswered: 0
        }
    },

    answerQuestion(score) {
        this.setState({
            questionsAnswered: this.state.questionsAnswered + 1,
            score: this.state.score + parseInt(score,10)
        })
    },



    render() {
        // More stuff could go here, really
        return <div>{this.props.children}</div>
    }
})

ComponentManager.registerComponent('Quiz', Quiz)
