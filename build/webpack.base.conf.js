const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    build: './src/index.js'
  },
 output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
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
                options: { sourceMap: true }
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
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
}