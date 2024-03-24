import { Paper } from "@mui/material";
import Board from "./Board";
import { useEffect, useState } from "react";
import CalculateWinner from "../utils/CalculateWinnerUtil";
import Square from "./Square";
import getSquareRender from "../utils/RenderSquareUtil";

function TicTacToe({
  winner,
  isPlayable,
  index,
  onPlay,
  squares,
}) {
  function renderBoard(squ) {
    const renderedSquareslist = [];
    console.log(squares);

    for (let sqNum = 0; sqNum < 9; sqNum++) {
      renderedSquareslist.push(
        <Square
          squareCoord={`${index}.${sqNum}`}
          onPlay={onPlay}
          value={squ[sqNum]}
          isPlayable={isPlayable}
          key={`${index}.${sqNum}`}
        />
      );
    }
    return renderedSquareslist;
  }


  useEffect(() => {
    console.log(squares);
  },[squares])
  return (
    <Paper
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: 'contents',
        width: '-webkit-fill-available',
        height: '100%',
        position: 'relative',
      }}
    >
      {winner ? (
        getSquareRender(winner)
      ) : (
        <Board squares={renderBoard(squares)} />
      )}
    </Paper>
  );
}

export default TicTacToe;
