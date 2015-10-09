var base = require('./webpack.config')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack')

base.plugins.unshift(new ExtractTextPlugin("styles.css"))

var cssLoaderIndexes = [2,3]

cssLoaderIndexes.forEach(function(index) {
    // hacky hacky
    base.module.loaders[index].loader = ExtractTextPlugin.extract('style-loader', base.module.loaders[index].loader.replace('style!',''))
})

base.plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false
}))

base.resolve = {
    alias: {
        //react$: 'react/dist/react.js'
    }
}

module.exports = base
