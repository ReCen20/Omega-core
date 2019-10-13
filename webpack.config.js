const path = require('path')
module.exports = {
  entry: {
    build: './src/index.js'
  },
 output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  devServer: {
    overlay: true
  },
}