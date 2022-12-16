import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useMount } from '../../hooks/useMount';
import { cleanObject } from '../../utils';
import { List } from './list';
import { SearchPanel } from './search-panel';

const apiUrl = import.meta.env.VITE_API_URL;
console.log('apiUrl', apiUrl)

export interface Param {
    name: string
    personId: string
}

export interface User {
    id: number
    name: string
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
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json());
            }
        });
    }, [debouncedParam]);

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
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
