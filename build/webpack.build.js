const merge = require('webpack-merge')
const common = require('./webpack.common')
const {root} = require('./helpers')

module.exports = merge(common, {
  entry: {
    ts: './src/app.ts',
    js: './src/app.js'
  },
  output: {
    path: root('dist'),
    filename: '[name]-bundle.js'
  }
})
