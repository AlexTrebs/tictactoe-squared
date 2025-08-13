import { getMySession, joinSession, startSession } from '../api/sessionApi';
import { useCallback, useEffect, useState } from 'react';
import { useGameSocket } from './useGameSocket';
import { useSnackbarStore } from '../stores/snackbarStore';

export function useMultiplayer() {
  const [sessionId, setSessionId] = useState(null);
  const [wsUrl, setWsUrl] = useState(null);
  const enqueueSnackbar = useSnackbarStore(state => state.enqueueSnackbar);

  const connect = useCallback(async () => {
    try {
      const connected = await getMySession();

      // No session to connect to.
      if (!connected) {
        return false;
      }

      setSessionId(connected.sessionId);
      setWsUrl(connected.wsUrl);

      return connected.sessionId;
    } catch (err) {
      enqueueSnackbar(err.message, 'error');
    }
  }, []);

  const start = useCallback(async () => {
    try {
      const created = await startSession(); // { sessionId, queueId, wsUrl? }

      setSessionId(created.sessionId);
      setWsUrl(created.wsUrl);

      return created.sessionId;
    } catch (err) {
      enqueueSnackbar(err.message, 'error');
    }
  }, [connect]);

  const join = useCallback(async id => {
    try {
      const joined = await joinSession(id); // { sessionId, queueId, wsUrl? }

      setSessionId(joined.sessionId);
      setWsUrl(joined.wsUrl);

      return joined.sessionId;
    } catch (err) {
      enqueueSnackbar(err.message, 'error');
    }
  }, [connect]);

  // Try auto-connect once on mount
  useEffect(() => {
    connect().catch();
  }, [connect]);

  const { status, send } = useGameSocket(wsUrl || undefined);

  return {
    sessionId,
    status,
    send,
    start,
    join,
    connect,
  };
}
