const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: 'last 2 versions',
                  },
                  modules: false
                },
              ],
              'react',
              'stage-1',
            ],
          }
        },
      }
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
  ]
};