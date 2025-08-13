import React, { useRef, useLayoutEffect } from "react";
import TicTacToe from "./TicTacToe";
import Board from "./Board";
import { Paper } from "@mui/material";
import Square from "./Square";
import getSquareRender from "../utils/RenderSquareUtil";
import { useSelector, useDispatch } from 'react-redux';
import { playSquare, togglePlayable } from '../stores/gameState/gameStateActions';

function Squared() {
  const renderedSquares = [];

  const dispatch = useDispatch();
  const state = useSelector(state => state.gameState);

  function handlePlay(coord) {
    dispatch(playSquare(coord, state.lastPlayedNoughts));
  }

  const handleSquareClick = (index) => {
    dispatch(togglePlayable(index));
  };

  for (let sqNum = 0; sqNum < 9; sqNum++) {
    renderedSquares.push(
      <Square
        squareCoord={`${sqNum}`}
        onPlay={handleSquareClick}
        isPlayable={state.isPlayable[sqNum] && !state.squaresWinner[sqNum]}
        key={sqNum}
      >
        <TicTacToe
          winner={state.squaresWinner[sqNum]}
          isPlayable={!state.isPlayable[sqNum]}
          index={sqNum}
          squares={state.allSquares[sqNum]}
          onPlay={handlePlay}
        />
      </Square>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#0000"
      }}
      id="tictactoe-container"
      className="tictactoe-container"
    >
      <Paper
        id="tictactoe-wrapper"
        sx={{
          textAlign: "-webkit-center",
          alignSelf: "center",
          backgroundColor: '#0000',
          transition: 'none',
          boxShadow: 'none',
          padding: '2vmin'
        }}
      >
        {state.winner ? (
          getSquareRender(state.winner)
        ) : (
          <Board onPlay={handleSquareClick} squares={renderedSquares} key={"TicTacToe"} />
        )}
      </Paper>
    </div>
  );
}

export default Squared;
