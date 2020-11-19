/**
 * Created by lenovo on 2019/9/23.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import BasicRouter from './app';
import './global.less';
import store from './models';

ReactDom.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BasicRouter />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
