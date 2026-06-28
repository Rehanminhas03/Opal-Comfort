'use client';

import { useState } from 'react';
import { Loader2, Check, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/enquiry';

/**
 * Opal Comfort — unified enquiry / quote form.
 * Reused on /contact, and embedded in the homepage contact section. Posts to
 * /api/enquiry AND always offers a pre-filled WhatsApp fallback. Styled with the
 * project's @theme tokens (sage / gold / ivory / cream-border).
 */

const PRODUCTS = ['Beds', 'Sofas', 'Mattresses', 'Bespoke design', 'Not sure yet'];
const BUDGETS = [
  'Under £1,000',
  '£1,000 – £2,500',
  '£2,500 – £5,000',
  'Over £5,000',
  'Not sure',
];
const HEARD = ['Google', 'Instagram', 'Facebook', 'Friend / family', 'Other'];

type Props = {
  heading?: string;
  intro?: string;
  /** Pre-fill the "product" field, e.g. from a bed/sofa configurator. */
  defaultProduct?: string;
  /** Pre-fill the message, e.g. a configured spec from "Get a Quote". */
  defaultMessage?: string;
};

const field =
  'w-full rounded-md border border-cream-border bg-white px-4 py-3 font-body text-charcoal placeholder-slate/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30';
const labelCls = 'mb-1.5 block font-body text-sm font-medium text-sage';

export default function EnquiryForm({
  heading = 'Get a Quote',
  intro = "Tell us what you have in mind and we'll be in touch the same day.",
  defaultProduct = '',
  defaultMessage = '',
}: Props) {
  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    product: defaultProduct,
    budget: '',
    message: defaultMessage,
    heard: '',
    company: '', // honeypot — must stay empty
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [touched, setTouched] = useState(false);

  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF({ ...f, [k]: e.target.value });

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
  const phoneOk = f.phone.replace(/\D/g, '').length >= 7;
  const valid = Boolean(f.name.trim()) && emailOk && phoneOk;

  const whatsappHref = buildWhatsAppUrl({
    Name: f.name,
    'Interested in': f.product,
    Postcode: f.postcode,
    Budget: f.budget,
    Details: f.message,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-cream-border bg-ivory p-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage">
          <Check className="h-6 w-6 text-ivory" />
        </div>
        <h3 className="font-display text-2xl text-sage">Thank you</h3>
        <p className="mt-2 font-body text-slate">
          We&apos;ve received your enquiry and will reply the same day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border border-cream-border bg-ivory p-6 sm:p-8"
    >
      <h3 className="font-display text-3xl text-sage">{heading}</h3>
      <p className="mb-6 mt-1.5 font-body text-slate">{intro}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            Your name *
          </label>
          <input id="name" className={field} value={f.name} onChange={set('name')} placeholder="Jane Smith" />
          {touched && !f.name.trim() && (
            <p className="mt-1 text-xs text-red-600">Please enter your name.</p>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className={field}
            value={f.email}
            onChange={set('email')}
            placeholder="jane@email.com"
          />
          {touched && !emailOk && (
            <p className="mt-1 text-xs text-red-600">Enter a valid email.</p>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">
            Phone *
          </label>
          <input id="phone" type="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="07…" />
          {touched && !phoneOk && (
            <p className="mt-1 text-xs text-red-600">Enter a valid phone number.</p>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor="postcode">
            Postcode <span className="text-slate/60">(delivery area)</span>
          </label>
          <input id="postcode" className={field} value={f.postcode} onChange={set('postcode')} placeholder="WF1 …" />
        </div>
        <div>
          <label className={labelCls} htmlFor="product">
            Interested in
          </label>
          <select id="product" className={field} value={f.product} onChange={set('product')}>
            <option value="">Select…</option>
            {f.product && !PRODUCTS.includes(f.product) && (
              <option value={f.product}>{f.product}</option>
            )}
            {PRODUCTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="budget">
            Budget
          </label>
          <select id="budget" className={field} value={f.budget} onChange={set('budget')}>
            <option value="">Select…</option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls} htmlFor="message">
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className={`${field} resize-none`}
          value={f.message}
          onChange={set('message')}
          placeholder="Style, size, fabric/colour ideas, timescales…"
        />
      </div>

      <div className="mt-4">
        <label className={labelCls} htmlFor="heard">
          How did you hear about us?
        </label>
        <select id="heard" className={field} value={f.heard} onChange={set('heard')}>
          <option value="">Select…</option>
          {HEARD.map((h) => (
            <option key={h}>{h}</option>
          ))}
        </select>
      </div>

      {/* Honeypot — hidden from users, catches bots. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          value={f.company}
          onChange={set('company')}
        />
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600">
          Something went wrong sending your enquiry. Please try WhatsApp below.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-press btn-sheen inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-body font-semibold uppercase tracking-widest text-sage transition hover:bg-gold-light disabled:opacity-60"
        >
          {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-sage px-6 py-3.5 font-body font-semibold uppercase tracking-widest text-sage transition hover:bg-sage hover:text-ivory"
        >
          <MessageCircle className="h-4 w-4" /> Send on WhatsApp instead
        </a>
      </div>
      <p className="mt-3 font-body text-xs text-slate/70">
        We reply the same day. No spam, ever.
      </p>
    </form>
  );
}
