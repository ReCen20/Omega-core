const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
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
      filename: `${PATHS.assets}css/[name].css`,
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
}