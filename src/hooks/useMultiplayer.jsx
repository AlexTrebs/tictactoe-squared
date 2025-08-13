import { useState, useCallback, useEffect } from 'react';
import {
  startSession,
  joinSession,
  getMySession
} from '../api/sessionApi';
import { useGameSocket } from './useGameSocket';
import { useSnackbarStore } from '../stores/snackbarStore';

export function useMultiplayer() {
  const [sessionId, setSessionId] = useState(null);
  const [wsUrl, setWsUrl] = useState(null);
  const enqueueSnackbar = useSnackbarStore((state) => state.enqueueSnackbar)

  const connect = useCallback(async () => {
    try {
      const connected = await getMySession();

      if (!connected) return false; // No session to connect to.

      setSessionId(connected.sessionId);
      setWsUrl(connected.wsUrl);

      return connected.sessionId;
    } catch(e) {
      enqueueSnackbar(e.message, 'error');
    }
  }, []);

  const start = useCallback(async () => {
    try {
      const created = await startSession(); // { sessionId, queueId, wsUrl? }
      
      setSessionId(created.sessionId);
      setWsUrl(created.wsUrl);

      return created.sessionId;
    } catch(e) {
      enqueueSnackbar(e.message, 'error');
    }
  }, [connect]);

  const join = useCallback(async (id) => {
    try {
      const joined = await joinSession(id); // { sessionId, queueId, wsUrl? }

      setSessionId(joined.sessionId);
      setWsUrl(joined.wsUrl);

      return joined.sessionId;
    } catch(e) {
      enqueueSnackbar(e.message, 'error');
    }
  }, [connect]);

  // Try auto-connect once on mount
  useEffect(() => {
    connect().catch(() => {});
  }, [connect]);

  const { status, send } = useGameSocket(wsUrl || undefined);

  return {
    sessionId,
    status,
    send,
    start,
    join,
    connect
  };
}
