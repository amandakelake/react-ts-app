import styled from '@emotion/styled';
import { Button, Card, Divider, Typography } from 'antd';
import { useState } from 'react';
import { ReactViteLogo } from '../components/logo';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const switchAction = () => {
        setError(null);
        setIsRegister(!isRegister);
    };

    useDocumentTitle('注册登录', false)

    return <div>
        <ReactViteLogo />
        <ShadowCard>
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
            <Divider />
            <Button type={'link'} onClick={switchAction}>
                {isRegister ? '已有账号，直接登录' : '没有账号？注册新账号'}
            </Button>
        </ShadowCard>
    </div>;
};

const ShadowCard = styled(Card)`
  margin: 0 auto;
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
