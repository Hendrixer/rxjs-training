const common = require('./webpack.common')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(common, {
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  }
})
