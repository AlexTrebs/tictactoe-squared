import TicTacToe from "./TicTacToe";
import { useState } from "react";
import Board from "./Board";
import { Paper } from "@mui/material";
import Square from "./Square";
import getSquareRender from "../utils/RenderSquareUtil";
import CalculateWinner from "../utils/CalculateWinnerUtil";
import React from "react";

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
    if (squaresWinner[pickedSquare] === null && currentWinner == null) {
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
        isPlayable={isPlayable[sqNum]}
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

  return (
    <Paper
      sx={{
        width: "90vmin",
        height: "90vmin",
        textAlign: "-webkit-center",
        alignSelf: "center",
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
