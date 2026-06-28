'use client';

import { useState, FormEvent } from 'react';
import { Loader2, Check, Mail } from 'lucide-react';
import AnimateIn from './AnimateIn';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!emailOk) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="bg-sage py-20">
      <AnimateIn className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Mail className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} />
        <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
          Fabric guides, new designs &amp; previews
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-ivory/70">
          Join our list for carefully selected updates — new styles, fabric ideas
          and the occasional exclusive. No spam, unsubscribe any time.
        </p>

        {status === 'sent' ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-md border border-gold/40 bg-gold/10 px-6 py-4 text-ivory">
            <Check className="h-5 w-5 text-gold" />
            <span className="font-body">You&apos;re in — thank you!</span>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            {/* Honeypot */}
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px]"
            />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-md border border-ivory/20 bg-ivory/10 px-4 py-3 font-body text-ivory placeholder-ivory/50 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-press btn-sheen inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-body font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold-light disabled:opacity-60"
            >
              {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === 'sending' ? 'Joining…' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 font-body text-sm text-gold-light">
            Something went wrong — please try again.
          </p>
        )}
      </AnimateIn>
    </section>
  );
}
