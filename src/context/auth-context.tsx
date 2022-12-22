import React, { ReactNode } from 'react';
import * as auth from '../auth-provider';
import { FullPageError, FullPageLoading } from '../components/full-page';
import { useAsync } from '../hooks/useAsync';
import { useMount } from '../hooks/useMount';
import { User } from '../screens/project-list';
import { http } from '../utils/http';

interface AuthForm {
    username: string
    password: string
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    console.log('bootstrapUser -> token: ', token);
    // 如果当前localStorage里的token未过期，重新拉取个人信息，
    if (token) {
        const data = await http('user/me', { token });
        console.log('bootstrapUser -> data: ', data);
        user = data;
    }
    return user;
};

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { run, isError, isLoading, isIdle, error, data: user, setData: setUser } = useAsync<User | null>();

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user));
    const logout = () => auth.logout().then(() => setUser(null));

    useMount(async () => {
        // 初始化，判断一次token
        await run(bootstrapUser());
    });

    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }

    if (isError) {
        return <FullPageError error={error} />;
    }

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用');
    }
    return context;
};
