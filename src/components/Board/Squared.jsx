import { playSquare, togglePlayable } from '../../stores/gameState/gameStateActions';
import { useDispatch, useSelector } from 'react-redux';
import Board from './Board';
import { Paper } from '@mui/material';
import React from 'react';
import Square from './Square';
import TicTacToe from './TicTacToe';
import getSquareRender from '../../utils/renderSquareUtil';

function Squared() {
  const renderedSquares = [];

  const dispatch = useDispatch();
  const state = useSelector(state => state.gameState);

  const handlePlay = coord => {
    dispatch(playSquare(coord, state.lastPlayedNoughts));
  }

  const handleSquareClick = index => {
    dispatch(togglePlayable(index));
  };

  for (let sqNum = 0; sqNum < 9; sqNum++) {
    renderedSquares.push(
      <Square
        squareCoord={`${sqNum}`}
        onPlay={handleSquareClick}
        isPlayable={state.isPlayable[sqNum] && !state.squaresWinner[sqNum] && state.gameStarted}
        key={sqNum}
      >
        <TicTacToe
          winner={state.squaresWinner[sqNum]}
          isPlayable={!state.isPlayable[sqNum] && state.gameStarted}
          index={sqNum}
          squares={state.allSquares[sqNum]}
          onPlay={handlePlay}
        />
      </Square>,
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#0000',
      }}
      id='tictactoe-container'
      className='tictactoe-container'
    >
      <Paper
        id='tictactoe-wrapper'
        sx={{
          textAlign: '-webkit-center',
          alignSelf: 'center',
          backgroundColor: '#0000',
          transition: 'none',
          boxShadow: 'none',
          padding: '2vmin',
        }}
      >
        {state.winner
          ? (
            getSquareRender(state.winner)
          )
          : (
            <Board onPlay={handleSquareClick} squares={renderedSquares} key={'TicTacToe'} />
          )}
      </Paper>
    </div>
  );
}

export default Squared;
