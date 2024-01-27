function Board({ squares }) {
  const rows = [];

  for (let rowNum = 0; rowNum < 3; rowNum++) {
    rows.push(
      <div
        key={rowNum}
        className="board-row"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "table",
        }}
      >
        {squares.slice(rowNum * 3, rowNum * 3 + 3)}
      </div>
    );
  }
  console.log(squares);
  return (
    <div
      className="board"
      container
      spacing={0}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        border: "15px",
        "-webkit-box-shadow": "0px 0px 25px 0px",
        boxShadow: "0px 0px 25px 0px",
      }}
    >
      {rows}
    </div>
  );
}

export default Board;
