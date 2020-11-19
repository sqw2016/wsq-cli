/**
 * Created by lenovo on 2020/6/30.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common({
  BASE_URL: '"http://172.18.12.124:9001/api"',
}), {
  mode: 'production',
});