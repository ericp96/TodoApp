// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: ['babel-polyfill', './index.js'],
    context: path.resolve(__dirname, 'src'),
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')]
    },
    devServer: {
        host: "0.0.0.0",
        publicPath: "/dist/",
        disableHostCheck: true,
        port: 3000,
        hot: false,
        hotOnly: false,
        https: false,
        compress: true
    },
    devtool: 'inline-cheap-module-source-map',
    watch: true,
    watchOptions: {
        poll: 1000,
        ignored: "/node_modules/"
    },
    output: {
        publicPath: "http://127.0.0.1/dist/",
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin(),
    //     new HtmlWebpackPlugin({ template: './src/index.html' })
    // ]
};

module.exports = config;