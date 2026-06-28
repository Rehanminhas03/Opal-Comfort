import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import AnimateIn from '@/components/AnimateIn';
import { FABRIC_COLLECTIONS } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: 'Fabrics & Colours | Opal Comfort',
  description:
    'Explore our fabric collections — Marble, Coniston, Plush, Naples and Crush — in dozens of colours. Request free samples posted to your door.',
};

export default function FabricsPage() {
  return (
    <>
      <PageHero
        eyebrow="Your Fabric, Your Colour"
        title="Fabric Collections"
        subtitle="Every bed and sofa is upholstered in the fabric and colour you choose. Swatch colours shown are approximate — request free samples to see and feel the real thing."
      >
        <Link
          href="/fabric-sample"
          className="mt-8 inline-block rounded-md bg-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold-light"
        >
          Request Free Samples →
        </Link>
      </PageHero>

      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-10">
          {FABRIC_COLLECTIONS.map((collection, ci) => (
            <AnimateIn key={collection.id} delay={(ci % 3) * 0.06}>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-cream-border pb-3">
                  <h2 className="font-display text-3xl text-charcoal">{collection.label}</h2>
                  <p className="font-body text-sm text-slate">{collection.texture}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-6">
                  {collection.colours.map((colour) => (
                    <div key={colour.name} className="flex flex-col items-center text-center">
                      <span
                        className="h-16 w-16 rounded-full ring-1 ring-cream-border"
                        style={{ backgroundColor: colour.hex }}
                        role="img"
                        aria-label={`${colour.name} — ${collection.label} fabric`}
                      />
                      <span className="mt-2 font-body text-xs text-slate">{colour.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>
    </>
  );
}
