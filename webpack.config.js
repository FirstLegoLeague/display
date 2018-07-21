const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebPackPlugin = require("copy-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpeg|jpg|tif|gif|ico)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: './node_modules/@first-lego-league/user-interface/current/assets/img/first-favicon.ico'
    }),
    new CopyWebPackPlugin([{ from: './src/module.yml', to: 'module.yml' }])
  ]
};