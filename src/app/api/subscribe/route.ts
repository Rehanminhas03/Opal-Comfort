import { NextRequest, NextResponse } from 'next/server';

/**
 * Newsletter subscribe endpoint. Validates the email, drops bots (honeypot), and
 * applies a best-effort rate limit. If MAILING_LIST integration is configured
 * later (e.g. Resend Audiences / Mailchimp), add the API call where noted; until
 * then it accepts and logs the address.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: NextRequest) {
  let body: { email?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot.
  if (body.company && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? '').trim();
  if (!emailOk(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 422 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  // TODO: push `email` to the mailing-list provider once configured.
  console.info('[subscribe] new subscriber:', email);

  return NextResponse.json({ ok: true });
}
