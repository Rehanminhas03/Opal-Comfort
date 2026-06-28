'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { SofaModel } from '@/lib/catalogue';
import { openWhatsApp, buildQuoteHref } from '@/lib/enquiry';
import FabricPicker, { SelectedFabric } from './catalogue/FabricPicker';

// Only the public fields — internal `brandRef`/`confirm` must never reach the
// client bundle / RSC payload, so they are deliberately excluded here.
type SofaConfiguratorProps = {
  sofa: Pick<SofaModel, 'name' | 'sizesCm'>;
};

export default function SofaConfigurator({ sofa }: SofaConfiguratorProps) {
  const [sizeName, setSizeName] = useState(sofa.sizesCm?.[0]?.name ?? '');
  const [fabric, setFabric] = useState<SelectedFabric | null>(null);

  // Bespoke Sofa has no fixed sizes — route the customer to the design enquiry.
  if (!sofa.sizesCm || sofa.sizesCm.length === 0) {
    return (
      <div className="rounded-md border border-cream-border bg-warm-white p-8 text-center">
        <p className="font-body text-slate">
          This is a fully made-to-order piece — share your design, fabric and
          dimensions and we&apos;ll build it for you.
        </p>
        <Link
          href="/bespoke"
          className="mt-6 inline-block rounded-md bg-gold px-8 py-4 font-body font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold-light"
        >
          Start a Bespoke Enquiry →
        </Link>
      </div>
    );
  }

  const size = sofa.sizesCm.find((s) => s.name === sizeName) ?? sofa.sizesCm[0];
  const sizeText = `${size.name} (${size.widthCm}cm × ${size.lengthCm}cm${
    size.headboardCm ? `, ${size.headboardCm}cm headboard` : ''
  })`;
  const fabricText = fabric ? `${fabric.collectionLabel} — ${fabric.name}` : 'To be decided';

  const enquiryLines = {
    Sofa: sofa.name,
    Size: sizeText,
    Fabric: fabricText,
  };
  const quoteMessage = `I'd like a quote for the ${sofa.name} sofa — ${sizeText}, fabric: ${fabricText}.`;

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 font-display text-xl text-charcoal">1 · Choose your size</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {sofa.sizesCm.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setSizeName(s.name)}
              aria-pressed={sizeName === s.name}
              className={`rounded-md border px-4 py-2.5 text-left font-body text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                sizeName === s.name
                  ? 'border-sage bg-sage text-ivory'
                  : 'border-cream-border bg-ivory text-charcoal hover:border-sage'
              }`}
            >
              <span className="font-medium">{s.name}</span>
              <span className="ml-2 text-xs opacity-70">
                {s.widthCm} × {s.lengthCm}cm
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-display text-xl text-charcoal">2 · Choose your fabric</h3>
        <p className="mb-5 font-body text-sm text-slate">
          {fabric ? (
            <>
              Selected:{' '}
              <span className="font-medium text-charcoal">
                {fabric.collectionLabel} — {fabric.name}
              </span>
            </>
          ) : (
            'Pick a colour, or decide later when we post you samples.'
          )}
        </p>
        <FabricPicker mode="single" value={fabric} onChange={setFabric} />
      </div>

      <div className="sticky bottom-4 flex flex-col gap-3 rounded-md border border-cream-border bg-ivory/95 p-4 shadow-lg backdrop-blur sm:flex-row">
        <button
          type="button"
          onClick={() => openWhatsApp(enquiryLines)}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-green-500 py-4 font-body font-semibold uppercase tracking-widest text-white transition-colors hover:bg-green-600"
        >
          <MessageCircle className="h-5 w-5" />
          Enquire about this sofa
        </button>
        <Link
          href={buildQuoteHref({ product: `${sofa.name} sofa`, message: quoteMessage })}
          className="flex flex-1 items-center justify-center rounded-md border border-gold py-4 font-body font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold hover:text-sage"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
