import { Button } from "@mui/material";
import getSquareRender from "../utils/RenderSquareUtil";
import { Paper } from "@mui/material";

function Square({ value, squareCoord, onPlay, children, isPlayable }) {
  function onClick() {
    onPlay(squareCoord);
  }

  return (
    <>
      {isPlayable ? (
        <Button
          className="square"
          onClick={onClick}
          sx={{ width: "33%", height: "100%" }}
          style={{
            border: '5px solid',
            float: 'initial',
            marginRight: '0px',
            marginTop: '1px',
            padding: 0,
            textAlign: 'center',
        }}
        >
          {children ? children : getSquareRender(value)}
        </Button>
      ) : children ? (
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            textAlign: "-webkit-center",
            alignSelf: "center",
          }}
        >
          {children}
        </Paper>
      ) : (
        getSquareRender(value)
      )}
    </>
  );
}

export default Square;
