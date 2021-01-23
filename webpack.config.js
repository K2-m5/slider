const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [];
if (!devMode) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Swiper',
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: './img', to: './img' },
      ],
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist/'),
    publicPath: 'http://localhost:3000',
    hot: true,
    port: 3000,
  },
  resolve: {
    extensions: [
      '.html',
      '.js',
      '.jsx',
    ],
  },
  module: {

    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          outputPath: '/dist/images',
        },
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
};
