import { NextRequest, NextResponse } from 'next/server';
import { createLogger } from '@/lib/logger';

const log = createLogger('Pollinations API');

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const prompt = searchParams.get('prompt');
    const model = searchParams.get('model') || 'flux';
    const key = searchParams.get('key');

    if (!prompt) {
      return new NextResponse(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });
    }

    const targetUrl = new URL(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
    targetUrl.searchParams.set('model', model);
    // targetUrl.searchParams.set('nologo', 'true'); // clean image

    if (key) {
      targetUrl.searchParams.set('key', key);
    }

    log.info(
      `Fetching Pollinations image for prompt: "${prompt.slice(0, 50)}..." via model: ${model}`,
    );

    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      log.error(`Pollinations API error ${response.status}: ${errorText}`);
      return new NextResponse(
        JSON.stringify({ error: `Pollinations API returned ${response.status}` }),
        { status: response.status },
      );
    }

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log.error(`Pollinations handler failed:`, error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error', details: message }), {
      status: 500,
    });
  }
}
