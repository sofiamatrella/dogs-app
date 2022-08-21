import React from 'react';
import App from './App';
import { ColorModeProvider } from './context/ColorModeContext';

const Prueba = () => {
  return (
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  );
};

export default Prueba;
