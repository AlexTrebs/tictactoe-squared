import React from "react";
import { Paper } from "@mui/material";
import getSquareRender from "../utils/RenderSquareUtil";

function Square({ value, squareCoord, onPlay, isPlayable, children }) {
  function onClick() {
    onPlay(squareCoord);
  }

  return (
    <>
      {isPlayable ? (
        <button
          className="square"
          onClick={onClick}
          disabled={!isPlayable}
          style={{
            backgroundColor: "#fff",
            padding: 0,
            textAlign: "-webkit-center",
            width: "100%",
            height: "100%",
            display: "grid",
            alignItems: "center",
            position: "relative",
            justifyItems: "center",
            maxWidth: "initial",
            maxHeight: "initial",
            borderRadius: '0px',
            border: 'solid 2px black'
          }}
        >
          {children ? children : getSquareRender(value)}
        </button>
      ) : (
        <Paper
          style={{
            backgroundColor: "#aaa",
            padding: 0,
            textAlign: "-webkit-center",
            width: "100%",
            height: "100%",
            display: "grid",
            alignItems: "center",
            position: "relative",
            justifyItems: "center",
            maxWidth: "initial",
            maxHeight: "initial",
            boxSizing: "border-box",
            border: "2px #000 solid",
            borderRadius: '0px',
          }}
        >
          {children ? children : getSquareRender(value)}
        </Paper>
      )}
    </>
  );
}

export default Square;
