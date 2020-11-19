/**
 * Created by lenovo on 2019/9/27.
 */
import React from 'react';
import { NavLink } from 'react-router-dom'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { connect } from 'react-redux';

import logo from '../../assets/logo.png';
import styles from './index.less';
import Language from '../Language';
import { themes } from '../../config/theme';

const FOLDSIDERWIDTH = 80;
const UNFOLDSIDERWIDTH = 250;

class TopMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      supPath: [],
      overPath: [], // 鼠标悬浮显示的路由
    }
  }

  componentDidMount() {
    this.getLocalMatchSup(this.props);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.getLocalMatchSup(nextProps);
  // }

  /* 渲染子菜单， menus：子菜单配置， grade：子菜单等级 */
  renderChildMenu(menus, grade = 1) {
    const { fold } = this.props;
    const foldStyle = fold ? {
      left: grade === 1 ? FOLDSIDERWIDTH + 5 : UNFOLDSIDERWIDTH + 5
    } : {};
    return menus && menus.length ? (
      <ul style={foldStyle} className={fold ? styles.unFoldSubMenu : styles.subMenu}>
        {
          menus.map(item => {
            const isOpen = this.isChildShow(item.path);
            return (
              <li
                key={item.path}
                onMouseEnter={
                  (e) => {
                    e.preventDefault();
                    this.menuItemMouseEnter(item.path, grade);
                  }
                }
                // onMouseLeave={
                //   e => {
                //     e.preventDefault();
                //     this.menuItemMouseLeave(item.path);
                //   }
                // }
              >
                {
                  item.children && item.children.length ? (
                    <NavLink
                      style={{paddingLeft: (grade+1)*15}}
                      activeClassName={styles.menuItemActive}
                      className={styles.menuItem}
                      to={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        // 二以上级菜单折叠时点击无效
                        if (item.children.length && fold) {
                          return;
                        }
                        this.menuTitleClick(item.path, false);
                      }}
                    >
                      <div style={{width: '90%'}}>
                        { item.icon ? <LegacyIcon type={item.icon} /> : ''}
                        <div className={styles.menuItemText} >
                          <Language id={`menu.${item.name}`} />
                        </div>
                      </div>
                      {
                        item.children ? <LegacyIcon type={fold ? 'right' : isOpen ? 'up' : 'down'} /> : ''
                      }
                    </NavLink>
                  ) : (
                    <NavLink
                      style={{paddingLeft: (grade+1)*15}}
                      activeClassName={styles.menuItemActive}
                      className={styles.menuItem}
                      to={item.path}
                      onClick={this.menuItemClick}
                    >
                      {/*<Icon type={item.icon} />*/}
                      <div className={styles.menuItemText} >
                        <Language id={`menu.${item.name}`} />
                      </div>
                    </NavLink>
                  )
                }
                {
                  isOpen ? this.renderChildMenu(item.children, grade + 1) : ''
                }
              </li>
            );
          })
        }
      </ul>
    ) : '';
  }

  getMatchRouter(routes, location, r) {
    for (let i = 0, len = routes.length; i < len; i++) {
      if (routes[i].path === location.pathname) {
        return routes[i];
      } else if(routes[i].children && routes[i].children.length) {
        const cr = this.getMatchRouter(routes[i].children, location, r);
        if (cr) {
          r.push(routes[i].path);
          return cr;
        }
      }
    }
    return false;
  }

  // 判断子元素是否显示
  isChildShow(path) {
    const { supPath, overPath } = this.state;
    const { fold } = this.props;
    return fold ? overPath.indexOf(path) !== -1 : supPath.indexOf(path) !== -1;
  }

  /* 获取当前路径的上层路径 */
  getLocalMatchSup(props) {
    const {routes, location} = props;
    const { supPath } = this.state;
    const r = [];
    this.getMatchRouter(routes, location, r);
    if(r.toString() !== supPath.toString()) {
      this.setState({
        supPath: r
      })
    }
  }

  /* 路由菜单点击时触发 */
  menuItemClick = () => {
    const { fold } = this.props;
    if (fold) { this.menuItemMouseLeave(); }
  };

  /* 包含子路由的菜单点击时触发 */
  menuTitleClick = (path, isFirst = true) => {
    const { fold } = this.props;
    // 菜单收起且点击的是一级菜单栏时，不做任何操作
    if (fold) return;

    let { supPath } = this.state;
    const index = supPath.indexOf(path);
    if (index !== -1) {
      supPath.splice(index, 1);// 删除元素
    } else { // 添加元素
      if (isFirst) {
        supPath = [path];
      } else {
        supPath.push(path);
      }
    }
    this.setState({
      supPath: [...supPath]
    })
  }

  // 鼠标进入菜单项
  menuItemMouseEnter(path, grade) {
    const { fold } = this.props;
    if (!fold) return;
    // 延迟关闭
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = 0;
    }
    let { overPath } = this.state;
    const index = overPath.indexOf(path);
    if(index > -1) {
      return;
    }
    overPath.splice(grade, overPath.length, path);
    this.setState({
      overPath: [...overPath]
    })
  }
  // 鼠标离开菜单项
  timer = 0;
  menuItemMouseLeave() {
    const { fold } = this.props;
    if (!fold) return;
    let { overPath } = this.state;
    // const index = overPath.indexOf(path);
    // if (isFirst) {
    //   overPath = [];
    // } else {
    //   index > 0 && overPath.splice(index, 1);
    // }
    overPath = [];
    this.timer = setTimeout(() => {
      this.setState({
        overPath
      })
    }, 200)

  }

  render() {
    const {routes, themeIndex} = this.props;
    const theme = themes[themeIndex];
    return (
      <div
        style={{
          background: theme.sidebarBackground,
          color: theme.sidebarText
        }}
        className={styles.sidebar}
      >
        <ul
          onMouseLeave={
            e => {
              e.preventDefault();
              this.menuItemMouseLeave();
            }
          }
        >
          {
            routes.map(item => {
              return item.name ? (
                <li
                  key={item.path}
                  onMouseEnter={
                    (e) => {
                      e.preventDefault();
                      this.menuItemMouseEnter(item.path, 0);
                    }
                  }
                >
                  <NavLink
                    onClick={(e) => {
                      /* 存在子菜单时，不出发跳转 */
                      if(item.children && item.children.length) {
                          e.preventDefault();
                      }
                      this.menuTitleClick(item.path)
                    }}
                    style={{
                      color: theme.sidebarText
                    }}
                    className={styles.menuItem}
                    activeStyle={{
                      background: theme.sidebarItemActivatedBackground,
                      color: theme.sidebarItemActivatedText
                    }}
                    to={item.path}
                  >
                    <Language id={`menu.${item.name}`} />
                  </NavLink>
                </li>
              ) : '';
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ theme: { themeIndex } }) => {
  return {
    themeIndex,
  }
};

export default  connect(mapStateToProps)(TopMenu);