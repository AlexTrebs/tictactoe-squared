import React, { useCallback, useMemo, useState } from 'react';
import { Button, Paper } from '@mui/material';
import debounce from 'lodash/debounce';
import { useFlag } from '@unleash/nextjs';
import { useDispatch, useSelector } from 'react-redux';
import GameControls from './GameControls';
import StartControls from './StartControls';
import { useMultiplayer } from '../../hooks/useMultiplayer';
import { TOGGLE_GAME_STARTED  } from '../../stores/gameState/gameStateActions';

function Controls() {
  const allowMultiplayer = useFlag('multiplayer');
  const [loading, setLoading] = useState(false);
  const { start, join, sessionId } = useMultiplayer(allowMultiplayer);
  const { gameStarted } = useSelector(state => state.gameState);
  let dispatch = useDispatch();
  
  const onLocalClick = () =>  dispatch({
    type: TOGGLE_GAME_STARTED ,
    payload: { gameStarted },
  });

  const onClick = useCallback(async callback => {
    setLoading(true);
    await callback();
    setLoading(false);
  });

  const debouncedOnClick = useMemo(() => debounce(onClick, 300), [debouncedOnClick]);

  return (
    <div className='controls-container'>
      <Paper className='controls' style={{ display: 'flex', flexDirection: 'column' }}>
        {gameStarted ?  (
          <GameControls />
          ) : ( 
            <StartControls 
              debouncedOnClick={debouncedOnClick} 
              loading={loading} 
              start={start} 
              join={join} 
              onLocalClick={onLocalClick}
              allowMultiplayer={allowMultiplayer}
            />
          )}
      </Paper>
    </div>
  );
}

export default Controls;
