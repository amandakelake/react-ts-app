import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useMount } from '../../hooks/useMount';
import { cleanObject } from '../../utils';
import { useHttp } from '../../utils/http';
import { List } from './list';
import { SearchPanel } from './search-panel';

export interface Param {
    name: string
    personId: string
}

export interface User {
    id: number
    username: string
    token: string
}

export interface Project {
    id: number
    name: string
    personId: number
    organization: string
    created: number
}

export const ProjectListScreen = () => {
    const [param, setParam] = useState<Param>({ name: '', personId: '' });
    const [users, setUsers] = useState<User[]>([]);
    const [list, setList] = useState<Project[]>([]);

    const debouncedParam = useDebounce(param, 200);
    const client = useHttp();

    useEffect(() => {
        client('projects', { data: cleanObject(debouncedParam) }).then(setList);
    }, [debouncedParam]);

    useMount(() => {
        client('users').then(setUsers);
    });

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List users={users} list={list} />
    </div>;
};
