import React from 'react'
import ReactDOM from 'react-dom'
import Template from './quiz.jsx'

// ComponentManager is used by each component to register itself with a tag name

import ComponentManager from './component-manager'

// Then we include our components - this could be automated. Since we only use
// them through ComponentManager we don't need to give them a reference.

import './components/multiple-choice-question'
import './components/answer'
import './components/spot-the-ball'
import './components/quiz'
import './components/end'

// No need for this right now, but it could be used in a compilation step to
// programatically create the above import statements

console.log("Quiz uses the following components:", Template.componentsUsed)


ReactDOM.render(
    Template.render(React,ComponentManager.components),
    document.getElementById("main")
)
