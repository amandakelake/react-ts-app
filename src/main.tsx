import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProviders } from './context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppProviders>
        <App />
    </AppProviders>,
);
