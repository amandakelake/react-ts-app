import { Typography } from 'antd';
import React, { useState } from 'react';
import { useProjects } from '../../api/useProjects';
import { useUsers } from '../../api/useUsers';
import { useDebounce } from '../../hooks/useDebounce';
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
    const debouncedParam = useDebounce(param, 200);

    const { isLoading, error, data: list } = useProjects(debouncedParam);
    const { data: users } = useUsers();

    return <div>
        <SearchPanel
            param={param}
            setParam={setParam}
            users={users || []}
        />

        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}

        <List
            users={users || []}
            dataSource={list || []}
            loading={isLoading}
        />
    </div>;
};
