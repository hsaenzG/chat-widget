//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = { entry: './src/index.js', 
output: { path: path.resolve(__dirname, 'build'), publicPath: '/', filename: 'bundle.js'},
        devServer: {    contentBase: './build' },  
        module: { rules: [{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
                         { test: /\.css$/, use: ['style-loader', 'css-loader'] }] },
        devtool: 'inline-source-map', // … the rest of the config
        plugins: [new HtmlWebpackPlugin({ template: path.resolve('public/index.html') })]
};
