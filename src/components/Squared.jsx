import CalculateWinner from "../utils/CalculateWinnerUtil";
import TicTacToe from "./TicTacToe";
import { useEffect, useState } from "react";

function Squared({ value, squareCoord }) {
    const [ lastPlayedNoughts, setLastPlayedNoughts ] = useState(false);
    const [ squares, setSquares ] = useState(Array(9).fill(null));
    const [ winner, setWinner ] = useState(null);

    function onPlay(i) {
      const nextSquares = squares.slice();
      if(squares[i] || CalculateWinner(nextSquares)){
        return;
      }

      if(lastPlayedNoughts){
        nextSquares[i] = 'x';
        setSquares(nextSquares);
      } else {
        nextSquares[i] = 'o';
        setSquares(nextSquares);
      }

      setLastPlayedNoughts(!lastPlayedNoughts);
      const currentWinner = CalculateWinner(nextSquares);

      if(currentWinner != null){
        setWinner(currentWinner);
      }
    }

    useEffect(() => {
        console.log(winner);
    },[winner])

    return(
        <TicTacToe setWinner={setWinner} onPlay={onPlay} squares={squares} winner={winner} />
      )
};

export default Squared;