
const path = require('path');

module.exports = {
  entry: {
    main: './src/js/index.js',
    another: './src/js/slider.js', 
    another: './src/js/cart.js',
  },
  output: {
    filename: '[name].bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
  },
  mode: 'development',


  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader',   
          'sass-loader'   
        ], },],},
};
