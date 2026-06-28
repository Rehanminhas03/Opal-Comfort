'use client';

import { useState, FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/enquiry';
import FabricPicker, { SelectedFabric } from './catalogue/FabricPicker';

const MAX_PICKS = 5;

export default function FabricSampleForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [message, setMessage] = useState('');
  const [picks, setPicks] = useState<SelectedFabric[]>([]);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !postcode.trim()) {
      setError('Please add your name and full postal address so we can post your samples.');
      return;
    }
    if (picks.length === 0) {
      setError('Please choose at least one fabric to sample.');
      return;
    }
    setError('');
    openWhatsApp({
      Enquiry: 'Fabric sample request',
      Name: name,
      Address: address,
      Postcode: postcode,
      'Samples requested': picks
        .map((p) => `${p.collectionLabel} — ${p.name}`)
        .join('; '),
      Message: message,
    });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-md border border-sage bg-sage/10 p-8 text-center">
        <div className="text-4xl text-gold">✦</div>
        <p className="mt-3 font-display text-2xl text-sage">Thank you, {name.split(' ')[0]}!</p>
        <p className="mt-3 font-body text-slate">
          Tap send in WhatsApp to confirm your sample request and we&apos;ll post
          your chosen fabrics out to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Your name *">
          <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Postcode *">
          <input className="form-input" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
        </Field>
      </div>
      <Field label="Postal address *">
        <textarea
          rows={3}
          className="form-input resize-none"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Field>

      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-xl text-charcoal">Choose your fabrics</h3>
          <span className="font-body text-sm text-slate">
            {picks.length}/{MAX_PICKS} selected
          </span>
        </div>
        <p className="mt-1 mb-5 font-body text-sm text-slate">
          Pick up to {MAX_PICKS} colours and we&apos;ll post the swatches to your door.
        </p>
        <FabricPicker mode="multi" max={MAX_PICKS} value={picks} onChange={setPicks} />
      </div>

      <Field label="Anything else? (optional)">
        <textarea
          rows={3}
          className="form-input resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Field>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-gold py-4 font-body font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold-light"
      >
        <MessageCircle className="h-5 w-5" />
        Send My Sample Request
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-body text-xs uppercase tracking-widest text-slate">
        {label}
      </span>
      {children}
    </label>
  );
}
