const common = require('./webpack.common')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const user = require('../training.json')

if (!user.first_name && !user.last_name) {
  console.error('You must add your first and last name to training.json please')
  process.exit(1)
}

module.exports = merge(common, {
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  }
})
