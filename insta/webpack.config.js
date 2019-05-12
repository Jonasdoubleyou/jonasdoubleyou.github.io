const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');

const webpack = require("webpack");

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
        Promise: ['es6-promise', 'Promise']
    }),
    new HtmlWebpackPlugin({
       inlineSource: '.(js|css)$',
       title: '',
       filename: 'index.html',
	   template: 'src/index.html',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.DefinePlugin({
       "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    }),
    new webpack.optimize.UglifyJsPlugin(),
	// move to root so that github hosts it
	new FileManagerPlugin({
      onEnd: {
        copy: [
			{ source: 'dist/index.html', destination: 'index.html' },
		]
	  }
	})
  ]
};
