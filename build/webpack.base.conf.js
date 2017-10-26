var path = require('path')
var utils = require('./utils')
var config = require('../config/index')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: [ 'vue', 'vuex', 'vue-router', 'element-ui' ]  //第三方库和框架
  },
  output: {
    // path仅仅告诉Webpack结果存储在哪里，然而publicPath项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //exclude: /(node_modules|bower_components)/,
        // 注意elementUI的源码使用ES6需要解析
        include: [
          resolve('src'),
          resolve('test'),
          resolve('/node_modules/.1.4.8@element-ui/src'),
          resolve('/node_modules/.1.4.8@element-ui/packages'),
          resolve('/node_modules/.4.3.0@vuex-router-sync')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5120,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  }
}
