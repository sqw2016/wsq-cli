/**
 * Created by lenovo on 2019/9/23.
 */
import React, { Fragment, useState, useEffect } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Popover, Badge } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import styles from './index.less';
import CarouselMessage from './CarouselMessage';
import { routes } from '../../router';
import SidebarMenu from '../../components/SidebarMenu';
import Language from '../../components/Language';
import { loginOut, hasLogin } from '../../utils/user';
import logoNew from '../../assets/logo-new.png';
import { themes, DAEKTHEMEINDEX } from '../../config/theme';
import { loginsOut } from '../../services/login';
import { getNewMessages, getUnreadNum, getAlarmList } from '../../services/common';
import ThemeChoose from '../../components/ThemeChoose';

/* 常量 */
let logined = hasLogin();
const renderRoute = [];
/* 中文星期 */
const weekCn = [
  '',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
];
/* message type */
const messageTypes = {
  'ALARM': '告警',
  'NOTICE': '通知'
};
const themeMain = [
  styles.mainLight,
  styles.main,
  styles.mainIndustryDark,
  styles.mainLight,
];

/* 过滤要渲染的路由并将结果存到renderRoute中 */
const renderRoutes = (routes) => {
  const rr = [];
  routes.forEach((item) => {
    if (item.redirect) {
      rr.push(
        <Redirect
          key={item.path}
          exact={item.exact}
          from={item.path}
          to={item.redirect}
        />
      );
    }
    if (item.component) {
      rr.push(
        <Route
          key={item.path}
          exact={item.exact}
          path={item.path}
          component={item.component().default}
        />
      );
    }
    if (item.children && item.children.length) {
      rr.push(...renderRoutes(item.children));
    }
  });
  return rr;
};

/* 提取非基础菜单 */
const getUnBasicRoutes = (menus) => {
  const rr = [];
  rr.push(
    <Redirect
      exact={true}
      from="/"
      to={menus[0].path}
    />
  );
  menus.forEach(item => {
    switch(item.contentType) {
      case 'eChartsShow': { // 展示菜单
        rr.push(
          <Route
            key={item.path}
            exact={item.exact}
            path={item.path}
            component={() => <DashboardShow pageId={item.pageId} />}
          />
        );
        break;
      }
      case 'link': { // 连接菜单
        rr.push(
          <Route
            key={item.path}
            exact={item.exact}
            path={item.path}
            component={LinkPage}
          />
        );
        break;
      }
      default: break;
    }
    if (item.children && item.children.length) {
      rr.push(...getUnBasicRoutes(item.children));
    }
  });
  return rr;
};

/* 获取routes中匹配location的路由 */
const getMatchRouter = function (routes, location, parentName = '') {
  for (let i = 0, len = routes.length; i < len; i++) {
    if (routes[i].path === location.pathname) {
      routes[i].parentName = parentName;
      return routes[i];
    } else if (routes[i].children && routes[i].children.length) {
      const cr = getMatchRouter(
        routes[i].children,
        location,
        `${parentName ? `${parentName}.` : ''}${routes[i].name}`
      );
      if (cr) {
        return cr;
      }
    }
  }
  return false;
};

