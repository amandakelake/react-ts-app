import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Project, User } from './index';

export interface ListProps {
    list: Project[]
    users: User[]
}

export const List = ({ users, list }: ListProps) => {
    const columns: ColumnsType<Project> = [
        {
            title: '系统名称',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: '组织',
            key: 'organization',
            dataIndex: 'organization'
        },
        {
            title: '负责人',
            key: 'person',
            dataIndex: 'personId',
            render: (value, record) => {
                return users.find(user => user.id === value)?.username || 'Not Found'
            }
        },
    ];
    return (
        <Table dataSource={list} columns={columns} rowKey={columns => columns.id} />
    );
};
