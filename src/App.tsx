import './App.css';
import reactLogo from './assets/react.svg';
import { LoginScreen } from './screens/login/login';
import { ProjectListScreen } from './screens/project-list';

function App() {

    return (
        <div className='App'>
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src='/vite.svg' className='logo' alt='Vite logo' />
                </a>
                <a href='https://reactjs.org' target='_blank'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <ProjectListScreen />
            <LoginScreen />
        </div>
    );
}

export default App;
