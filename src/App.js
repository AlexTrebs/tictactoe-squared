import { useTheme } from "@mui/material";
import "./App.css";
import Squared from "./components/Squared";
import { ThemeProvider } from "@mui/material";
import React from "react";

function App() {
  const theme = useTheme();
  console.log(theme);

  return (
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
  );
}

export default App;
