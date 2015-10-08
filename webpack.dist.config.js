var base = require('./webpack.config')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

base.plugins.unshift(new ExtractTextPlugin("styles.css"))

var cssLoaderIndexes = [2,3]

cssLoaderIndexes.forEach(function(index) {
    // hacky hacky
    base.module.loaders[index].loader = ExtractTextPlugin.extract('style-loader', base.module.loaders[index].loader.replace('style!',''))
})

module.exports = base
