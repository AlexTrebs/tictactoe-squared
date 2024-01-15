import { Grid } from "@mui/material";
import Square from "./Square";

function Board({ squares, onPlay}) {
    function boardPlay(square) {
        onPlay(square);
    }

    return (  
        <Grid container spacing={0}>
            <Grid key={0} xs={4} borderRight={'1px white'}>
                <Square squareCoord={0} onPlay={boardPlay} value={squares[0]}></Square>
            </Grid>
            <Grid key={1} xs={4}>
                <Square squareCoord={1} onPlay={boardPlay} value={squares[1]}></Square>
            </Grid>
            <Grid key={2} xs={4}>
                <Square squareCoord={2} onPlay={boardPlay} value={squares[2]}></Square>
            </Grid>
            <Grid key={3} xs={4}>
                <Square squareCoord={3} onPlay={boardPlay} value={squares[3]}></Square>
            </Grid>
            <Grid key={4} xs={4}>
                <Square squareCoord={4} onPlay={boardPlay} value={squares[4]}></Square>
            </Grid>
            <Grid key={5} xs={4}>
                <Square squareCoord={5} onPlay={boardPlay} value={squares[5]}></Square>
            </Grid>
            <Grid key={6} xs={4}>
                <Square squareCoord={6} onPlay={boardPlay} value={squares[6]}></Square>
            </Grid>
            <Grid key={7} xs={4}>
                <Square squareCoord={7} onPlay={boardPlay} value={squares[7]}></Square>
            </Grid>
            <Grid key={8} xs={4}>
                <Square squareCoord={8} onPlay={boardPlay} value={squares[8]}></Square>
            </Grid>
        </Grid>
    );

}

export default Board;