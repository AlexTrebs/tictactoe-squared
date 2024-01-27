import TicTacToe from "./TicTacToe";
import { useEffect, useState } from "react";
import Board from "./Board";
import { Grid, Paper } from "@mui/material";
import Square from "./Square";
import getSquareRender from "../utils/RenderSquareUtil";
import GamePopover from "./GamePopover";

function Squared({ value, squareCoord }) {
  const renderedSquares = [];
  const renderedTicTacToe = [];

  const [lastPlayedNoughts, setLastPlayedNoughts] = useState(false);
  const [winner, setWinner] = useState(null);
  const [squaresWinner, setSquaresWinner] = useState(Array(9).fill(null));
  const [isPlayable, setIsPlayable] = useState(Array(9).fill(false));
  const [playableGame, setPlayableGame] = useState(null);
  const [openGame, setOpenGame] = useState(false);
  const [isEnterable, setIsEnterable] = useState(Array(9).fill(true));

  function changeBooleanInList(list, index) {
    const temp = list.slice();
    temp[index] = !temp[index];

    return temp;
  }

  function onClick(sqNum) {
    setIsPlayable(changeBooleanInList(isPlayable, sqNum));
    setIsEnterable(changeBooleanInList(isEnterable, sqNum));
    console.log(changeBooleanInList(isEnterable, sqNum));
    setPlayableGame(renderedTicTacToe[sqNum]);
  }

  function setWinners(winner, sqNum) {
    const newWinners = squaresWinner.slice();
    newWinners[sqNum] = winner;
    setSquaresWinner(newWinners);
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
        <Square squareCoord={sqNum} onPlay={onClick} isPlayable={isEnterable[sqNum]}>
          {renderedTicTacToe[sqNum]}
        </Square>
    );
  }

  return (
    <Paper
      sx={{
        width: "100vmin",
        height: "100vmin",
        textAlign: '-webkit-center',
        alignSelf: 'center',
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
