/**
 * Created by lenovo on 2020/3/11.
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Radio } from 'antd';

import styles from './index.less';
import { themes } from '../../config/theme';

class ThemeChoose extends React.Component {
  constructor(props) {
    super(props);
  }

  /* 菜单位置改变 */
  menuPositionChange = e => {
    const { dispatch } = this.props;
    dispatch.theme.menuPositionChange(e.target.value);
  };

  /* 主题改变 */
  chooseTheme = (theme) => {
    const { dispatch } = this.props;
    dispatch.theme.themeChange(theme);
  };

  themeMenuOpenOrClose = () => {
    const {dispatch, themeMenuOpen} = this.props;
    dispatch.theme.themeMenuOpenChange(!themeMenuOpen);
  };

  themeMenuClose = () => {
    const { dispatch } = this.props;
    dispatch.theme.themeMenuOpenChange(false);
  };

  render() {
    const { menuPosition, themeIndex, themeMenuOpen } = this.props;
    return (
      <Fragment>
        <div
          style={{
            right: themeMenuOpen ? 0 : -200
          }}
          className={styles.main}
        >
          <div onClick={this.themeMenuOpenOrClose} className={styles.iconClass}>
            <LegacyIcon type={themeMenuOpen ? 'right' : 'left'} />
          </div>
          <div className={styles.themeContent}>
            <span>主题选择：</span>
            <div className={styles.theme}>
              <ul>
                {
                  themes.map((item, index) => (
                    <li
                      className={index === themeIndex ? styles.themeActivated : ''}
                      title={item.name}
                      onClick={() => { this.chooseTheme(index) }}
                      style={{background: item.themeColor}}
                      key={item.id}
                    />
                  ))
                }
              </ul>
            </div>
            {/*<span>菜单栏位置</span>
            <div className={styles.menuPositionContent}>
              <Radio.Group onChange={this.menuPositionChange} value={menuPosition}>
                <Radio value="left">左侧</Radio>
                <Radio value="top">顶部</Radio>
              </Radio.Group>
            </div>*/}
          </div>
        </div>
        {
          themeMenuOpen ? (
            <div onClick={this.themeMenuClose} className={styles.baffle} />
          ) : ''
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ theme: { menuPosition, themeIndex, themeMenuOpen } }) => {
    return {
      menuPosition,
      themeIndex,
      themeMenuOpen
    }
};

export default connect(mapStateToProps)(ThemeChoose);