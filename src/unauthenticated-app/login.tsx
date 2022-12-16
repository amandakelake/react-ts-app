import { Button, Form, Input } from 'antd';
import React from 'react';
import { useAuth } from '../context/auth-context';

export interface LoginParam {
    username: string
    password: string
}

export const LoginScreen: React.FC = () => {
    const { login } = useAuth();

    const handleSubmit = (values: { username: string, password: string }) => {
        console.log('handleSubmit', values);
        login({ username: values.username, password: values.password }).then(() => console.log('登录成功！'));
    };

    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder='用户名' type="text" id={'username'} />
        </Form.Item>

        <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder='密码' type='password' id={'password'} />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
    </Form>;
};
