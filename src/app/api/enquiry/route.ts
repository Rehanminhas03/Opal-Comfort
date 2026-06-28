import { NextRequest, NextResponse } from 'next/server';

/**
 * Enquiry endpoint. Validates the lead, drops obvious bots (honeypot), applies a
 * best-effort in-memory rate limit, and emails the enquiry via Resend IF a
 * RESEND_API_KEY is configured. Without a key it safely no-ops and returns ok so
 * the form still works — leads also have the WhatsApp fallback.
 *
 * Required env to enable email (see .env.example):
 *   RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 */

type Enquiry = {
  name?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  product?: string;
  budget?: string;
  message?: string;
  heard?: string;
  company?: string; // honeypot
};

// Best-effort rate limit. Note: per-instance only in serverless; for hard limits
// use a shared store (Upstash/Redis). Good enough to deter casual abuse.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
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
  let body: Enquiry;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: a real user never fills this. Pretend success and drop it.
  if (body.company && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const phone = (body.phone ?? '').trim();
  if (!name || !emailOk(email) || phone.replace(/\D/g, '').length < 7) {
    return NextResponse.json({ ok: false, error: 'Missing or invalid fields' }, { status: 422 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  // No email configured yet — accept the lead so the UX works. The WhatsApp
  // fallback in the form is the live delivery channel until email is wired.
  if (!apiKey || !to || !from) {
    console.info('[enquiry] received (email not configured):', { name, email, phone });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    body.postcode && `Postcode: ${body.postcode}`,
    body.product && `Interested in: ${body.product}`,
    body.budget && `Budget: ${body.budget}`,
    body.heard && `Heard via: ${body.heard}`,
    '',
    body.message ? `Message:\n${body.message}` : 'Message: (none)',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New enquiry — ${name}${body.product ? ` (${body.product})` : ''}`,
        text: lines,
      }),
    });
    if (!res.ok) {
      console.error('[enquiry] Resend failed:', res.status, await res.text());
      return NextResponse.json({ ok: false, error: 'Email failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('[enquiry] Resend error:', err);
    return NextResponse.json({ ok: false, error: 'Email error' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
