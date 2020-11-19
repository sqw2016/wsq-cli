/**
 * Created by lenovo on 2019/9/27.
 */
import React from 'react';
import { NavLink } from 'react-router-dom'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { connect } from 'react-redux';

import styles from './index.less';
import Language from '../Language';
import menuBg from '../../assets/menuBg.png';
import themeFoldDark from '../../assets/theme-fold-dark.png';
import themeFoldLight from '../../assets/theme-fold-light.png';
import themeUnFoldDark from '../../assets/theme-unfold-dark.png';
import themeUnFoldLight from '../../assets/theme-unfold-light.png';
import foldIcon from '../../assets/fold.png';
import { themes, DAEKTHEMEINDEX, LIGHTTHEMEINDEX } from '../../config/theme';

const FOLDSIDERWIDTH = 80;
const UNFOLDSIDERWIDTH = 250;


class SidebarMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      supPath: [],
      overPath: [], // 鼠标悬浮显示的路由
      fold: false,
    }
  }

  componentDidMount() {
    this.getLocalMatchSup(this.props);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.getLocalMatchSup(nextProps);
  // }

  /* 渲染子菜单， menus：子菜单配置， grade：子菜单等级, fatherName：父级菜单名称
   * 一级菜单和子菜单处理不一样，所以分开处理
  */
  renderChildMenu(menus, grade = 1, fatherName) {
    /* 菜单是否展开 */
    const { themeIndex } = this.props;
    const theme = themes[themeIndex];
    const { fold } = this.state;
    const foldStyle = {
      background: theme.sidebarBackground
    };
    if (fold) {
      foldStyle.left = grade === 1 ? FOLDSIDERWIDTH + 5 : UNFOLDSIDERWIDTH + 5;
    }
    return menus && menus.length ? (
      <ul style={foldStyle} className={fold ? styles.foldSubMenu : styles.subMenu}>
        {
          menus.map(item => {
            if (item.hidden) return '';
            const isOpen = this.isChildShow(item.path);
            const hasChildrenMenu = this.hasChildrenMenuShow(item.children);
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
                  hasChildrenMenu ? (
                    <NavLink
                      style={{
                        paddingLeft: (grade+1)*15,
                        color: theme.sidebarText
                      }}
                      activeClassName={styles.menuItemActive}
                      activeStyle={{
                        background: theme.sidebarItemActivatedBackground,
                        color: theme.sidebarItemActivatedText,
                      }}
                      className={styles.menuItem}
                      to={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        // 二以上级菜单折叠时点击无效
                        if (hasChildrenMenu && fold) {
                          return;
                        }
                        this.menuTitleClick(item.path, false);
                      }}
                    >
                      <div style={{width: '90%'}}>
                        { item.icon ? <LegacyIcon type={item.icon} /> : ''}
                        <div className={styles.menuItemText} >
                          <Language id={`menu.${fatherName}.${item.name}`} />
                          {/*{item.title}*/}
                        </div>
                      </div>
                      <div>{fold ? '›' : <div className={styles.menuItemIcon}>{isOpen ? '‹' : '›'}</div> }</div>
                      {/*<Icon type={fold ? 'right' : isOpen ? 'up' : 'down'} />*/}
                    </NavLink>
                  ) : (
                    <NavLink
                      style={{
                        paddingLeft: (grade+1)*15,
                        color: theme.sidebarText
                      }}
                      activeStyle={{
                        background: theme.sidebarItemActivatedBackground,
                        color: theme.sidebarItemActivatedText,
                      }}
                      activeClassName={styles.menuItemActive}
                      className={styles.menuItem}
                      to={item.path}
                      onClick={this.menuItemClick}
                    >
                      {/*<Icon type={item.icon} />*/}
                      <div className={styles.menuItemText} >
                        <Language id={`menu.${fatherName}.${item.name}`} />
                        {/*{item.title}*/}
                      </div>
                    </NavLink>
                  )
                }
                {
                  hasChildrenMenu && isOpen ? this.renderChildMenu(item.children, grade + 1, `${fatherName}.${item.title}`) : ''
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
    const { supPath, overPath, fold } = this.state;
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
    const { fold } = this.state;
    if (fold) { this.menuItemMouseLeave(); }
  };

  /* 包含子路由的菜单点击时触发 */
  menuTitleClick = (path, isFirst = true) => {
    const { fold } = this.state;
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
    const { fold } = this.state;
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
    const { fold } = this.state;
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
  
  /* 子菜单是否显示在菜单 */
  hasChildrenMenuShow = (menus = []) => {
    if (menus && menus.length) {
      return menus.filter(item => !item.hidden).length > 0
    }
    return false;
  };

  /* 切换主题 */
  changeTheme = () => {
    /* 深色切浅色，浅色切换深色， id==1为浅色，id==2为深色 */
    const { themeIndex, dispatch } = this.props;
    const nextThemeIndex = themeIndex === DAEKTHEMEINDEX ? LIGHTTHEMEINDEX : DAEKTHEMEINDEX;
    dispatch.theme.themeChange(nextThemeIndex);
  };
  
  /* 菜单收缩扩展 */
  menuFoldChange = () => {
    const {fold} = this.state;
    this.setState({
      fold: !fold,
    })
  };
  
  render() {
    const {routes, themeIndex} = this.props;
    const theme = themes[themeIndex];
    const { fold } = this.state;
    const overFlowStyle = fold ? {} : {
      overflowX: 'hidden',
      overflowY: 'auto'
    };
    const sidebarStyle = {
      width: `${fold ? FOLDSIDERWIDTH : UNFOLDSIDERWIDTH}px`,
      color: theme.sidebarText,
      background: theme.sidebarBackground,
      ...overFlowStyle
    };
    return (
      <div
        style={sidebarStyle}
        className={styles.sidebar}
      >
        <ul
        style={!fold ? {
          height: '67%',
          overflowY: 'auto'
        }: null}
          onMouseLeave={
            e => {
              e.preventDefault();
              this.menuItemMouseLeave();
            }
          }
        >
          {
            routes.map(item => {
              const isOpen = this.isChildShow(item.path);
              const hasChildrenMenu = this.hasChildrenMenuShow(item.children);
              return !item.hidden ? (
                <li
                  key={item.path}
                  onMouseEnter={
                    (e) => {
                      e.preventDefault();
                      this.menuItemMouseEnter(item.path, 0);
                    }
                  }
                  // onMouseLeave={
                  //   e => {
                  //     e.preventDefault();
                  //     this.menuItemMouseLeave(item.path, true);
                  //   }
                  // }
                >
                  <NavLink
                    onClick={(e) => {
                      /* 显示子菜单时，不进行跳转 */
                      if(hasChildrenMenu) {
                          e.preventDefault();
                      }
                      this.menuTitleClick(item.path)
                    }}
                    style={{
                      paddingLeft: fold ? 30 : 15,
                      color: theme.sidebarText
                    }}
                    className={styles.menuItem}
                    activeStyle={{
                      background: theme.sidebarItemActivatedBackground,
                      color: theme.sidebarItemActivatedText,
                    }}
                    to={item.path}
                  >
                    <div className={styles.menuItemText}>
                      <LegacyIcon className={styles.mr10} type={item.icon} />
                      {
                        fold ? '' :
                          <Language id={`menu.${item.name}`} />
                      }
                    </div>
                    { !fold && hasChildrenMenu ? <div className={styles.menuItemIcon}>{isOpen ? '‹' : '›'}</div> : ''}
                  </NavLink>
                  {
                    hasChildrenMenu && isOpen ? this.renderChildMenu(item.children, 1, item.title) : ''
                  }
                </li>
              ) : '';
            })
          }
        </ul>
        {/* 图片背景 */}
        {
          fold ? '' : <img src={menuBg} alt="" className={styles.menuBgImg} />
        }
        {/* 收缩按钮和背景切换按钮 */}
        <div className={`${styles.unfoldBtnContainer} ${fold ? styles.foldBtnContainer : ''}`}>
          <img
            onClick={this.menuFoldChange}
            src={foldIcon}
            className={fold ? styles.rotate180 : styles.floatRight}
            alt=""
          />
          <img
            onClick={this.changeTheme}
            className={fold ? '' : styles.floatLeft}
            src={themeIndex === DAEKTHEMEINDEX ? (
              fold ? themeFoldDark : themeUnFoldDark
            ) : (fold ? themeFoldLight : themeUnFoldLight)}
            alt=""
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ theme: { themeIndex } }) => {
  return {
    themeIndex,
  }
};

export default  connect(mapStateToProps)(SidebarMenu);