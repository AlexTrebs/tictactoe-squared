import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function TopBar() {
  return (
    <AppBar position='static' className='top-bar'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          TicTacToe-Squared
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
