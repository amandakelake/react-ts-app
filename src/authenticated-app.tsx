import { useAuth } from './context/auth-context';
import { ProjectListScreen } from './screens/project-list';

export const AuthenticatedApp = () => {
    const { user, logout } = useAuth();
    return <div>
        <span>当前用户: {user?.username}</span>
        <button onClick={logout}>登出</button>
        <ProjectListScreen />
    </div>;
};
