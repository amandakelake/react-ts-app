import qs from 'qs';
import * as auth from '../auth-provider';
import { API_URL } from '../common/env';
import { useAuth } from '../context/auth-context';

interface Config extends RequestInit {
    token?: string
    data?: Record<string, any>
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig,
    };

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }
    return window.fetch(`${API_URL}/${endpoint}`, config)
        .then(async response => {
            // 标准restful 未登录
            if (response.status === 401) {
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: '请重新登录' });
            }
            const res = await response.json();
            if (response.ok) {
                return res;
            } else {
                // fetch api不会对服务端的异常状态抛出异常，这点跟axios表现不同（状态不为200直接抛出异常）
                // 只会在断网、服务端真的返回失败，才会抛出异常
                return Promise.reject(res);
            }
        });
};

export const useHttp = () => {
    const { user } = useAuth();

    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {
        ...config,
        token: user?.token,
    });
};
