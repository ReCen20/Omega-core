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
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
    },{
        test: /\.css$/,
        use: [
        {
            loader: 'style-loader'
        },
        {
            loader:'css-loader',
            options: { sourceMap: true }
        }
        ],
      },
    ]
  }
}