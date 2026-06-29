'use client';

import { useState, FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/enquiry';
import FabricPicker, { SelectedFabric } from './catalogue/FabricPicker';

const PRODUCT_TYPES = ['Bed', 'Sofa', 'Bed & Sofa', 'Not sure yet'];

export default function BespokeForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [productType, setProductType] = useState(PRODUCT_TYPES[0]);
  const [size, setSize] = useState('');
  const [colourDirection, setColourDirection] = useState('');
  const [fabric, setFabric] = useState<SelectedFabric | null>(null);
  const [headboardIdeas, setHeadboardIdeas] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [hasPhotos, setHasPhotos] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError('Please add your name and a contact number or email.');
      return;
    }
    setError('');
    openWhatsApp({
      Enquiry: 'Bespoke design enquiry',
      Name: name,
      Contact: contact,
      'Product type': productType,
      Size: size,
      'Fabric / colour direction': fabric
        ? `${fabric.collectionLabel} — ${fabric.name}${colourDirection ? `; ${colourDirection}` : ''}`
        : colourDirection,
      'Headboard ideas': headboardIdeas,
      Inspiration: inspiration,
      Photos: hasPhotos ? 'I have inspiration photos to share in this chat' : '',
    });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-md border border-sage bg-sage/10 p-8 text-center">
        <div className="text-4xl text-gold">✦</div>
        <p className="mt-3 font-display text-2xl text-sage">Thank you, {name.split(' ')[0]}!</p>
        <p className="mt-3 font-body text-slate">
          Tap send in WhatsApp to share your idea. We&apos;ll reply the same day,
          send fabrics and design examples, then build your piece in around{' '}
          2+ weeks.
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
        <Field label="Phone or email *">
          <input className="form-input" value={contact} onChange={(e) => setContact(e.target.value)} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="What are you after?">
          <select
            className="form-input"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Size (if known)">
          <input
            className="form-input"
            placeholder='e.g. 5ft Kingsize, or "3-seater"'
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Colour / fabric direction (free text)">
        <input
          className="form-input"
          placeholder="e.g. deep green velvet, warm neutral, something bold…"
          value={colourDirection}
          onChange={(e) => setColourDirection(e.target.value)}
        />
      </Field>

      <Field label="Headboard ideas (optional)">
        <input
          className="form-input"
          placeholder="e.g. tall buttoned, panelled, curved…"
          value={headboardIdeas}
          onChange={(e) => setHeadboardIdeas(e.target.value)}
        />
      </Field>

      <Field label="Inspiration / anything else (optional)">
        <textarea
          rows={4}
          className="form-input resize-none"
          value={inspiration}
          onChange={(e) => setInspiration(e.target.value)}
        />
      </Field>

      <div>
        <h3 className="font-display text-xl text-charcoal">Pick a starting colour (optional)</h3>
        <p className="mt-1 mb-5 font-body text-sm text-slate">
          {fabric ? (
            <>
              Selected:{' '}
              <span className="font-medium text-charcoal">
                {fabric.collectionLabel} — {fabric.name}
              </span>
            </>
          ) : (
            'Browse the collections, or just describe the look above.'
          )}
        </p>
        <FabricPicker mode="single" value={fabric} onChange={setFabric} />
      </div>

      {/* Image upload is intent-only — there is no upload backend. Customers send
          photos directly in the WhatsApp chat. */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={hasPhotos}
          onChange={(e) => setHasPhotos(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-sage"
        />
        <span className="font-body text-sm text-slate">
          I have inspiration photos — I&apos;ll send them in the WhatsApp chat.
        </span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-gold py-4 font-body font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold-light"
      >
        <MessageCircle className="h-5 w-5" />
        Send My Idea
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
