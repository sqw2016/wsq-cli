/**
 * Created by lenovo on 2019/9/25.
 */

/* BasicLayout路由 */
export const routes = [
  {
    path: '/',
    exact: true,
    hidden: true, // 路由在菜单中是否隐藏
    redirect: '/home',
  },
  {
    name: 'home',
    path: '/home',
    icon: 'home',
    component: () => require('./pages/About').default,
  },
];

/* UserLayout用户路由 */
export const userRouters = [
  {
    name: 'login',
    path: '/user/login',
    component: () => require('./pages/Login').default,
  },
];
