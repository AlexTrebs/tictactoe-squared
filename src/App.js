import React from "react";
import { useTheme } from "@mui/material";
import "./App.css";
import Squared from "./components/Squared";
import { ThemeProvider } from "@mui/material";
import { Provider } from 'react-redux';
import store from './state/store/gameStateStore'; // path to your store.js

function App() {
  const theme = useTheme();
  console.log(theme);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: '100%', 
            height: '100%',
            backgroundColor: "#0000"
          }}
          id="tictactoe-contianer"
        >
          <Squared />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
