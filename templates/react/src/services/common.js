import request from '../utils/request';

/**
 * 查询指定页面配置
 * @param pageType; //配置的页面类型 1.DASHBOARD 2.COMET 3.OTHER
 */

export function getPageConfig(params) {
  return request('/common/page/config', 'GET', { params });
}

/**
 * 按配置查询指示图形数据
 */

export function getViewData(params) {
  return request(`/common/view/${params.id}/data`, 'GET', { params });
}

/**
 * 查询自定义图形指定列表
 */

export function getViews(params) {
  return request('/common/views', 'GET', { params });
}

/* 查询智慧中心级平台连接 */
export function getSubLinks(pageType) {
  return request('/sub/url', 'GET', { params: { pageType } });
}

/* 查询最新消息 */
export function getNewMessages() {
  return request('/common/alarm');
}

/* 查询未读信息数量 */
export function getUnreadNum() {
  return request('/common/unread/alarm');
}

/* 查询告警信息 */
export function getAlarmList() {
  return request('/common/alarms');
}

/* 门户登录 */

export function portalLogin(params) {
  return request('/base/portal/login', 'POST', {
    data: params,
  });
}
