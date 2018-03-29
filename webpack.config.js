const webpack = require('webpack');
const path = require('path');

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/ssrClient',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      }
    ],
  },
};
//console.log(__dirname, "LPLPLPLPLPLPLPLPLPLPLPLPLPLPLPLLPLPLPLPLPL")
const client = {
  entry: './client.js',
  output: {
    path: __dirname + '/client/dist',
    filename: 'app.js'
  }
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname + '/client/dist',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];









// module.exports = {
//   entry: "./client/src/index.jsx",
//   output: {
//     filename: "./client/dist/bundle.js"
//   },
//   module: {
//     loaders: [
//       {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
//       {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
//       {test: /\.css$/, loader: ['style-loader', 'css-loader']}
//     ]
//   },
//   devtool: "source-map"
// }
