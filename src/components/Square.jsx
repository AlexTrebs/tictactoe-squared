import { Paper } from "@mui/material";
import getSquareRender from "../utils/RenderSquareUtil";

function Square({ value, squareCoord, onPlay, isPlayable, children }) {
  function onClick() {
    onPlay(squareCoord);
    console.log(squareCoord, !isPlayable, value);
  }

  return (
    <>
      { isPlayable ?
        <button 
          className="square"
          onClick={onClick}
          disabled={!isPlayable}
          style={{
            padding: 0,
            textAlign: '-webkit-center',
            width: '100%',
            height: '100%',
            display: 'grid',
            alignItems: 'center',
            position: 'relative',
            justifyItems: 'center',
            maxWidth: 'initial',
            maxHeight: 'initial',
            backgroudColor: !isPlayable && '#333 !important',
        }}
        >
          {children ? children : getSquareRender(value)}
        </button > :
        <Paper           
          style={{
            backgroundColor: '#333',
            padding: 0,
            textAlign: '-webkit-center',
            width: '100%',
            height: '100%',
            display: 'grid',
            alignItems: 'center',
            position: 'relative',
            justifyItems: 'center',
            maxWidth: 'initial',
            maxHeight: 'initial',
            backgroudColor: !isPlayable && '#333 !important',
            boxSizing: 'border-box',
            border: '1px #000 solid',
          }}
          >
          {children ? children : getSquareRender(value)}
        </Paper>
      }
    </>
  );
}

export default Square;
