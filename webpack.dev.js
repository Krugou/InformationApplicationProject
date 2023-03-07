const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    open: ['ds.html', 'index.html'],
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_CONF: {
        productionMode: false,
      },
    }),
  ],
});

