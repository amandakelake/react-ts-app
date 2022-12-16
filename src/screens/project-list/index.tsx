import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../common/env';
import { useDebounce } from '../../hooks/useDebounce';
import { useMount } from '../../hooks/useMount';
import { cleanObject } from '../../utils';
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

    useEffect(() => {
        fetch(`${API_URL}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json());
            }
        });
    }, [debouncedParam]);

    useMount(() => {
        fetch(`${API_URL}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
    });

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List users={users} list={list} />
    </div>;
};
