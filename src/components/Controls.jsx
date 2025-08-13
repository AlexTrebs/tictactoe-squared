import React, { useEffect, useState, useMemo } from 'react';
import { Button, Paper } from "@mui/material";
import AlertSnackbar from './SnackbarList';
import { useMultiplayer } from '../hooks/useMultiplayer';
import debounce from 'lodash/debounce';

function Controls() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { start, join, sessionId } = useMultiplayer();

  const onClick = async (callback) => {
    setLoading(true);
    const sessionId = await callback();
    setLoading(false);
  };

  const debouncedOnClick = useMemo(
    () =>
      debounce(onClick, 300),
    [onClick]
  );

  return (
    <div className="controls-container">
      <Paper className="controls" style={{display: 'flex', flexDirection: 'column'}}>
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
      <AlertSnackbar message={error} severity={'error'} setMessage={setError} />
    </div>
  );
}

export default Controls;
