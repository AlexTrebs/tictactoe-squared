import './styles/scss/main.scss';
import { Container, ThemeProvider, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import Controls from './components/Controls';
import { Provider } from 'react-redux';
import SnackbarList from './components/SnackbarList';
import Squared from './components/Squared';
import TopBar from './components/TopBar';
import store from './stores/gameState/gameStateStore';
import useAnonId from './hooks/useAnonId';

export default function App() {
  const theme = useTheme();
  useAnonId();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const rootElement = document.documentElement;

    function updateRootUnits() {
      const rect = rootElement.getBoundingClientRect();
      rootElement.style.setProperty('--rw', `${rect.width / 100}px`);
      rootElement.style.setProperty('--rh', `${rect.height / 100}px`);
    }

    // eslint-disable-next-line no-undef
    const resizeObserver = new ResizeObserver(updateRootUnits);
    resizeObserver.observe(rootElement);
    updateRootUnits();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TopBar />
          <Container id='game' >
            <div className='game_grid'>
              <Squared />
              <Controls />
            </div>
          </Container>
          <SnackbarList />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export function reportWebVitals(metric) {
  console.log(metric);
}
