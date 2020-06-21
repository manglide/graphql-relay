const path = require('path');

module.exports = {
  entry: './js/app.js',
  output: {
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: 'bundle.js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    // chunkFilename: '[name].bundle.js',
    // `path` is the folder where Webpack will place your bundles
    path: path.join(__dirname, 'public'),
    // `publicPath` is where Webpack will load your bundles from (optional)
    // publicPath: 'public'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
