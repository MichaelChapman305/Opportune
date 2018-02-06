const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/server/index.js',
  target: 'node',
  output: {
  	path: path.join(__dirname, './dist'),
  	filename: 'backend.js'
  },
  externals: [nodeExternals()]
}