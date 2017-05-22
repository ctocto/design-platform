const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssNextPlugin = require('postcss-cssnext');

const context = path.resolve(__dirname, 'src');
const babelOptions = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 1 Firefox versions',
            'last 1 Safari versions',
            'last 1 Edge versions',
          ],
        },
        useBuiltIns: true,
        modules: false,
        debug: true,
      },
    ],
    'react',
  ],
  plugins: [
    [
      'transform-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ],
    'transform-class-properties',
    'transform-export-extensions',
  ],
};

module.exports = {
  context,
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
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
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devtool: 'cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      showErrors: true,
    }),
  ],
};
