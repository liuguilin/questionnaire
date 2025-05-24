"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.tsx",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]_[chunkhash:8].js",
    },
    module: {
        rules: [
            {
                test: /\.text$/,
                use: "raw-loader",
            },
            {
                test: /\.js$/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("autoprefixer")({
                                        overrideBrowserslist: [
                                            "last 2 version",
                                            ">1%",
                                            "ios 7",
                                        ],
                                    }),
                                    require("postcss-pxtorem")({
                                        rootValue: 37.5,
                                        propList: ['*'],
                                        unitPrecision: 5,
                                        selectorBlackList: [],
                                        replace: true,
                                        mediaQuery: false,
                                        minPixelValue: 0,
                                        exclude: /node_modules/i,
                                        transformUnit: 'rem'
                                    })
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require("autoprefixer")({
                                    overrideBrowserslist: [
                                        "last 2 version",
                                        ">1%",
                                        "ios 7",
                                    ],
                                }),
                                require("postcss-pxtorem")({
                                    rootValue: 37.5,
                                    propList: ['*'],
                                    unitPrecision: 5,
                                    selectorBlackList: [],
                                    replace: true,
                                    mediaQuery: false,
                                    minPixelValue: 0,
                                    exclude: /node_modules/i,
                                    transformUnit: 'rem'
                                })
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        // loader: "url-loader", // 图片支持base64打包
                        loader: "file-loader", //图片以文件形式打包
                        options: {
                            name: "[name]_[hash:8].[ext]",
                            // limit: 10240, //10kb内会转成base64打包到js中
                        },
                    },
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:8].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css",
            chunkFilename: "[name].[contenthash:8].css",
        }),
        new HtmlWebpackPlugin({
            title: "index",
            filename: "index.html",
            template: "./src/index.html",
            inject: true,
            chunks: ["index"],
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            },
            meta: {
                viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
                'format-detection': 'telephone=no',
                'apple-mobile-web-app-capable': 'yes',
                'theme-color': '#ffffff'
            }
        }),
        new CleanWebpackPlugin(),
    ],
    mode: "production",
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
};
