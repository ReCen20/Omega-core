const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../docs'),
  assets: 'assets/'
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    build: PATHS.src
  },
 output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
    },{
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'}
      },{
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader'
            },{
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                  hmr: process.env.NODE_ENV === 'development',
                },
            },{
                loader:'css-loader',
                options: { sourceMap: true }
            },{
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
            }
        ],
    },{
        test: /\.scss$/,
        use: [
            {
                loader: 'style-loader'
            },{
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                  hmr: process.env.NODE_ENV === 'development',
                },
            },{
                loader:'css-loader',
                options: { sourceMap: true, url: false}
            },{
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
            },{
                loader: 'sass-loader',
                options: { sourceMap: true }
            }
        ]
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/img`, to: `${PATHS.assets}img`}
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: 'index.html',
      inject: false
    })
  ],
}