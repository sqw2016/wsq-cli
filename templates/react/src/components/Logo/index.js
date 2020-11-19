/**
 * Created by lenovo on 2020/3/23.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';
import styles from './index.less';

function Logo(props) {
  const { color, fold = 1, } = props;
  return (
    <NavLink
      style={{color}}
      className={styles.logoBox}
      to="/"
    >
      <img className={styles.logo} src={logo} alt="" />
      <span style={{opacity: fold ? 0 : 1}}>深圳地铁</span>
    </NavLink>
  );
}

export default Logo;