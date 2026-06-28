'use client';

import Link from 'next/link';
import AnimateIn from './AnimateIn';
import { FABRIC_COLLECTIONS } from '@/lib/catalogue';

// Real fabric colours from the catalogue (a spread across all collections),
// shown as reliable colour swatches — no external photos to rot.
const SWATCHES = FABRIC_COLLECTIONS.flatMap((c) =>
  c.colours.slice(0, 4).map((col) => ({
    name: col.name,
    hex: col.hex,
    collection: c.label,
  })),
);

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center" style={{ width: '9rem' }}>
      <div
        className="h-32 w-32 rounded-full ring-1 ring-white/10"
        style={{ backgroundColor: hex }}
        role="img"
        aria-label={`${name} fabric colour`}
      />
      <span className="mt-2 text-center text-xs text-ivory/70">{name}</span>
    </div>
  );
}

export default function FabricsSection() {
  // Duplicate the list so the marquee loops seamlessly (-50% translate).
  const loop = [...SWATCHES, ...SWATCHES];

  return (
    <section id="fabrics" className="overflow-hidden bg-charcoal py-20">
      <AnimateIn className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl text-ivory sm:text-4xl">
          Your Fabric. Your Colour. Your Choice.
        </h2>
        <p className="mt-4 font-body text-ivory/60">
          Choose from dozens of premium fabrics and finishes. Not sure? We&apos;ll
          post free samples to your door.
        </p>
      </AnimateIn>

      {/* Infinite auto-scrolling swatch row (pauses on hover) */}
      <div className="group relative mt-14 w-full">
        <div className="flex w-max gap-8 px-4 animate-scroll">
          {loop.map((s, i) => (
            <Swatch key={`${s.name}-${i}`} name={s.name} hex={s.hex} />
          ))}
        </div>
        {/* Soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-charcoal to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-charcoal to-transparent" />
      </div>

      {/* CTAs */}
      <AnimateIn
        className="mt-14 flex flex-wrap items-center justify-center gap-6 px-6"
        delay={0.1}
      >
        <Link
          href="/fabric-sample"
          className="rounded-md border border-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-sage"
        >
          Request Free Samples
        </Link>
        <Link
          href="/fabrics"
          className="font-body text-sm text-ivory/60 underline underline-offset-4 transition-colors hover:text-ivory"
        >
          View All Fabrics
        </Link>
      </AnimateIn>
    </section>
  );
}
