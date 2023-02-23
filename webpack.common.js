const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    pwa: './src/js/index.js',
    ds: './src/js/ds.js'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'assets/',
          to: 'assets/',
          context: 'src/',
        },
      ]
    }),

    new HtmlWebpackPlugin({
      title: 'Info App Project PWA',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0'
      },
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html',
      chunks: ['pwa']
    }),
    new HtmlWebpackPlugin({
      title: 'Info App Project Digital Signage',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0'
      },
      template: './src/digitalsignage.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'digitalsignage.html',
      chunks: ['ds']
    }),
    new ESLintPlugin({})
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },

    ],
  },

};
