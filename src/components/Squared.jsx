import TicTacToe from "./TicTacToe";
import { useState } from "react";
import Board from "./Board";
import { Paper } from "@mui/material";
import Square from "./Square";
import getSquareRender from "../utils/RenderSquareUtil";
import GamePopover from "./GamePopover";
import CalculateWinner from "../utils/CalculateWinnerUtil";

function Squared({ value, squareCoord }) {
  const renderedSquares = [];
  const renderedTicTacToe = [];

  const [lastPlayedNoughts, setLastPlayedNoughts] = useState(false);
  const [winner, setWinner] = useState(null);
  const [squaresWinner, setSquaresWinner] = useState(Array(9).fill(null));
  const [isPlayable, setIsPlayable] = useState(Array(9).fill(false));
  const [playableGame, setPlayableGame] = useState(null);
  const [openGame, setOpenGame] = useState(false);

  function changeBooleanInList(list, index) {
    const temp = list.slice();
    temp[index] = !temp[index];

    return temp;
  }

  function onClick(sqNum) {
    setIsPlayable(changeBooleanInList(isPlayable, sqNum));
    setPlayableGame(renderedTicTacToe[sqNum]);
  }

  function setWinners(winner, sqNum) {
    const newWinners = squaresWinner.slice();
    newWinners[sqNum] = winner;
    setSquaresWinner(newWinners);

    setWinner(CalculateWinner(newWinners));
  }

  for (let sqNum = 0; sqNum < 9; sqNum++) {
    renderedTicTacToe.push(
      <TicTacToe
        lastPlayedNoughts={lastPlayedNoughts}
        setLastPlayedNoughts={setLastPlayedNoughts}
        winner={squaresWinner[sqNum]}
        setWinners={setWinners}
        loc={sqNum}
        isPlayable={isPlayable[sqNum]}
      />
    );

    renderedSquares.push(
      <Square
        squareCoord={sqNum}
        onPlay={onClick}
        isPlayable={true}
        sx={{ width: "33%", height: "100%", display: "block" }}
      >
        {renderedTicTacToe[sqNum]}
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
        <Board onPlay={onClick} squares={renderedSquares} />
      )}
      <GamePopover isOpened={openGame} game={playableGame} />
    </Paper>
  );
}

export default Squared;
