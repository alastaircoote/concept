var babel = require('babel-core')
var fs = require('fs')
var acorn = require('acorn')
var jsonpath = require('jsonpath')
var escodegen = require('escodegen')

module.exports = function(content) {
    //this.emitFile(this.resourcePath, babel.transform(content).code)
    var transformed = babel.transform(content).code//.replace(/"use strict";(\W*)/,'"use strict"; return ')
    var ast = acorn.parse(transformed)

    // get rid of use strict, it's annoying
    delete ast.body.shift()

    var expressions = jsonpath.query(ast,'$..*[?(@.type == "CallExpression")]')

    var callsWithMembers = expressions.filter(function(expression) {
        return expression.type === 'CallExpression' &&
            expression.callee &&
            expression.callee.type === 'MemberExpression'
    })

    var reactElementCalls = callsWithMembers.filter(function(expression) {
        return expression.callee.object.name === 'React' &&
            expression.callee.property.name === 'createElement'
    })
    var elementsThatAreClasses = reactElementCalls.filter(function(expression) {
        return expression.arguments[0].type === 'Identifier'
    })

    var components = []
    elementsThatAreClasses.forEach(function(expression) {
        var name = expression.arguments[0].name
        if (components.indexOf(name) == -1) components.push(name)
        expression.arguments[0].name = 'components.' + expression.arguments[0].name
    })

    return "module.exports = {" +
        "componentsUsed: " + JSON.stringify(components) + "," +
        "render: new Function('React','components'," + JSON.stringify('return ' + escodegen.generate(ast)) + ")" +
    "}"
}

if (require.main === module) {
    var jsx = fs.readFileSync('./src/test.jsx')
    console.log(module.exports(jsx))
}
