import React from 'react';
import { Param, User } from './index';

export interface SearchPanelProps {
    users: User[]
    param: Param
    setParam: (params: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    return <form>
        <div>
            <input type="text" value={param.name} placeholder={'输入系统名称'} onChange={evt => setParam({
                ...param,
                name: evt.target.value,
            })} />
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value,
            })}>
                <option value={''}>负责人</option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)
                }
            </select>
        </div>
    </form>;
};