function BasicLayout(props) {
  const {
    themeIndex,
    dispatch,
    global: { menus },
  } = props;
  const dateStr = moment().format('YYYY-MM-DD');
  const weekDay = moment().isoWeekday();
  const [time, setTime] = useState(moment().format('hh:mm'));
  /* 菜单 */
  const [renderRoute, setRenderRoute] = useState([]);
  
  /* 最新消息 */
  const [news, setNews] = useState([]);
  /* 未读信息数量 */
  const [unreadNum, setUnreadNum] = useState(0);
  /* 消息 */
  const [alarms, setAlarms] = useState({read: [], unread: [], show: false});
  
  const getNews = () => {
    /* 获取最新轮播信息 */
    getNewMessages().then(res => {
      setNews(res);
    })
  };
  
  const getAlarms = () => {
    /* 获取信息列表 */
    getAlarmList().then(res => {
      setAlarms({
        ...res,
        show: res.read.length || res.unread.length
      });
    })
  };
  
  const getUnrNum = () => {
    /* 获取未读信息数量 */
    getUnreadNum().then(res => {
      setUnreadNum(res);
    });
  };
  
  /* 浏览器初次渲染 */
  useEffect(() => {
    /*if (!hasLogin()) {
      props.history.push('/user/login');
      return;
    }*/
    /* 获取路由 */
    // !menuRouters.length && dispatch.global.fetchRouters();
    /* 时间展示 */
    const timer = setInterval(() => {
      setTime(moment().format('hh:mm'));
    }, 1000);
    /* 获取最新轮播信息, 每5分钟获取一次 */
    // getNews();
    // const newsTimer = setInterval(() => {
    //   getNews();
    // }, 300000);
    /* 获取未读信息数量, 5秒获取一次 */
    // getUnrNum();
    // const unreadNumTimer = setInterval(() => {
    //   getUnrNum();
    // }, 5000);
    logined = hasLogin();
    return () => {
      clearInterval(timer);
      // clearInterval(newsTimer);
    };
  }, []);

  useEffect(() => {
    setRenderRoute([...renderRoutes(routes)]);
  }, []);
  
  /* 获取匹配当前路径的路由 */
  /*const matchMenu = () => {
    const { location } = props;
    return getMatchRouter(routes, location);
  };*/

  const theme = themes[themeIndex];
  
  const popoverContent = alarms.read.length || alarms.unread.length ? (
    <div>
      {
        alarms.unread.map(item => (
          <div className={styles.alarmItem}>
            <span>{messageTypes[item.type]}：</span>
            <div>
              <div>{item.message}</div>
              <span className={styles.time}>{moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}</span>
            </div>
            <span className={styles.green}>未读</span>
          </div>
        )).concat(alarms.read.map(item => (
          <div className={styles.alarmItem}>
            <span>{messageTypes[item.type]}：</span>
            <div>
              <div>{item.message}</div>
              <span className={styles.time}>{moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}</span>
            </div>
            <span className={styles.grey}>已读</span>
          </div>
        )))
      }
    </div>
  ) : '暂无信息';
  return (
    <div
      id="basicLayout"
      className={themeMain[themeIndex]}
    >
      {/* 顶部内容 */}
      <div
        style={{
          background: `${theme.headerBackground} 0% 0% / 100% 100% `,
          color: theme.headerTextColor,
        }}
        className={styles.header}
      >
        <div className={styles.headerTitle}>
          运营指标可视化平台
        </div>
        <CarouselMessage className={styles.carouselMessage} list={news} />
        
        <div className={styles.headerRightTool}>
          {/* 时间 */}
          <div className={styles.headerRightText}>
            <div className={styles.time}>{time}</div>
            <div className={styles.date}>
              <div>{dateStr}</div>
              <div>{weekCn[weekDay]}</div>
            </div>
          </div>
          {/* 消息 */}
          <Popover
            onMouseEnter={getAlarms}
            content={popoverContent}
          >
            <Badge count={unreadNum} overflowCount={99}>
              <BellOutlined className={styles.headerIcon} />
            </Badge>
          </Popover>
          {logined ? (
            <div className={styles.headUser}>
              <UserOutlined className={styles.headerIcon} />
              <div
                onClick={() => {
                  loginsOut().then((res) => {
                    loginOut();
                    props.history.push('/user/login');
                  });
                }}
              >
                退出登录
              </div>
            </div>
          ) : (
            <Link to="/user/login">
              <Language id="user.login" />
            </Link>
          )}
        </div>
      </div>
      {/* 菜单 + 内容 */}
      <div
        style={{
          background: `${theme.contentBackground} 0% 0% / 100% 100%`,
        }}
        className={styles.body}
      >
        {/* 左侧菜单 */}
        <SidebarMenu routes={routes} {...props} />
        {/* 内容 */}
        <div className={styles.contentBody}>
          <div className={styles.content}>
            <Switch>{renderRoute}</Switch>
          </div>
        </div>
        {/* 主题选择 */}
        <ThemeChoose />
      </div>
    </div>
  );
}
const mapStateToProps = ({ global, theme: { themeIndex } }) => {
  return {
    global,
    themeIndex,
  };
};

export default connect(mapStateToProps)(BasicLayout);
