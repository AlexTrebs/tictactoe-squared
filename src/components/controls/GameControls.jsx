import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ControlsButton from './ControlsButton';

function GameControls() {
  return (
    <div class='game-controls' role='toolbar' aria-label='Game controls'>
      <ControlsButton>
        <ArrowBackIcon />
      </ControlsButton>
      <ControlsButton>
        Restart
      </ControlsButton>
      <ControlsButton>
        <ArrowForwardIcon />
      </ControlsButton>
    </div>
  );
}

export default GameControls;
