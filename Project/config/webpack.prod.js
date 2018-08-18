const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const envBundle = String(process.env.BUNDLE) || 'app';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    myprofile: './src/myprofile/index.jsx'
  },
  output: {
    path: path.join(__dirname, '../build/'),
    filename: 'static/[name]/[name].js',
    chunkFilename: 'static/' + envBundle + '/[name].[chunkhash].chunk.js',
    publicPath: './'
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        include: path.join(__dirname, '../src'),
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader:
          'url-loader?limit=100000&publicPath=../../&name=static/assets/images/[name].[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:
          'file-loader?publicPath=../../&name=static/assets/fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'vz-odt-styles': path.resolve(__dirname, '../src/vz-react-dev/styles'),
      'vz-odt-components': path.resolve(__dirname, '../src/vz-react-dev/packages'),
      'vz-odt-modules': path.resolve(__dirname, '../src/vz-react-dev/packages'),
      ScrollMagic: path.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
      )
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin('static/[name]/common.css'),
    new CopyWebpackPlugin([{ from: './src/assets/images', to: '../build/static/assets/images' }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../public/index_dev.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
    
  ]
};
