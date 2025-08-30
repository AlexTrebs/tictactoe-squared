import { Button, Paper } from '@mui/material';
import React, { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { useMultiplayer } from '../../hooks/useMultiplayer';
import StartControls from './StartControls';
import { useDispatch } from 'react-redux';
import { TOGGLE_GAME_STARTED_LIST } from '../../stores/gameState/gameStateActions';
import { useSelector } from 'react-redux';
import GameControls from './GameControls';
import { useFlag } from '@unleash/nextjs';

function Controls() {
  const allowMultiplayer = useFlag("multiplayer");
  const [loading, setLoading] = useState(false);
  const { start, join, sessionId } = useMultiplayer(allowMultiplayer);
  const { gameStarted } = useSelector(state => state.gameState);
  let dispatch = useDispatch();
  
  const onLocalClick = () =>  dispatch({
    type: TOGGLE_GAME_STARTED_LIST,
    payload: { gameStarted },
  });

  const onClick = async callback => {
    setLoading(true);
    await callback();
    setLoading(false);
  };

  const debouncedOnClick = useMemo(
    () =>
      debounce(onClick, 300),
    [onClick],
  );

  return (
    <div className='controls-container'>
      <Paper className='controls' style={{ display: 'flex', flexDirection: 'column' }}>
        {gameStarted ?  
          <GameControls />
          : <StartControls 
              debouncedOnClick={debouncedOnClick} 
              loading={loading} 
              start={start} 
              join={join} 
              onLocalClick={onLocalClick}
              allowMultiplayer={allowMultiplayer}
            />}
      </Paper>
    </div>
  );
}

export default Controls;
