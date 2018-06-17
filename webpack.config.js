const debug = process.env.NODE_ENV == "development";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //context: path.join(__dirname, "src"),
  //devtool: debug ? "inline-sourcemap" : null,
  entry: './src/index.js',
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          query: { presets: ['es2015', 'react'], plugins: ["transform-decorators-legacy", "transform-class-properties"] },
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    name: 'public/images/[name].[ext]'
                },
            },
        ]
    }
    ]
  },

  devServer: {
    historyApiFallback : true // page should not goes to blank if we refresh
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },

  plugins: debug ? [] : [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
  
};
