import ComponentManager from '../component-manager'
import React from 'react'
import ReactDOM from 'react-dom'
import Question from '../mixins/question'

const SpotTheBall = React.createClass({
    mixins: [Question],

    render() {
        let boxStyles = {
            width: this.props.width,
            height: this.props.height,
            background: '#ccc',
            position: 'relative'
        }

        return <div>
            <div style={boxStyles} onClick={this.placeClick}>
                {this.drawBox()}
            </div>
            {this.getNotification()}
        </div>
    },

    drawBox() {
        if (!this.state || !this.state.offBy) return

        let styles = {
            position:'absolute',
            left: this.state.clickPosition[0] - 5,
            top: this.state.clickPosition[1] - 5,
            width: 10,
            height: 10,
            background: this.state.correct ? 'green' : 'red'
        }

        return <div style={styles}/>
    },

    getNotification() {
        if (!this.state || !this.state.offBy) return
        return <div>Oh, {this.state.correct ? 'great' : 'sorry'}, you were off by {this.state.offBy[0]}, {this.state.offBy[1]}</div>
    },

    placeClick(e) {
        let domElement = ReactDOM.findDOMNode(this)
        let rect = domElement.getBoundingClientRect()

        let left = e.nativeEvent.clientX - rect.left
        let top = e.nativeEvent.clientY - rect.top

        let offByTop = Math.abs(top - this.props.targetY)
        let offByLeft = Math.abs(left - this.props.targetX)

        let didWin = offByTop < 50 && offByLeft < 20

        this.setState({
            correct: didWin,
            clickPosition: [left,top],
            offBy: [Math.round(offByLeft), Math.round(offByTop)]
        })

        this.context.answerQuestion(didWin ? this.props.pointsOnCorrect : 0)
    }
})

ComponentManager.registerComponent("SpotTheBall", SpotTheBall)
