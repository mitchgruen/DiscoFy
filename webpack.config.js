const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: path.join(__dirname, 'index.html')
    })],
  devServer: {
    proxy: [
      {
        context: ['/api/'],
        target: 'http://localhost:3000'
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', { "runtime": "automatic" }]]
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader'
      },
    ],
  },
};
  //devServer in case proxy does not work
  // devServer: {
  //   proxy: {
  //     // context: ['/api'],
  //     '/': 'http://localhost:3000/',
  //   },
  // port: '3000',
  // static: {
  //   directory: path.join(__dirname, 'public')
  // }
  // }


