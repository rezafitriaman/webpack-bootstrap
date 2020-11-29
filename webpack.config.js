const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
      host: '0.0.0.0',
      port: 8081,
      writeToDisk: false,
      contentBase: './dist',
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: 'Development',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      usedExports: true,
      splitChunks: {
        usedExports: true,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ['csv-loader'],
        },
        {
          test: /\.xml$/i,
          use: ['xml-loader'],
        },
      ],
    },
  };
};
