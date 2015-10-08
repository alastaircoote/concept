var babel = require('babel-core')
var fs = require('fs')
var acorn = require('acorn')
var jsonpath = require('jsonpath')
var escodegen = require('escodegen')

module.exports = function(content) {
    var output = module.exports.transformText(content)


    return "module.exports = {" +
        "componentsUsed: " + JSON.stringify(output.componentsUsed) + "," +
        "render: " + output.render.toString() +
    "}"
}

module.exports.transformText = function(content) {
    //this.emitFile(this.resourcePath, babel.transform(content).code)
    var transformed = babel.transform(content).code//.replace(/"use strict";(\W*)/,'"use strict"; return ')
    var ast = acorn.parse(transformed)

    // get rid of use strict, it's annoying
    delete ast.body.shift()

    // find all calls
    var expressions = jsonpath.query(ast,'$..*[?(@.type == "CallExpression")]')

    // find all method calls
    var callsWithMembers = expressions.filter(function(expression) {
        return expression.type === 'CallExpression' &&
            expression.callee &&
            expression.callee.type === 'MemberExpression'
    })

    // find all calls to React.createElement
    var reactElementCalls = callsWithMembers.filter(function(expression) {
        return expression.callee.object.name === 'React' &&
            expression.callee.property.name === 'createElement'
    })

    // find all calls whose first argument is an object, not a string
    var elementsThatAreClasses = reactElementCalls.filter(function(expression) {
        return expression.arguments[0].type === 'Identifier'
    })

    // map these objects to component names, prefix them with "components." for
    // easier access
    var components = []
    elementsThatAreClasses.forEach(function(expression) {
        var name = expression.arguments[0].name
        if (components.indexOf(name) == -1) components.push(name)
        expression.arguments[0].name = 'components.' + expression.arguments[0].name
    })

    return {
        componentsUsed: components,
        render: new Function('React','components','return ' + escodegen.generate(ast))
    }
}

if (require.main === module) {
    var jsx = fs.readFileSync('./src/quiz.jsx')
    console.log(module.exports(jsx))
}
