const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/client/js/App.jsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets:[
            require.resolve('babel-preset-env'),
            require.resolve('babel-preset-react')
          ],
          cacheDirectory: true
        },
      },
      {
        test: /\.(s?)css$/,
        exclude: '/node_modules/',
        use: ExtractTextPlugin.extract({ 
          use: 'css-loader!sass-loader',
          fallback: 'style-loader'
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};
