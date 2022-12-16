import { Card } from 'antd';
import './App.css';
import { AuthenticatedApp } from './authenticated-app';
import { ReactViteLogo } from './components/logo';
import { useAuth } from './context/auth-context';
import { UnauthenticatedApp } from './unauthenticated-app';

function App() {
    const { user } = useAuth();
    return (
        <div className='App'>
            <ReactViteLogo />
            <Card>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </Card>
        </div>
    );
}

export default App;
