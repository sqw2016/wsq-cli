/**
 * Created by lenovo on 2020/3/24.
 */
import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';
import md5 from 'blueimp-md5';

import { login } from '../../utils/user';
import styles from './index.less';
import { logins } from '../../services/login';

const { Item } = Form;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const btnItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  login = (e) => {
    e.preventDefault();
    const {
      form: { validateFields },
      history,
    } = this.props;
    validateFields((errs, vals) => {
      if (!errs) {
        const data = {
          data: { account: vals.username, password: vals.password },
        };
        /*login(data.token);
        history.push('/dashboard');*/
        logins(data).then((res) => {
          const { token } = res;
          login(token);
          history.push('/dashboard');
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className={styles.main}>
        <Form {...formItemLayout} onSubmit={this.login}>
          <Item label="用户名">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
            })(<Input placeholder="请输入用户名" />)}
          </Item>
          <Item label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
              ],
            })(<Input.Password placeholder="请输入密码" />)}
          </Item>
          <Item {...btnItemLayout}>
            <Button
              className={styles.logoBtn}
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
