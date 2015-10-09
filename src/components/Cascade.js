import ComponentManager from '../component-manager'
import React from 'react'
import Question from '../mixins/question'
import QuizComponent from '../mixins/quizcomponent'

const Cascade = React.createClass({
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
            activeQuestionIndex: this.state.activeQuestionIndex + 1
        })
        this.context.answerQuestion.apply(null, arguments)
    },

    render() {
        let allChildren = React.Children.toArray(this.props.children)
        return <div>
            {allChildren.slice(0,this.state.activeQuestionIndex + 1)}
        </div>
    }
})

ComponentManager.registerComponent('Cascade', Cascade)
