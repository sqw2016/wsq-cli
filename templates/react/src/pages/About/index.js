/**
 * Created by lenovo on 2019/9/23.
 */
import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getSubLinks } from '../../services/common';

import styles from './index.less';
import { themes } from '../../config/theme';
import PadBlock from '../../components/PadBlock';
import logo from '../../assets/logo.png'

const pageTypes = {
  "/smart-maintenance": 'SMART-OPS',
  "/smart-station": 'SMART-STATION',
  "/smart-trip": 'SMART-TRIP',
  "/smart-dispatch": 'SMART-DISPATCH',
  "/smart-management/daily": 'DAILY-REPORT',
};

function About({ themeIndex, history }) {
  const [ branches, setBranches ] = useState([]);
  useLayoutEffect(() => {
    const { pathname } = history.location;
    getSubLinks(pageTypes[pathname]).then(res => {
      setBranches(res);
    })
  }, []);
  
  return (
    <div className={styles.main} style={{color: themes[themeIndex].contentText}}>
      {
        branches.map(item => (
          <PadBlock key={item.orgCode}>
            <a className={styles.subLink} href={item.subUrl} target="_blank">
              <img className={styles.subLinkImg} src={item.img || logo} alt=""/>
              <span>{item.subName}</span>
            </a>
          </PadBlock>
        ))
      }
    </div>
  );
}

const mapStateToPros = ({ theme: {themeIndex}}) => {
  return {
    themeIndex
  }
};

export default connect(mapStateToPros)(About);