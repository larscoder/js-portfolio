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

Instalamos el plugin para mover archivos
```
npm install copy-webpack-plugin -D
```

Instanciamos en la parte superior a CopyPlugin
```
const CopyPlugin = require('copy-webpack-plugin');
```

Agregamos el plugin
```
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }
    ]
  })
```

Vamos a utlizar el módulo que nos provee webpack, para el manejo de imágenes, agregamos en las reglas los siguiente:
```
  {
    test: /\.png$/,
    type: "asset/resource"
  }
```

Instalamos para el manejo de las fuentes
```
npm install url-loader file-loader -D
```

En las reglas del archivo de configuración de webpack, agregamos lo siguiente:
```
  {
    test: /\.woff|.woff2$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: "application/font-woff",
        name: "[name].[contenthash].[ext]",
        outputPath: "./assets/fonts",
        publicPath: "../assets/fonts",
        esModule: false,
      }
    }
  }
```

Para minificar los archivos css y javascript instalamos
```
npm install css-minimizer-webpack-plugin terser-webpack-plugin -D
```

Agregamos los dos plugind en el archivo de configuración de webpack
```
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TercerPlugin = require('terser-webpack-plugin');
```

Creamos en la configuración de webpack la optimización:
```
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
```

Configuracmos ell nombre del archivo MiniCssExtractPLugin
```
  new MiniCssExtractPlugin({
    filename: 'assets/[name].[contenthash].css'
  }),
```

En el archivo de configuración de webpack en la parde de resolve, agregamos los alias para cada uno de los directorios que vamos a utilizar.
```
  alias: {
    '@utils': path.relative(__dirname, 'src/utils'),
    '@templates': path.relative(__dirname, 'src/templates'),
    '@styles': path.relative(__dirname, 'src/styles'),
    '@images': path.relative(__dirname, 'src/assets/fonts')
  }
```
