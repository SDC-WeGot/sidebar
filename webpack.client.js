const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
  //tell webpack what our root
  entry: './client/src/client.js',

  //tell webpack where to put the file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist/'),

  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: ['style-loader', 'css-loader']}
    ]
  },
};

module.exports = merge(baseConfig, config);