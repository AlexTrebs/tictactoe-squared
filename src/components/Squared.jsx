import React, { useState, useEffect } from "react";
import TicTacToe from "./TicTacToe";
import Board from "./Board";
import { Paper } from "@mui/material";
import Square from "./Square";
import getSquareRender from "../utils/RenderSquareUtil";
import CalculateWinner from "../utils/CalculateWinnerUtil";

function Squared() {
  const renderedSquares = [];

  const [lastPlayedNoughts, setLastPlayedNoughts] = useState(false);
  const [winner, setWinner] = useState(null);
  const [squaresWinner, setSquaresWinner] = useState(Array(9).fill(null));
  const [isPlayable, setIsPlayable] = useState(Array(9).fill(true));
  const [allSquares, setAllSquares] = useState(
    Array(9).fill(Array(9).fill(null))
  );

  function toggleBooleanInList(list, index) {
    const temp = list.slice();
    temp[index] = !temp[index];

    return temp;
  }

  function onClick(sqNum) {
    if (!isPlayable.includes(false) || isPlayable[sqNum] === false) {
      setIsPlayable(toggleBooleanInList(isPlayable, sqNum));
    }
  }

  function setWinners(winner, sqNum) {
    const newWinners = squaresWinner.slice();
    newWinners[sqNum] = winner;
    setSquaresWinner(newWinners);

    setWinner(CalculateWinner(newWinners));
  }

  /**
   * Checks if was a winning play, then sets
   *
   * @param {number} pickedSquare Square within tictactoe game picked.
   * @param {number} playedSquare Square within squared game to play.
   * @param {String} currentWinner Current winner for square
   */
  function nextRound(pickedSquare, playedSquare, currentWinner) {
    setLastPlayedNoughts((lastPlayed) => !lastPlayed);

    if (currentWinner != null) {
      setWinners(currentWinner, playedSquare);
    }
    if ((squaresWinner[pickedSquare] === null && currentWinner === null) || (pickedSquare !== playedSquare && currentWinner !== null)) {
      setIsPlayable((listOfPlayable) =>
        toggleBooleanInList(
          toggleBooleanInList(listOfPlayable, playedSquare),
          pickedSquare
        )
      );
    } else {
      setIsPlayable((listOfPlayable) =>
        toggleBooleanInList(listOfPlayable, playedSquare)
      );
    }
  }

  function onPlay(i) {
    const coord = i.split(".");
    const squares = allSquares[coord[0]].slice();

    if (squares[coord[1]] || CalculateWinner(squares)) {
      return;
    }

    if (lastPlayedNoughts) {
      squares[coord[1]] = "x";
    } else {
      squares[coord[1]] = "o";
    }

    setAllSquares(
      allSquares.map((elem, index) => {
        if (index.toString() === coord[0]) {
          return squares;
        } else {
          return elem;
        }
      })
    );

    nextRound(parseInt(coord[1]), parseInt(coord[0]), CalculateWinner(squares));
  }

  for (let sqNum = 0; sqNum < 9; sqNum++) {
    renderedSquares.push(
      <Square
        squareCoord={`${sqNum}`}
        onPlay={onClick}
        isPlayable={isPlayable[sqNum] && !squaresWinner[sqNum]}
        key={sqNum}
      >
        <TicTacToe
          lastPlayedNoughts={lastPlayedNoughts}
          setLastPlayedNoughts={setLastPlayedNoughts}
          winner={squaresWinner[sqNum]}
          setWinners={setWinners}
          isPlayable={!isPlayable[sqNum]}
          loc={sqNum}
          index={sqNum}
          onClick={onClick}
          squares={allSquares[sqNum]}
          onPlay={onPlay}
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
      {winner ? (
        getSquareRender(winner)
      ) : (
        <Board onPlay={onClick} squares={renderedSquares} key={"TicTacToe"} />
      )}
    </Paper>
  );
}

export default Squared;
