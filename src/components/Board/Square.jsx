import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import getSquareRender from '../../utils/renderSquareUtil';

function Square({ value, squareCoord, onPlay, isPlayable, children }) {
  const onClick = useCallback(() => {
    onPlay(squareCoord);
  }, [onPlay, squareCoord]);

  return (
    <>
      {isPlayable
        ? (
          <button
            className='square'
            onClick={onClick}
            disabled={!isPlayable}
            style={{
              backgroundColor: '#fff',
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
              borderRadius: '0px',
              border: 'solid 2px black',
            }}
          >
            {children ? children : getSquareRender(value)}
          </button>
        )
        : (
          <Paper
            style={{
              backgroundColor: '#aaa',
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
              boxSizing: 'border-box',
              border: '2px #000 solid',
              borderRadius: '0px',
            }}
          >
            {children ? children : getSquareRender(value)}
          </Paper>
        )}
    </>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  squareCoord: PropTypes.string,
  onPlay: PropTypes.func,
  isPlayable: PropTypes.bool,
  children: PropTypes.node,
};

export default Square;
