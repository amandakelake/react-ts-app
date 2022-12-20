import { useEffect } from 'react';
import { useAsync } from '../hooks/useAsync';
import { User } from '../screens/project-list';
import { useHttp } from '../utils/http';

export const useUsers = () => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>();

    useEffect(() => {
        run(client('users'));
    }, []);

    return result;
};
