import React, { createContext, useMemo} from 'react';
import './App.css';
import Home from './components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { usePersistedState } from './functions/persistState';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = usePersistedState<'light' | 'dark'>('colorTheme', 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [setMode],
  );

  const theme: any = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: '#757ce8',
            main: '#ff9800',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
        }
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
