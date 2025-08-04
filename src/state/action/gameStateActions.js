import CalculateWinner from '../../utils/CalculateWinnerUtil';

export const PLAY_SQUARE = 'PLAY_SQUARE';
export const ADVANCE_ROUND = 'ADVANCE_ROUND';
export const SET_WINNER = 'SET_WINNER';
export const TOGGLE_PLAYABLE = 'TOGGLE_PLAYABLE';
export const SET_SQUARES_WINNER = 'SET_SQUARES_WINNER';
export const SET_ALL_SQUARES = 'SET_ALL_SQUARES';
export const TOGGLE_LAST_PLAYED = 'TOGGLE_LAST_PLAYED';
export const TOGGLE_PLAYABLE_LIST = 'TOGGLE_PLAYABLE_LIST';

export const setWinner = (winner) => ({
  type: SET_WINNER,
  payload: winner,
});

export const togglePlayable = (index) => ({
  type: TOGGLE_PLAYABLE,
  payload: index,
});

export const setSquaresWinner = (squareIndex, winner) => ({
  type: SET_SQUARES_WINNER,
  payload: { squareIndex, winner },
});

export const setAllSquares = (index, squares) => ({
  type: SET_ALL_SQUARES,
  payload: { index, squares },
});

export const toggleLastPlayed = () => ({
  type: TOGGLE_LAST_PLAYED,
});

export const playSquare = (i, lastPlayedNoughts) => {
  const [boardIndex, squareIndex] = i.split('.').map(Number);
  return (dispatch, getState) => {
    const { allSquares } = getState().gameState;
    const board = [...allSquares[boardIndex]];
    
    if (board[squareIndex] || CalculateWinner(board)) return;

    board[squareIndex] = lastPlayedNoughts ? 'x' : 'o';

    dispatch({
      type: PLAY_SQUARE,
      payload: { boardIndex, newBoard: board },
    });

    const currentWinner = CalculateWinner(board);
    dispatch(advanceRound(squareIndex, boardIndex, currentWinner));
  };
};

export const advanceRound = (pickedSquare, playedSquare, currentWinner) => {
  return (dispatch, getState) => {
    const { squaresWinner } = getState().gameState;

    if (currentWinner) {
      dispatch({
        type: SET_SQUARES_WINNER,
        payload: { squareIndex: playedSquare, winner: currentWinner },
      });

      const newWinners = [...squaresWinner];
      newWinners[playedSquare] = currentWinner;
      dispatch(setWinner(CalculateWinner(newWinners)));
    }

    dispatch({ type: TOGGLE_LAST_PLAYED });

    const condition =
      (squaresWinner[pickedSquare] === null && currentWinner === null) ||
      (pickedSquare !== playedSquare && currentWinner !== null);

    dispatch({
      type: TOGGLE_PLAYABLE_LIST,
      payload: { pickedSquare, playedSquare, condition },
    });
  };
};
