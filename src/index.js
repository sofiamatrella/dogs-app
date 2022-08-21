import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Prueba from './Prueba';
import './index.css';
import AppNavigation from './AppNavigation';
import { ColorModeProvider } from './context/ColorModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppNavigation>
    <App />
  </AppNavigation>
);
