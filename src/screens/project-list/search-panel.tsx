import { Form, Input, Select } from 'antd';
import React from 'react';
import { Param, User } from './index';

export interface SearchPanelProps {
    users: User[]
    param: Param
    setParam: (params: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    return <Form layout={'inline'} style={{ marginBottom: '2rem' }}>
        <Form.Item>
            <Input
                type="text"
                value={param.name}
                placeholder={'输入系统名称'}
                onChange={evt => setParam({ ...param, name: evt.target.value })}
                allowClear={true}
            />
        </Form.Item>
        <Form.Item>
            <Select
                value={param.personId}
                onChange={value => setParam({ ...param, personId: value })}
            >
                <Select.Option value={''}>负责人</Select.Option>
                {
                    users.map(user => <Select.Option key={user.id} value={user.id}>
                        {user.username}
                    </Select.Option>)
                }
            </Select>
        </Form.Item>
    </Form>;
};
