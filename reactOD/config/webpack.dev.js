process.env.NODE_ENV = 'development';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/overview/index.jsx',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
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
        /*
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        })
        */

        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader:
          'url-loader?limit=10000&name=static/assets/images/[name]-[sha512:hash:base64:7].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'vz-odt-styles': path.resolve(__dirname, '../src/vz-react/styles'),
      'vz-odt-components': path.resolve(__dirname, '../src/vz-react/packages'),
      'vz-odt-modules': path.resolve(__dirname, '../src/vz-react/packages'),
      ScrollMagic: path.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
      )
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index_dev.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('common.css'),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: './src',
    stats: 'minimal',
    proxy: {
      '/digital/*': {
        target: 'http://localhost:3002',
        secure: false
      }
    }
  }
};
