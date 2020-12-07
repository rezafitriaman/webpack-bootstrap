const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log("NODE_ENV: ", env.NODE_ENV); // 'local'
  console.log("Production: ", env.production); // true

  return {
    mode: "development",
    entry: "./src/index.ts",
    target: "web",
    devtool: "source-map",
    watchOptions: {
      ignored: /node_modules/,
    },
    devServer: {
      host: "0.0.0.0",
      port: 8081,
      writeToDisk: true,
      contentBase: path.join(__dirname, "dist"),
      hot: true
    },
    plugins: [
      new ESLintPlugin({
        failOnError: false,
        failOnWarning: false,
        emitWarning: true,
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin(
        {
          title: 'master!',
          template: 'src/index.hbs'
        }
      ),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false,
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
          enforce: "pre",
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.svg/,
          type: "asset/inline",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
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
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };
};
