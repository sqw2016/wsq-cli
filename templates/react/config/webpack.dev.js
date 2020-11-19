/**
 * Created by lenovo on 2020/6/30.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common({
  BASE_URL: '"http://39.97.118.255:9001/api"',
}), {
  mode: 'development',
  devServer: {
    contentBase: './dist', // 静态资源路径
    // compress: true, //启用压缩模式
    hot: true,
    inline: true,
    overlay: true,
    stats: 'errors-only',
    progress: true,
    noInfo: true,
    open: true,
    // publicPath: '/',
    historyApiFallback: true, // 页面出现cannot GET时增加此项配置
    // lazy: true,
    // overlay: { // 懒加载模式下，控制台输出告警和错误信息
    //   warnings: true,
    //   errors: true
    // },
    port: 8888,
  },
});