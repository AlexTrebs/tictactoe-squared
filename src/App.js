import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import Squared from "./components/Squared";
import { Container, ThemeProvider } from "@mui/material";
import { Provider } from 'react-redux';
import store from './stores/gameState/gameStateStore'; // path to your store.js
import "./styles/scss/main.scss";
import Controls from "./components/Controls";
import TopBar from "./components/TopBar";
import useAnonId from "./hooks/useAnonId";
import { useMultiplayer } from "./hooks/useMultiplayer";
import SnackbarList from "./components/SnackbarList";

export default function App() {
  const theme = useTheme();
  useAnonId();

  useEffect(() => {
    const rootElement = document.documentElement;

    function updateRootUnits() {
      const rect = rootElement.getBoundingClientRect();
      rootElement.style.setProperty('--rw', `${rect.width / 100}px`);
      rootElement.style.setProperty('--rh', `${rect.height / 100}px`);
    }

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
          <Container id="game" >
            <div className="game_grid">
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
