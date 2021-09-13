const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/script.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'home-page.html',
      template: './src/components/home-page/home-page.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'sign-in.html',
      template: './src/components/sign-in/sign-in.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'sign-up.html',
      template: './src/components/sign-up/sign-up.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'recovery.html',
      template: './src/components/recovery/recovery.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'todolist.html',
      template: './src/components/todo-list/todolist.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: true
            }
          }
        ]
      },
     ]
  },
  devServer: {
    port: 4200
  }
}
