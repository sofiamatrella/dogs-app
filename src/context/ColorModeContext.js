import React, { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material';

const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#b794e5',
              light: '#dbc0ff',
              dark: '#482C6B',
              contrastText: '#000',
            },
            text: {
              primary: 'rgba(0, 0, 0, 0.9)',
              secondary: 'rgba(0, 0, 0, 0.6)',
              contrast: '#FFF',
            },
            action: {
              hover: '#9a7cc2',
            },
          }
        : {
            mode: 'dark',
            primary: {
              main: '#352F44',
              light: '#5C5470',
              dark: '#2A2438',
              ultraLight: '#DBD8E3',
              contrastText: '#FFF',
            },
            text: {
              primary: '#F7F7F7',
              secondary: '#9E9E9E',
              contrast: '#FFF',
            },
            action: {
              hover: '#9a7cc2',
            },
          }),
    },
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const currentTheme = useMemo(() => createTheme(getDesignTokens(mode)), [
    mode,
  ]);

  const data = { currentTheme, colorMode };
  return (
    <ColorModeContext.Provider value={data}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeContext;
export { ColorModeProvider };
