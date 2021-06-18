# js-portfolio
Instalamos webpack
```
npm install webpack webpack-cli -D
```

Creamos el archivo de webpack.conf.js y agregamos las siguientes lineas:
```
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
```


El comando nos sirve para ejecurtar webpack, el --mode puede ser production o development y el archivo de configuración no es obligatorio
```
npx webpack --mode production --config webpack.config.js
```

Para evitar estar ejecutando el comando anterior todo el tiempo podemos agregar un comando en nuestro package.json
```
"build": "webpack --mode production",
"dev": "webpack --mode development"
```

Instalamos babel
```
npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
```
@babel/preset-env Nos sirve par JavaScript moderno
@babel/plugin-transform-runtime  Nos sirve para las funciones asincronas

Creamos en la raíz un archivo .babelrc y agregamos nuestros presets y plugins a utilizar con babel:
```
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

Ahora en nuestro webpack.config.js, vamos a incluir babel, escribimos el siguiente código depués de resolve:
```
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
  }
```

Ejecutamos
```
npm install html-webpack-plugin -D
```
En nuestro webpack.config.js, agregamos los siguiete después de const path = require('path');:
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

Agregamos la sección de plugins en webpack.config.js, después del module
```
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    })
  ]
```

Instalamos el plugin y loader de CSS
```
npm install mini-css-extract-plugin css-loader -D
```

Depués de la constante HtmlWebpackPlugin agregamos:
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

Agregamos una nueva regla dentro de webpack.config.js, par que cargue los estilos css
```
  {
    test: /\.css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader'
    ]
  }
```

Asginamos en la sección de plugins el de CSS
```
  new MiniCssExtractPlugin(),
```

Instalamos el preprocesador Stylus
```
npm install stylus stylus-loader -D
```

Agregamos en las reglas de CSS, la extensión '.styl' y el laoder 'stylus-loader'
```
  {
    test: /\.css|.styl$/i,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'stylus-loader'
    ]
  }
```