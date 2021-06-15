const path = require('path');

module.exports = {
  entry: './src/index.js', //Punto de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), //Donde se va a guardar el proyecto
    filename: 'main.js', //Nombre del archivo js
  }, //Hacia donde vamos a enviar lo que prepara webpack
  resolve: {
    extensions: ['.js'] //Extensiones de archivos a utilizar
  }
}