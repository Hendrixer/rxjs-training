const {root} = require('./helpers')

module.exports = {
  entry: './src/index.js',
  output: {
    path: root('dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.html']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: root('src'),
        exclude: /node_modules/,
        rules: [
          {
            test: () => process.env.COVERAGE,
            exclude: /\.spec\.(js|ts)?$/,
            enforce: 'post',
            loader: 'istanbul-instrumenter-loader'
          },
          {
            loaders: [
              {
                loader: 'awesome-typescript-loader',
                query: {
                  sourceMap: false,
                  inlineSourceMap: true
                }
              },
              'angular2-template-loader'
            ]
          }
        ]
      },
      {
        test: /\.js$/,
        include: root('src'),
        exclude: /node_modules/,
        rules: [
          {
            test: () => process.env.COVERAGE,
            exclude: /\.spec\.(js|ts)?$/,
            enforce: 'post',
            loader: 'istanbul-instrumenter-loader'
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            }
          }
        ]          
      }
    ]
  }
}
