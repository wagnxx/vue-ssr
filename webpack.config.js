// webpack.config.js
const path = require('path');
const { merge } = require('webpack-merge');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// CSS 提取应该只用于生产环境
// 这样我们在开发过程中仍然可以热重载
const isProduction = process.env.NODE_ENV === 'production';
const isServer = process.env.NODE_ENV === 'server';
 

const baseConfig = {
  // ...
  output: {
    path: path.resolve(__dirname, 'dist/to'),
    publicPath: '/to/',
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: isProduction
                ? 'images/[name].[hash:5].[ext]'
                : 'images/[name].[ext]',
            },
          },
        ],
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: cssLoaders({
      //       sourceMap: false,
      //       extract: isProduction,
      //     }),
      //   },
      // },
      // {
      //   test: /\.vue$/,

      //   use: [
      //     {
      //       loader: 'vue-loader',
      //       options: cssLoaders({
      //         sourceMap: false,
      //         extract: isProduction,
      //       }),
      //       // options: {
      //       //   loaders:{
      //       //     css:['vue-style-loader','css-loader'],
      //       //     less:['less-loader']
      //       //   }
      //       //   // enable CSS extraction
      //       //   // extractCSS: isProduction,
      //       //   // extractCSS: true,
      //       //   // loaders: {
      //       //   //   css: ExtractTextPlugin.extract({
      //       //   //     use: 'css-loader',
      //       //   //     fallback: 'vue-style-loader', // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
      //       //   //   }),
      //       //   // },
      //       // },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(sa|sc|le|c)ss$/,
      //   // use: [  'style-loader','vue-style-loader', 'css-loader', 'less-loader'],
      //   use: [ 'css-loader','less-loader']

      // },
      // {
      //   test: /\.css$/,

      //   use: ExtractTextPlugin.extract({
      //     use: 'css-loader',
      //     fallback: 'vue-style-loader',
      //   }),
      //   // use: ['style-loader','css-loader'],
      // }, //配置处理.css文件的第三方处理规则
      // {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback:'vue-style-loader',
      //     use:['css-loader', 'less-loader']
      //   })
      // },
      // {
      //   test: /\.styl(us)?$/,
      //   use: true
      //    ? ExtractTextPlugin.extract({
      //      use: [
      //       {
      //        loader: 'css-loader',
      //        options: { minimize: true }
      //       },
      //       // 'stylus-loader'
      //      ],
      //      fallback: 'vue-style-loader'
      //     })
      //    : ['vue-style-loader', 'css-loader', 'stylus-loader']
      //  },

      {
        test: /\.css$/,
        // use: extractCSS.extract({
        //   use:'css-loader',
        //   fallback:'style-loader'
        // })
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        // use: extractCSS.extract({
        //   use:'css-loader',
        //   fallback:'style-loader'
        // })
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      // {
      //   test: /\.less$/i,
      //   use: extractLESS.extract([ 'css', 'less' ])
      // },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // extractCSS: true,
          // loaders: {
          //   css: ExtractTextPlugin.extract({
          //    use: 'css-loader',
          //    fallback: 'vue-style-loader' // 这是vue-loader的依赖
          //   })
          //  }
        },
      },
    ],
  },
  plugins: true
    ? // 确保添加了此插件！
      [
        // new ExtractTextPlugin({ filename: 'common.[chunkhash:4].css' }),
        new MiniCssExtractPlugin({ filename: 'common.[contenthash:4].css' }),
        new VueLoaderPlugin(),
      ]
    : [new VueLoaderPlugin()],

  resolve: {
    alias: {
      '@views': path.resolve(__dirname, 'src/views/'),
      '@c': path.resolve(__dirname, 'src/components/'),
      '@store': path.resolve(__dirname, 'src/store/'),

    },
  },
};

const extraConfig = isServer
  ? require('./config/server')
  : require('./config/client');

module.exports = merge(baseConfig, extraConfig);
