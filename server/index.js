import http from 'http'
import url from 'url'
import JSXParse from '../jsx-parse'
import ComponentManager from '../src/component-manager'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import webpackConfig from '../webpack.dist.config.js'
import fs from 'fs'
import webpack from 'webpack'

const server = http.createServer((req, res) => {
    let parsed = url.parse(req.url, true)
    if (!parsed.query.jsx) return res.end()
    let Template = JSXParse.transformText(parsed.query.jsx)

    for (let component of Template.componentsUsed) {
        require('../src/components/' + component)
    }

    let str = ReactDOMServer.renderToString(Template.render(React,ComponentManager.components))

    // this is horribly hacky
    fs.writeFileSync(__dirname + '/tmp/output.js', parsed.query.jsx)


    webpackConfig.resolve.alias['./quiz.jsx'] = __dirname + '/tmp/output.js'
    webpackConfig.context = __dirname + '/..'
    webpackConfig.output.path = '../dist'
    webpack(webpackConfig, function(err,stats) {
        let js = fs.readFileSync('../dist/main.js','UTF-8')
        res.setHeader('Content-Type','application/json')
        return res.end(JSON.stringify({
            jsx: parsed.query.jsx,
            html: str,
            js: js
        },null,2))
    })

})

server.listen(7000)
