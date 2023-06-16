const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: '/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node.modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], 
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      },
    ],
  }, 
  //devServer in case proxy does not work
  devServer: {
    proxy: {
      // context: ['/api'],
      '/': 'http://localhost:3000/',
    },
    // port: '3000',
    // static: {
    //   directory: path.join(__dirname, 'public')
    // }
  }
};

