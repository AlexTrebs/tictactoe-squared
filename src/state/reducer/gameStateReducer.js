import {
  SET_WINNER,
  TOGGLE_PLAYABLE,
  SET_SQUARES_WINNER,
  SET_ALL_SQUARES,
  TOGGLE_LAST_PLAYED,
  PLAY_SQUARE,
  TOGGLE_PLAYABLE_LIST
} from '../action/gameStateActions';

const initialState = {
  lastPlayedNoughts: false,
  winner: null,
  squaresWinner: Array(9).fill(null),
  isPlayable: Array(9).fill(true),
  allSquares: Array(9).fill(Array(9).fill(null)),
};

export default function gameStateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WINNER:
      return { ...state, winner: action.payload };

    case TOGGLE_PLAYABLE: {
      const newPlayable = [...state.isPlayable];
      newPlayable[action.payload] = !newPlayable[action.payload];
      return { ...state, isPlayable: newPlayable };
    }

    case SET_SQUARES_WINNER: {
      const newWinners = [...state.squaresWinner];
      newWinners[action.payload.squareIndex] = action.payload.winner;
      return { ...state, squaresWinner: newWinners };
    }

    case SET_ALL_SQUARES: {
      const { index, squares } = action.payload;
      const newAllSquares = state.allSquares.map((set, i) =>
        i === index ? squares : set
      );
      return { ...state, allSquares: newAllSquares };
    }

    case TOGGLE_LAST_PLAYED:
      return { ...state, lastPlayedNoughts: !state.lastPlayedNoughts };

    case PLAY_SQUARE: {
      const { boardIndex, newBoard } = action.payload;
      const newSquares = state.allSquares.map((set, i) =>
        i === boardIndex ? newBoard : set
      );
      return { ...state, allSquares: newSquares };
    }

    case TOGGLE_PLAYABLE_LIST: {
      const { pickedSquare, playedSquare, condition } = action.payload;
      let updatedPlayable = [...state.isPlayable];

      if (condition) {
        updatedPlayable[pickedSquare] = !updatedPlayable[pickedSquare];
        updatedPlayable[playedSquare] = !updatedPlayable[playedSquare];
      } else {
        updatedPlayable[playedSquare] = !updatedPlayable[playedSquare];
      }

      return { ...state, isPlayable: updatedPlayable };
    }

    default:
      return state;
  }
}



