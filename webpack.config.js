var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')


module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist',
        filename: 'main.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.jsx$/, loader: path.join(__dirname,'jsx-parse.js')},
            { test: /\.scss$/, loader: 'style!css!autoprefixer-loader!sass' },
            { test: /\.css$/, loader: 'style!css!autoprefixer-loader' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.svg$/, loader: 'raw' },
            { test: /\.(svg|jpeg|jpg|png)$/, loader: 'file' }
        ]
    },
    resolveLoader: {
      modulesDirectories: [
              path.join(__dirname,'/node_modules')
          ]
    },
    wrap: {
        jsx: {
            before: "var React = require('react'); module.exports = function() {",
            after: "}"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.template.html'
        })
    ]
}
