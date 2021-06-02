const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = format => isDev ?
 `bundle.${format}` : `bundle.[contenthash].${format}`;

// если в dev-режиме добавляет eslint
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets:
        [
          [
            '@babel/preset-env',
            {
              useBuiltIns: `usage`,
              corejs: 3,
              targets: '> 0.25%, not dead'
            }
          ]
        ],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};

module.exports = {
  // параметр отвечает за то, где лежат все исходники (src)
  context: path.resolve(__dirname, 'src'),
  // мод по умолчанию
  mode: 'development',
  // точка входа в исходные файлы
  entry: ['./index.js'],
  // точка выхода, это обязательно объект
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    // файлы по умолчанию
    extensions: ['.js'],
    // параметр для сокращения относительного пути
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components')
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    // плагин для очистки папки перед сборкой
    new CleanWebpackPlugin(),
    // плагин для работы с HTML
    new HTMLWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      },
    }),
    // плагин для транспортировки файлов from - to
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
      ],
    }),
    // плагин для выноса CSS из JS в отдельный файл
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
    ],
  },
};
