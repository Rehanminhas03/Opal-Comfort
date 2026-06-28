import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import BedsBrowser from '@/components/catalogue/BedsBrowser';

export const metadata: Metadata = {
  title: 'Bespoke Beds | Opal Comfort',
  description:
    'Browse our handcrafted bed styles — divan, ottoman, slatted ottoman and gaslift bases. Choose your size, headboard and fabric. Made to order in West Yorkshire, delivered across the UK.',
};

export default function BedsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Collection"
        title="Handcrafted Beds, Made to Order"
        subtitle="Every style is built to your size, base, headboard and fabric. No prices online — tell us what you'd like and we'll give you a personal quote."
      />
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            <BedsBrowser />
          </Suspense>
        </div>
      </section>
    </>
  );
}
