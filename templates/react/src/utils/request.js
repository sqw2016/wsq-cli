/**
 * Created by lenovo on 2019/10/21.
 */
import axios from 'axios';
import { message } from 'antd';
import { hasLogin, loginOut } from '../utils/user';

// export const domain = 'http://39.97.118.255:9001/api';
export const domain = process.env.BASE_URL;

const ax = axios.create({
  baseURL: domain,
  timeout: 60000,
});

ax.interceptors.request.use(
  (config) => {
    const token = hasLogin() || '';
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token; //请求头加上token
      // ax.defaults.headers.common['authorization'] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

ax.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    if (err && err.response && err.response.status === 401) {
      loginOut();
      // window.location.href = '/user/login';
    }
    return Promise.reject(err);
  }
);

const request = function (url, method = 'GET', params) {
  return ax
    .request({
      url,
      method,
      ...params,
    })
    .then((res) => {
      if (res.status === 200) {
        // 请求成功返回
        return res.data;
      } else {
        throw new Error('error', res);
      }
    })
    .then((res) => {
      if (res.code === '0') {
        return res.data;
      } else {
        message.error(res.message);
        throw res.message;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default request;
