import request from '../utils/request';

// 登录
export function logins(params) {
  return request('/base/login', 'POST', params);
}
// 退出登录
export function loginsOut() {
  return request('/base/logout', 'DELETE');
}

/* 加载用户路由 */
export function getRouters() {
  return request('base/load/menu');
}

/**
 * 加载用户界面配置
 *
 * @param pageType; //
 */

export function getConfig(params) {
  return request('/base/page/config', 'GET', params);
}
