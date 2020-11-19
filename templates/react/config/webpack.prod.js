/**
 * Created by lenovo on 2020/6/30.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common({
  BASE_URL: '"http://39.97.118.255:9001/api"',
}), {
  mode: 'production',
  
});