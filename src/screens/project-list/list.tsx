import React from 'react';
import { Project, User } from './index';

export interface ListProps {
    list: Project[]
    users: User[]
}

export const List = ({ users, list }: ListProps) => {
    return <table>
        <thead>
        <tr>
            <th>系统名称</th>
            <th>负责人</th>
        </tr>
        </thead>
        <tbody>
        {
            list.map(project => <tr key={project.id}>
                <td>{project.name}</td>
                <td>{users.find(user => user.id === project.personId)?.username || 'unKnown'}</td>
            </tr>)
        }
        </tbody>
    </table>;
};
