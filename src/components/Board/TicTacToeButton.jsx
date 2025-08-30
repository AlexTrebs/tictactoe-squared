import Button from '@mui/material/Button';
import React from 'react';

function TicTacToeButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <img src='../assets/icon.jpeg' width='100' alt='folder' />
      <label>TicTacToe^2</label>
    </Button>
  );
}

export default TicTacToeButton;
