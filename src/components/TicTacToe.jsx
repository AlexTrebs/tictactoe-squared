import { Paper } from '@mui/material';
import CalculateWinner from '../utils/CalculateWinnerUtil';
import Board from './Board';
import { useEffect, useState } from 'react';

function TicTacToe({ winner, onPlay, squares }) {
    const [ completed, setCompleted ] = useState(false);


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