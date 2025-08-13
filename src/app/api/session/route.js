import { NextResponse } from 'next/server';
import getWsUrl from '../../../lib/getWsUrl';

const { API_TOKEN, GAME_SERVER, WS_SERVER } = process.env;

// On load if client has existing, return exisiting.
export async function GET(request) {
  const anonId = request.cookies.get('anon_id')?.value;

  if (!anonId) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  try {
    const resp = await fetch(`${GAME_SERVER}/session/exists?token=${API_TOKEN}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      body: JSON.stringify({ anonId }),
    });

    if (resp.status === 404) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    if (!resp.ok) {
      return NextResponse.json({ error: 'Failed to check session' }, { status: 502 });
    }

    const data = await resp.json();
    if (!data?.queueId || !data?.sessionId) {
      return NextResponse.json({ error: 'Invalid response from game API' }, { status: 502 });
    }

    return NextResponse.json({ exists: true, sessionId: data.sessionId, wsUrl: getWsUrl(WS_SERVER, data.queueId, anonId) }, { status: 200 });
  } catch (err) {
    console.log(`Error in finding current session: ${err}`);

    return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
  }
}

export async function POST(request) {
  const anonId = request.cookies.get('anon_id')?.value;
  if (!anonId) {
    return NextResponse.json({ error: 'Missing anon_id cookie' }, { status: 400 });
  }

  try {
    const r = await fetch(`${GAME_SERVER}/session?token=${API_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!r.ok) {
      return NextResponse.json({ error: 'Failed to create session' }, { status: 502 });
    }

    const data = await r.json();
    if (!data?.queueId || !data?.sessionId) {
      return NextResponse.json({ error: 'Invalid response from game API' }, { status: 502 });
    }

    return NextResponse.json({ sessionId: data.sessionId, wsUrl: getWsUrl(WS_SERVER, data.queueId, anonId) }, { status: 200 });
  } catch (err) {
    console.log(`Error in creating new session: ${err}`);

    return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
  }
}
