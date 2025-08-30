import React from 'react';
import ControlsButton from './ControlsButton';

function StartControls({
  debouncedOnClick, 
  start, 
  join, 
  loading, 
  onLocalClick,
  allowMultiplayer,
}) {
  return (
    <>
      <ControlsButton onClick={onLocalClick}>
        New Local Game
      </ControlsButton>
      {allowMultiplayer && (
        <>
          <ControlsButton onClick={() => debouncedOnClick(start)}>
            {loading ? 'Creating session...' : 'New Multiplayer Game'}
          </ControlsButton>
          <ControlsButton onClick={() => debouncedOnClick(join)}>
            Join game
          </ControlsButton>
        </>
      )}
    </>
  );
}

export default StartControls;
