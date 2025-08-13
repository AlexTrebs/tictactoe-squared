import { NextResponse } from 'next/server';
import getWsUrl from '../../../../lib/getWsUrl';

const { API_TOKEN, GAME_SERVER, WS_SERVER } = process.env;

export async function POST(request) {
  const anonId = request.cookies.get('anon_id')?.value?.trim() || null;
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId')?.trim() || null;

  if (!anonId || !sessionId || sessionId === 'undefined') {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  try {
    const resp = await fetch(`${GAME_SERVER}/session/${encodeURIComponent(sessionId)}/join?token=${API_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anonId }),
    });

    if (resp.status === 409) {
      return NextResponse.json(
        { error: 'Client already has an active session, try refreshing' },
        { status: 409 },
      );
    }

    if (!resp.ok) {
      return NextResponse.json({ error: 'Failed to join session' }, { status: 502 });
    }

    const data = await resp.json();
    if (!data?.queueId) {
      return NextResponse.json({ error: 'Invalid response from game API' }, { status: 502 });
    }

    return NextResponse.json({ wsUrl: getWsUrl(WS_SERVER, data.queueId, anonId) }, { status: 200 });
  } catch (err) {
    console.log(`Error in joining session: ${err}`);
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
  }
}
