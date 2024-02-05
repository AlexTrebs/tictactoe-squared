import getSquareRender from "../utils/RenderSquareUtil";

function Square({ value, squareCoord, onPlay, children, isPlayable, sx }) {
  function onClick() {
    onPlay(squareCoord);
  }

  return (
    <>
      {
        <button 
          className="square"
          onClick={isPlayable ? onClick : null}
          sx={sx}
          style={{
            //border: '3px solid',
            //float: 'initial',
            //marginRight: '0px',
            //marginTop: '1px',
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
        }}
        >
          {children ? children : getSquareRender(value)}
        </button >
      }
    </>
  );
}

export default Square;
