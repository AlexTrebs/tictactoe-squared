// Create a new multiplayer session
export async function startSession() {
  const res = await fetch('/api/session', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to start session');
  }

  return res.json(); // { sessionId, wsUrl }
}

// Join an existing multiplayer session
export async function joinSession(sessionId) {
  const res = await fetch(`/api/session/join?sessionId=${sessionId}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error('Failed to join session');
  }

  return { sessionId, ...res.json() }; // { sessionId, wsUrl }
}

// Check if a session still exists
export async function getMySession() {
  const res = await fetch('/api/session', { credentials: 'include' });

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch my session');
  }

  return res.json(); // { sessionId, wsUrl }
}

