import { API_URL } from './common/env';
import { User } from './screens/project-list';
import { LoginParam } from './unauthenticated-app/login';

export const localStorageKey = '__auth_provider_token__';

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (user: User) => {
    window.localStorage.setItem(localStorageKey, user.token || '');
    return user;
};

export const register = (data: LoginParam) => {
    if (!data.username || !data.password) {
        console.error('缺失必填项');
        return Promise.reject('缺失必填项');
    }
    return fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async response => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(response);
        }
    });
};

export const login = (data: LoginParam) => {
    if (!data.username || !data.password) {
        console.error('缺失必填项');
        return Promise.reject('缺失必填项');
    }
    return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async response => {
        if (response.ok) {
            const data = await response.json();
            console.log('response.json()', data);
            return handleUserResponse(data);
        } else {
            return Promise.reject(response);
        }
    });
};

export const logout = async () => {
    window.localStorage.removeItem(localStorageKey);
};
