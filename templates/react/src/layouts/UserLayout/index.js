/**
 * Created by lenovo on 2019/11/8.
 */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { userRouters } from '../../router';
import logo from '../../assets/logo-new.png';
import styles from './index.less';

const renderRoute = [];
const renderRoutes = (routes) => {
  routes.forEach(item => {
      if (item.redirect) {
        renderRoute.push(
          <Redirect key={item.path} exact={item.exact} from={item.path} to={item.redirect} />
        );
      }
      if (item.component) {
        renderRoute.push(
          <Route key={item.path} exact={item.exact} path={item.path} component={item.component()} />
        );
      }
      if (item.children && item.children.length) {
        renderRoutes(item.children);
      }
    }
  )
};
renderRoutes(userRouters);

function UserLayout() {
  return (
    <div className={styles.main}>
      <Switch>
        {
          renderRoute
        }
      </Switch>
      <div className={styles.footer}>
        Copyright © 1998 - 2020 Tencent. All Rights Reserved.
      </div>
    </div>
  );
}

export default UserLayout;