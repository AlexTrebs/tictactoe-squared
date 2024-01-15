import CalculateWinner from "../utils/CalculateWinner";
import TicTacToe from "./TicTacToe";
import { useEffect, useState } from "react";

function Squared({ value, squareCoord, onPlay }) {
    const [ lastPlayedNoughts, setLastPlayedNoughts ] = useState(false);
    const [ squares, setSquares ] = useState(Array(9).fill(null));
    const [ winner, setWinner ] = useState(null);

    function onPlay(i) {
      const nextSquares = squares.slice();
      console.log(CalculateWinner(nextSquares));
      if(squares[i] || CalculateWinner(nextSquares)){
        console.log('won');
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

      if(currentWinner){

        setWinner(currentWinner);

      }
      console.log(winner);
    }

    useEffect(() => {
        console.log(winner);
    },[winner])

    return(
        <TicTacToe setWinner={setWinner} onPlay={onPlay} squares={squares} winner={winner} />
      )
};

export default Squared;