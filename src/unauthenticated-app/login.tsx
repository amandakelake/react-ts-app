import { Button, Form, Input } from 'antd';
import React from 'react';
import { useAuth } from '../context/auth-context';
import { useAsync } from '../hooks/useAsync';

export interface LoginParam {
    username: string
    password: string
}

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { login } = useAuth();
    const { run, isLoading } = useAsync();

    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            const { username, password } = values;
            await run(login({ username, password }))
        } catch (e) {
            console.log('login error', e)
            // @ts-ignore
            onError(e);
        }
    };

    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder='用户名' type="text" id={'username'} />
        </Form.Item>

        <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder='密码' type='password' id={'password'} />
        </Form.Item>

        <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">登录</Button>
        </Form.Item>
    </Form>;
};
