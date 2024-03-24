function flatListToMatrix(flatList) {
  const len = Math.sqrt(flatList.length);
  const matrix = [];
  let index = 0;

  for (let i = 0; i < len; i++) {
      const row = [];

      for (let j = 0; j < len; j++) {
          row.push(flatList[index]);
          index++;
      }

      matrix.push(row);
  }

  return matrix;
}

function CalculateWinner(squares) {
  const board = flatListToMatrix(squares);
  const size = board.length;
  
  // Check rows and columns
  for (let i = 0; i < size; i++) {
    if (board[i][0]!= null && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      console.log("Player", board[i][0], "wins (row)");
      return board[i][0];
    }

    if (board[0][i]!= null && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      console.log("Player", board[0][i], "wins (column)");
      return board[0][i];
    }
  }

  // Check diagonals
  if (board[0][0]!= null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    console.log("Player", board[0][0], "wins (main diagonal)");
    return board[0][0];
  }

  if (board[0][2]!= null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    console.log("Player", board[0][2], "wins (anti-diagonal)");
    return board[0][2];
  }

  console.log("No winner");
  return null;
}

export default CalculateWinner;
