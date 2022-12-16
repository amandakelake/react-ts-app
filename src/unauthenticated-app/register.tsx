import { Button, Form, Input } from 'antd';
import React from 'react';
import { useAuth } from '../context/auth-context';

export const RegisterScreen = () => {
    const { register } = useAuth();

    const handleSubmit = (values: { username: string, password: string }) => {
        const { username, password } = values;
        register({ username, password }).then(() => console.log('注册成功！'));
    };

    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder='用户名' type="text" id={'username'} />
        </Form.Item>

        <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder='密码' type='password' id={'password'} />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">注册</Button>
        </Form.Item>
    </Form>;
};
