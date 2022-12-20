import { Button, Form, Input } from 'antd';
import React from 'react';
import { useAuth } from '../context/auth-context';
import { useAsync } from '../hooks/useAsync';

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync();

    const handleSubmit = async ({
                                    copyPassword,
                                    ...values
                                }: { username: string, password: string, copyPassword: string }) => {
        if (copyPassword !== values.password) {
            onError(new Error('请确认两次输入的密码相同'));
            return;
        }
        try {
            const { username, password } = values;
            await run(register({ username, password }));
        } catch (e) {
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

        <Form.Item name={'copyPassword'} rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder='确认密码' type='password' id={'copyPassword'} />
        </Form.Item>

        <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">注册</Button>
        </Form.Item>
    </Form>;
};
