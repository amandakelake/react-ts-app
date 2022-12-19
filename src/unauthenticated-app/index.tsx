import styled from '@emotion/styled';
import { Card, Divider } from 'antd';
import { useState } from 'react';
import { ReactViteLogo } from '../components/logo';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);

    return <div>
        <ReactViteLogo />
        <ShadowCard>
            {isRegister ? <RegisterScreen /> : <LoginScreen />}
            <Divider />
            <a onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? '已有账号，直接登录' : '没有账号？注册新账号'}
            </a>
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
