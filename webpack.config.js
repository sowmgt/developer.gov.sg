const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
module.exports = {
  mode: "development", // Use cli args for prod
  entry: {
    "vue-article-editor-app": "./apps/src/articles/vue-article-editor-app.js",
    "vue-terms-app": "./apps/src/terms/vue-terms-app.js",
    "vue-review-app": "./apps/src/reviews/vue-review-app.js",
    "vue-events-app": "./apps/src/events/vue-events-app.js",
    "vue-workflow-app": "./apps/src/workflows/vue-workflow-app.js",
    "vue-add-page-app": "./apps/src/pages/vue-add-page-app.js",
    "vue-search-app": "./apps/src/search/vue-search-app.js",
    main: "./apps/src/main.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "assets/bundles")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-object-rest-spread"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 8192
        }
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv(), // Takes precedence over EnvironmentPlugin
    new webpack.EnvironmentPlugin(["API_URL"]) // Used in apps/lib/config.js
  ]
};
