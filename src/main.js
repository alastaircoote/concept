import React from 'react'
import ReactDOM from 'react-dom'
import Template from './quiz-one-at-a-time.jsx'

// ComponentManager is used by each component to register itself with a tag name
import ComponentManager from './component-manager'

for (let component of Template.componentsUsed) {
    require('./components/' + component)
}

ReactDOM.render(
    Template.render(React,ComponentManager.components),
    document.getElementById("main")
)
