const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'seamstressjs-core.js',
    path: path.resolve(__dirname, 'dist')
  }
};