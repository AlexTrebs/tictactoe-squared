// src/app/api/session/[sessionId]/route.js
import { NextResponse } from 'next/server';
import getWsUrl from '../../../../lib/getWsUrl';

const GAME_SERVER = process.env.GAME_SERVER;
const WS_SERVER = process.env.GAME_SERVER;
const API_TOKEN = process.env.API_TOKEN;

export async function POST(request, { params }) {
  const anonId = request.cookies.get('anon_id')?.value?.trim() || null;
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId')?.trim() || null;

  if (!anonId || !sessionId || sessionId === 'undefined') {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  console.log(sessionId);

  try {
    const resp = await fetch(`${GAME_SERVER}/session/${encodeURIComponent(sessionId)}/join?token=${API_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anonId })
    });

    if (resp.status === 409) {
      return NextResponse.json(
        { error: 'Client already has an active session, try refreshing', activeSessionId: existing },
        { status: 409 }
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
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
  }
}
