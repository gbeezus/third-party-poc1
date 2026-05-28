import { NextResponse } from 'next/server';
import { loadCurrentTheme, saveTheme } from '~/lib/theme';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(): Promise<NextResponse> {
  const bundle = await loadCurrentTheme();
  if (!bundle) {
    return NextResponse.json(
      { error: 'No theme set' },
      { status: 404, headers: corsHeaders },
    );
  }
  return NextResponse.json(bundle, { headers: corsHeaders });
}

export async function POST(req: Request): Promise<NextResponse> {
  let bundle: unknown;
  try {
    bundle = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Body must be valid JSON' },
      { status: 400, headers: corsHeaders },
    );
  }
  if (!bundle || typeof bundle !== 'object') {
    return NextResponse.json(
      { error: 'DTCG bundle must be an object' },
      { status: 400, headers: corsHeaders },
    );
  }
  await saveTheme(bundle);
  return NextResponse.json({ ok: true }, { headers: corsHeaders });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders });
}
