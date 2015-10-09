import ComponentManager from '../component-manager'
import React from 'react'
import Question from '../mixins/question'
import QuizComponent from '../mixins/quizcomponent'

const OneAtATime = React.createClass({
    mixins:[QuizComponent],


    getChildContext() {
        return {
            answerQuestion: this.answerQuestion
        }
    },

    getInitialState() {
        return {
            activeQuestionIndex: 0
        }
    },

    answerQuestion() {
        this.setState({
            answeredCurrent: true
        })

        this.context.answerQuestion.apply(null, arguments)
    },

    render() {
        let allChildren = React.Children.toArray(this.props.children)
        return <div>
            {allChildren[this.state.activeQuestionIndex]}
            {this.getFooterButton()}
        </div>
    },

    getFooterButton() {
        if (!this.state.answeredCurrent) return
        return <div>
            <button onClick={this.moveNext}>Next</button>
        </div>
    },

    moveNext() {
        this.setState({
            answeredCurrent: false,
            activeQuestionIndex: this.state.activeQuestionIndex + 1
        })
    }
})

ComponentManager.registerComponent('OneAtATime', OneAtATime)
