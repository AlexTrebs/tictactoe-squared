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
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Squared />
      </div>
    </ThemeProvider>
  );
}

export default App;
