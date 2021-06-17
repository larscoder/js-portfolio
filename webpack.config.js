const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', //Punto de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), //Donde se va a guardar el proyecto
    filename: 'main.js', //Nombre del archivo js
  }, //Hacia donde vamos a enviar lo que prepara webpack
  resolve: {
    extensions: ['.js'] //Extensiones de archivos a utilizar
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    })
  ]
}