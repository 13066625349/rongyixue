const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        allowTopLevelThis: true,
      },
    ],


  ],
}
