const path = require('path')
const chalk = require('chalk')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const appRoot = require('app-root-path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const emoji = require('node-emoji')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const resolve = require('./webpack.config.resolve.js')

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV !== 'production'

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
    },
    devtool: false,
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
      historyApiFallback: true,
      open: true,
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: true,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false,
        verbose: true,
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDevelopment ? '[path][name]__[local]' : '[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'autoprefixer',
                    ],
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['node_modules'],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
        },
      ],
    },
    resolve,
    plugins: (() => {
      const plugins = [
        new DotenvPlugin({
          sample: `${appRoot}/.env.example`,
          path: `${appRoot}/.env.example`,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './public/index.template.html',
          filename: 'index.html',
          favicon: './public/images/favicons/favicon.ico',
        }),
        new MiniCssExtractPlugin({
          filename: isDevelopment ? '[name].css' : '[name]-[contenthash:8].css',
          chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash:8].css',
        }),
        new ESLintPlugin({
          context: 'src',
          extensions: ['js', 'jsx'],
        }),
        new ProgressBarPlugin({
          format: `Bundling application... ${emoji.get(
            'package',
          )} [${chalk.yellow.bold(':bar')}] ${chalk.yellow.bold(
            ':percent',
          )} (${chalk.blue.bold(':elapsed seconds')})`,
          clear: false,
        }),
      ]
      return plugins
    })(),
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          sourceMap: true,
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
  }
}
