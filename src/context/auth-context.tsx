import React, { ReactNode, useState } from 'react';
import * as auth from '../auth-provider';
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
    console.log('bootstrapUser -> token: ', token)
    // 如果当前localStorage里的token未过期，重新拉取个人信息，
    if (token) {
        const data = await http('user/me', { token });
        console.log('bootstrapUser -> data: ', data)
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
    const [user, setUser] = useState<User | null>(null);

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user));
    const logout = () => auth.logout().then(() => setUser(null));

    useMount(() => {
        // 初始化，判断一次token
        bootstrapUser().then(setUser);
    });

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用');
    }
    return context;
};
