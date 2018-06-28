const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/assets/js/app.js"
  },
  devtool: "source-map",
  output: {
    path: __dirname + "./dist/assets/js",
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader?sourceMap=true", "css-loader?sourceMap=true", "postcss-loader?sourceMap=true", "sass-loader?sourceMap=true"]
      },
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      hash: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    host: "localhost",
    contentBase: "./src/",
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
