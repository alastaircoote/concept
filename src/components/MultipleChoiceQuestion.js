import ComponentManager from '../component-manager'
import React from 'react'
import Question from '../mixins/question'

const MultipleChoiceQuestion = React.createClass({

    mixins: [Question],

    getChildContext() {
        return {
            answerQuestion: this.answerQuestion
        }
    },

    getInitialState() {
        return {
            answered: false
        }
    },

    answerQuestion(correct) {
        this.setState({
            answered: true,
            gotItRight: correct
        })

        this.context.answerQuestion(correct ? this.props.pointsOnCorrect : 0)

    },

    getResponse() {
        if (this.state.answered === false) return null
        return <div>
            You got it {this.state.gotItRight ? 'right' : 'wrong' }!
        </div>
    },

    render() {
        return <div>
            {this.props.children}
            {this.getResponse()}
        </div>
    }
})

ComponentManager.registerComponent('MultipleChoiceQuestion', MultipleChoiceQuestion)
