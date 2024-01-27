import { Paper } from "@mui/material";
import Board from "./Board";
import { useState } from "react";
import CalculateWinner from "../utils/CalculateWinnerUtil";
import { Grid } from "@mui/material";
import Square from "./Square";
import getSquareRender from "../utils/RenderSquareUtil";

function TicTacToe({
  lastPlayedNoughts,
  setLastPlayedNoughts,
  winner,
  loc,
  setWinners,
  isPlayable,
}) {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function renderTicTacToeSquares(squares) {
    const renderedSquares = [];

    for (let sqNum = 0; sqNum < 9; sqNum++) {
      renderedSquares.push(
        <Square
          squareCoord={sqNum}
          onPlay={onPlay}
          value={squares[sqNum]}
          isPlayable={isPlayable}
        />
      );
    }

    return renderedSquares;
  }

  function onPlay(i) {
    const nextSquares = squares.slice();
    if (squares[i] || CalculateWinner(nextSquares)) {
      return;
    }

    if (lastPlayedNoughts) {
      nextSquares[i] = "x";
      setSquares(nextSquares);
    } else {
      nextSquares[i] = "o";
      setSquares(nextSquares);
    }

    setLastPlayedNoughts(!lastPlayedNoughts);
    const currentWinner = CalculateWinner(nextSquares);

    if (currentWinner != null) {
      setWinners(currentWinner, loc);
    }
  }
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {winner ? (
        getSquareRender(winner)
      ) : (
        <Board onPlay={onPlay} squares={renderTicTacToeSquares(squares)} />
      )}
    </Paper>
  );
}

export default TicTacToe;
