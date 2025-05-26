/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const aliasPath = require("./tsconfig.json").compilerOptions.paths;
console.log(
  "aliasPath =",
  Object.keys(aliasPath).reduce((alias, key) => {
    alias[key] = path.resolve(aliasPath[key][0]) + "";
    return alias;
  }, {}),
);

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.text$/,
        use: "raw-loader",
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                    overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
                  }),
                  require("postcss-pxtorem")({
                    rootValue: 37.5,
                    propList: ["*"],
                    unitPrecision: 2,
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0,
                    exclude: /node_modules/i,
                    transformUnit: "rem",
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                    overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
                  }),
                  require("postcss-pxtorem")({
                    rootValue: 37.5,
                    propList: ["*"],
                    unitPrecision: 2,
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0,
                    exclude: /node_modules/i,
                    transformUnit: "rem",
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader", // 图片支持base64打包
            // loader: "file-loader", //图片以文件形式打包
            options: {
              // name: "[name]_[hash:8].[ext]",
              limit: 10240, // 10kb内会转成base64打包到js中
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            // options: {
            //     name: "[name]_[hash:8][ext]",
            // },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack",
      filename: "index.html",
      template: "./src/index.html",
      inject: true,
      chunks: ["index", "search"],
      minify: {
        html5: true,
        collapseWhitespace: false,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: Object.keys(aliasPath).reduce((alias, key) => {
      alias[key] = path.resolve(aliasPath[key][0]) + "";
      return alias;
    }, {}),
  },
  mode: "development",
  devServer: {
    static: "./dist",
  },
};
