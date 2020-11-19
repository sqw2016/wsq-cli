/**
 * Created by lenovo on 2020/6/30.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => ({
  entry: './src/index.js',
  
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/', // 不能少,不然发布之后引入的文件会缺少baseUrl,导致引入的都是相对路径，当路由发生变化时，引入的资源路径也发生了变化，导致访问不到资源。
    chunkFilename: "js/[name].bundle.js",
    filename: 'js/[name][hash:8].js',
  },
  // 正确显示开发时代码所在位置
  /* 代码分隔 */
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-', // 名称分隔符
      cacheGroups: { // 缓存组
        common: {
          test: /[\\/]node_modules[\\/]/,
          maxSize: 1000000,
          enforce: true,
          chunks: 'all',
        }
      }
    }
  },
  
  /* 引入腾讯地图模块化 */
  externals: {
    // 'QQMap': 'TMap', 腾讯地图
    Map: 'AMap', // 高德地图地铁图
  },
  
  plugins: [
    new CleanWebpackPlugin(), // 每次编译清空输出文件夹
    new webpack.DefinePlugin({
      "process.env": env,
    }),
    new HtmlWebpackPlugin({
      //根据webpack打包规则生成html模板
      title: '运维展示平台',
      filename: 'index.html',
      template: './src/index.html',
      favicon: path.resolve('favicon.ico')
    }),
    new MinCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
              '@babel/preset-react',
            ],
            // cacheDirectory: true,
            plugins: [
              ['import', { libraryName: 'antd', style: 'css' }], // antd 模块的按需加载
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.(less|css)$/, // 编译自己写的css，less
        include: path.resolve(__dirname, '../src'),
        use: [
          // 'style-loader',
          MinCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]-[hash:base64:5]',
              }, // css 模块化,注意s
            },
          },
          // {
          //   loader: 'postcss-loader' //自动添加浏览器厂商前缀
          // },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(less|css)$/, // 编译antd的css，less,不能加模块化
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          // {
          //   loader: 'postcss-loader' //自动添加浏览器厂商前缀
          // },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/[name][hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
});
