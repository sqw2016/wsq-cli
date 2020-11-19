/**
 * Created by lenovo on 2020/5/29.
 */
import React from 'react';
import { connect } from 'react-redux';

import styles from './index.less';
import { DAEKTHEMEINDEX } from '../../config/theme';

function PadBlock({themeIndex, onClick, name, children }) {
  const blockClick = (e) => {
    onClick && onClick(e)
  };
  return (
    <div className={styles.boxContainer}>
      <div
        onClick={blockClick}
        className={themeIndex === DAEKTHEMEINDEX ? styles.blockBoxD : styles.blockBoxL}
      >
        <div className={styles.blockContent}>
          { children }
          <span>{name}</span>
          <div className={styles.contentDecorate}>
            <div></div>
            <span>›</span>
          </div>
        </div>
        <i className={styles.cornerDecorate} />
        <div className={styles.rightCornerDecorate}>
          <div>
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToPros = ({ theme: {themeIndex}}) => {
  return {
    themeIndex
  }
};

export default connect(mapStateToPros)(PadBlock);