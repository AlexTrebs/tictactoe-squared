import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function TopBar() {
  return (
    <AppBar position="static" className='top-bar'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TicTacToe-Squared
        </Typography>
      </Toolbar>
    </AppBar>
  );
}