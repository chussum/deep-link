var path = require('path')
var webpack = require('webpack')
var env = process.env.WEBPACK_ENV
var plugins = []
var outputFile
if (env === 'build') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))
  outputFile = 'deep-link.min.js'
} else {
  outputFile = 'deep-link.js'
}

var config = {
  entry: path.resolve('./src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve('./dist'),
    filename: outputFile,
    library: 'DeepLink',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
}

module.exports = config
