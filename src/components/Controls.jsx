import { Button, Paper } from '@mui/material';
import React, { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { useMultiplayer } from '../hooks/useMultiplayer';

function Controls() {
  const [loading, setLoading] = useState(false);
  const { start, join, sessionId } = useMultiplayer();

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
        <Button>
          New Local Game
        </Button>
        <Button onClick={() => debouncedOnClick(start)}>
          {loading ? 'Creating session...' : 'New Multiplayer Game'}
        </Button>
        <Button onClick={() => debouncedOnClick(join)}>
          Join game
        </Button>
      </Paper>
    </div>
  );
}

export default Controls;
