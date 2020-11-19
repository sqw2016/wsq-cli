/**
 * Created by lenovo on 2019/11/5.
 */
import React from 'react';
import { connect } from 'react-redux';
import { findTextByKey } from './util';

class Language extends React.Component {
  constructor(props) {
    super(props);
    this.spanRef = React.createRef();
    this.state = {
      showTip: false,
      language: 'CN'
    }
  }
  // 计算是否需要显示tip信息
  showTip() {
    const { global, id } = this.props;
    const fontSize = parseInt(getComputedStyle(this.spanRef.current).fontSize);
    const eleWidth = this.spanRef.current.offsetWidth;
    let base = 0.5;
    if(global.language === 'CN') base = 1;
    const strCount = findTextByKey(global.language, id).length * base;
    return eleWidth - strCount*fontSize < 0;
  }
  
  componentDidMount() {
    const { global } = this.props;
    this.setState({
      language: global.language,
      showTip: this.showTip()
    })
  }

  
  componentDidUpdate() {
    const { global } = this.props;
    if(this.state.language === global.language) {
      return;
    }

    this.setState({
      language: global.language,
      showTip: this.showTip()
    })
  }
  
  render() {
    const { global, id } = this.props;
    const { showTip } = this.state;
    const showInfo = findTextByKey(global.language, id);
    return (
      <span title={showTip ? showInfo : ''} ref={this.spanRef}>{showInfo}</span>
    );
  }
}

const mapStateToProps = ({ global }) => {
  return {
    global
  }
};

export default connect(mapStateToProps)(Language);