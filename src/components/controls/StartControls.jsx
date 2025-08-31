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
          <ControlsButton onClick={() => debouncedOnClick(start)} disabled={loading}>
            {loading ? 'Creating session...' : 'New Multiplayer Game'}
          </ControlsButton>
          <ControlsButton onClick={() => debouncedOnClick(join)} disabled={loading}>
            Join game
          </ControlsButton>
        </>
      )}
    </>
  );
}

export default StartControls;
