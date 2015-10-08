import React from 'react'

export default {
    contextTypes: {
        answerQuestion: React.PropTypes.func.isRequired
    },
    childContextTypes: {
         answerQuestion: React.PropTypes.func.isRequired
    },
}
