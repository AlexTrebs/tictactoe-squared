import React from "react";

function Board({ squares }) {
  return (
    <div
      className="board"
      spacing={0}
      style={{
        position: "relative",
        display: "grid",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gridAutoColumns: "100%",
        gridAutoRows: "100%",
        gridTemplateRows: "33% 33% 33%",
        gridTemplateColumns: "33% 33% 33%",
      }}
    >
      {squares}
    </div>
  );
}

export default Board;
