import { useEffect } from 'react';
import { useAsync } from '../hooks/useAsync';
import { Param, Project } from '../screens/project-list';
import { cleanObject } from '../utils';
import { useHttp } from '../utils/http';

export const useProjects = (param?: Partial<Param>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();

    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }));
    }, [param]);

    return result;
};
