import React, { ReactElement, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';

import { renderLog } from 'utils/log';
import { AppState } from 'store/index';
import { login } from 'store/actions/loginAction';

import styles from './styles.scss';

export interface LoginProps {
  username: string;
  password: string;
}

const Login = (): ReactElement => {
  const loginError = useSelector((state: AppState) => state.loginState.error?.message);
  const dispatch = useDispatch();

  const onFinish = useCallback(
    (values: any): void => {
      dispatch(login(values));
    },
    [dispatch]
  );

  renderLog('Login render!!!');
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      className={styles.loginForm}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <p className={styles.errorMessage}>{loginError}</p>
      </Form.Item>
    </Form>
  );
};

export default Login;
