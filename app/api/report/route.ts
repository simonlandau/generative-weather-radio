import { NextRequest, NextResponse } from 'next/server';
import { generateAudio } from '@/server/openai-adapter';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const script = searchParams.get('script');

  if (!script || typeof script !== 'string') {
    return NextResponse.json({ error: 'Invalid script' }, { status: 400 });
  }

  try {
    const audioBuffer = await generateAudio(script);
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}