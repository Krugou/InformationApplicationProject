const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageWebpackLoader = require('image-webpack-loader');
module.exports = {
  entry: {
    jak: './src/index.js',
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
    new ImageminWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
    }),

    new HtmlWebpackPlugin({
      title: 'Info App Project',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0'
      },
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
          {
            loader: ImageWebpackLoader,
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
    ],
  },

};
