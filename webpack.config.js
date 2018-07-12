const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    "app":"./app/javascripts/app.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: "./app/unfake.html", to: "unfake.html" },
      { from: "./app/admin.html", to: "admin.html" }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ "style-loader", "css-loader" ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: "json-loader" },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
          plugins: ["transform-runtime"]
        }
      }
    ]
  }
}
