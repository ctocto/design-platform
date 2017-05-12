const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const postcssNextPlugin = require('postcss-cssnext');

const context = path.resolve(__dirname, 'src');
const babelOptions = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: 'last 2 versions',
        },
        modules: false,
      },
    ],
    'react',
    'stage-1',
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
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      showErrors: true,
    }),
  ],
};
