const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const mode = "production";

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    mode: mode,
    entry: path.resolve(__dirname, '../src/assets/js/app.js'),
    output: {
        path: path.resolve(__dirname, '../dist/assets/js'),
        filename: "app.min.js",
        publicPath: "./"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                exclude: "/node_modules/",
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: "/node_modules/",
                loader: 'file-loader?name=../img/[name].[ext]'
            },
            {
                test: /\.(ff)$/i,
                use: [
                    "file-loader?name=../img/[name].[ext]",
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 80
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '80-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 80
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            allowExternal: true
        }),
        new HtmlWebpackPlugin({
            filename: '../../index.html',
            template: './src/index.html',
            inject: false,
            mode: mode,
            minify: {
                caseSensitive: true,
                removeComments: true,
                collapseWhitespace: false,
            },
        }),
        new MiniCssExtractPlugin({
            filename: '../css/app.min.css',
            chunkFilename: '../css/app.min.css'
        })
    ]
};