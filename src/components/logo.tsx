import reactLogo from '../assets/react.svg';

export const ReactViteLogo = () => {
    return <div>
        <a href='https://vitejs.dev' target='_blank'>
            <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
        <h1>Vite + React</h1>
    </div>;
};
