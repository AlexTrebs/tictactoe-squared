import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export function useGameSocket(wsUrl) {
  const wsRef = useRef(null);
  const timer = useRef(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!wsUrl) {
      return;
    }

    setStatus('connecting');

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('open');
      timer.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, 30000);
    };

    ws.onmessage = message => {
      const msg = JSON.parse(message.data);
    };

    ws.onclose = () => {
      setStatus('closed');
      if (timer.current) {
        clearInterval(timer.current);
      }
    };

    ws.onerror = () => {
      setStatus('error');
      if (timer.current) {
        clearInterval(timer.current);
      }
    };

    return () => {
      ws.close();
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [wsUrl]);

  const send = useCallback(payload => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  return { status, send };
}
