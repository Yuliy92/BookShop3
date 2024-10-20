const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/js/index.js",
    another: "./src/js/slider.js",
    
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader', 
          'css-loader', 
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[style].css',
    }),
  ],
};
