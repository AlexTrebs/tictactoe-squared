import { Paper } from '@mui/material';
import CalculateWinner from '../utils/CalculateWinner';
import Board from './Board';
import { useEffect, useState } from 'react';

function TicTacToe({ winner, onPlay }) {
    const [ completed, setCompleted ] = useState(false);
    const [squares, setSquares] = useState(Array(9).fill(""));
    function onTicTacToePlay() {
        

    }

    useEffect(() => {
        if(winner){
            setCompleted(true);
        }
    },[winner])
    return (
        <Paper >
            <Board onPlay={onPlay} squares={squares} winner={winner}></Board>
            {completed ? winner : null}
        </Paper>
    );
};

export default TicTacToe;