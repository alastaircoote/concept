import React from 'react'
import ReactDOM from 'react-dom'
import CascadeTemplate from './quiz-cascade.jsx'
import OneAtATimeTemplate from './quiz-one-at-a-time.jsx'
import NormalTemplate from './quiz.jsx'

// ComponentManager is used by each component to register itself with a tag name
import ComponentManager from './component-manager'

// OK, hack for now, just for demo
let components = OneAtATimeTemplate.componentsUsed.concat(['Cascade'])

for (let component of components) {
    require('./components/' + component)
}

const modes = [
    "Normal",
    "Cascade",
    "One at a Time"
]

const modeMaps = [
    NormalTemplate,
    CascadeTemplate,
    OneAtATimeTemplate
]

const Selector = React.createClass({

    getInitialState() {
        return {
            mode: 0
        }
    },

    getRadios() {
        return modes.map((mode, i) => {
            return <label>
                <input type='radio' name='blah' onChange={this.chooseMode(i)} checked={this.state.mode == i ? 'checked' : ''} key={mode} /><span>{mode}</span>
            </label>
        })
    },

    chooseMode(idx) {
        return (e) => {
            this.setState({
                mode: idx
            })
        }
    },

    render() {

        let usedTemplate = modeMaps[this.state.mode]
        return <div>
            <h2>Display mode:</h2>
            {this.getRadios()}
            <h2>Display:</h2>
            {usedTemplate.render(React,ComponentManager.components)}
        </div>
    }
})
//Template.render(React,ComponentManager.components)

ReactDOM.render(
    <Selector/>,
    document.getElementById("main")
)
