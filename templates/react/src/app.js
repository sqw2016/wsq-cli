/**
 * Created by lenovo on 2019/9/23.
 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';

function BasicRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/user" component={UserLayout} />
        <Route path="/" component={BasicLayout} />
      </Switch>
    </Router>
  );
}

export default BasicRouter;
