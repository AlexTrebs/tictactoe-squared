import React, { useEffect } from "react";
import TicTacToe from "./TicTacToe";
import Board from "./Board";
import { Paper } from "@mui/material";
import Square from "./Square";
import getSquareRender from "../utils/RenderSquareUtil";
import { useSelector, useDispatch } from 'react-redux';
import { playSquare, togglePlayable } from '../state/action/gameStateActions';

function Squared() {
  const renderedSquares = [];
  const dispatch = useDispatch();
  const state = useSelector(state => state.gameState);
  console.log(state);
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
          loc={sqNum}
          index={sqNum}
          squares={state.allSquares[sqNum]}
          onPlay={handlePlay}
        />
      </Square>
    );
  }

  useEffect(() => {
    const container = document.getElementById('tictactoe-contianer'); 
    const wrapper = document.getElementById('tictactoe-wrapper');
  
    function adjustWrapperSize() { 
      const containerWidth = container.clientWidth; 
      const containerHeight = container.clientHeight; // Calculate the minimum of the container's width and height 
      const minDimension = Math.min(containerWidth, containerHeight); // Set the wrapper's width and height to the minimum dimension 
      console.log(minDimension);
      wrapper.style.width = `${minDimension-4}px`; 
      wrapper.style.height = `${minDimension-4}px`; // Center the wrapper within the container 
      wrapper.style.visibility = 'visible';
    } // Initial adjustment 
  
    adjustWrapperSize(); // Adjust on window resize 
    
    window.addEventListener('resize', adjustWrapperSize);
  },[])

  return (
    <Paper
      id="tictactoe-wrapper"
      sx={{
        textAlign: "-webkit-center",
        alignSelf: "center",
        backgroundColor: '#0000',
        transition: 'none',
        boxShadow: 'none',
        visibility: 'none',
        padding: '2vmin'
      }}
    >
      {state.winner ? (
        getSquareRender(state.winner)
      ) : (
        <Board onPlay={handleSquareClick} squares={renderedSquares} key={"TicTacToe"} />
      )}
    </Paper>
  );
}

export default Squared;
