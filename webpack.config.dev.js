// how to use: "start": "webpack serve --env NODE_ENV=local --env production",
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log("NODE_ENV: ", env.NODE_ENV); // 'local'
  console.log("Production: ", env.production); // true

  return {
    mode: "development",
    entry: "./src/index.js",
    devtool: "inline-source-map",
    devServer: {
      host: "0.0.0.0",
      port: 8081,
      writeToDisk: false,
      contentBase: "./dist",
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: "Development",
      }),
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ["csv-loader"],
        },
        {
          test: /\.xml$/i,
          use: ["xml-loader"],
        },
      ],
    },
  };
};
