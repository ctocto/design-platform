const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssNextPlugin = require('postcss-cssnext');
const DashboardPlugin = require('webpack-dashboard/plugin');

const context = path.resolve(__dirname, 'src');
const babelOptions = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: [
            'last 2 Chrome versions',
            // 'last 1 Firefox versions',
            // 'last 1 Safari versions',
            // 'last 1 Edge versions',
          ],
        },
        useBuiltIns: true,
        modules: false,
        // debug: true,
      },
    ],
    'react',
  ],
  plugins: [
    'react-hot-loader/babel',
    [
      'transform-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ],
    'transform-class-properties',
    'transform-es2015-classes',
    'transform-export-extensions',
  ],
};

module.exports = {
  context,
  entry: {
    index: [
      'react-hot-loader/patch',
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      './index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /antd\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /antd\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssNextPlugin,
              ],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                floatPrecision: 2,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      showErrors: true,
    }),
    new DashboardPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'node_modules'),
    hot: true,
  },
};
