import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { BED_MODELS, FULFILMENT_LABELS } from '@/lib/catalogue';
import { getPlaceholderImage } from '@/lib/placeholderImages';
import Configurator from '@/components/Configurator';
import PlaceholderImage from '@/components/PlaceholderImage';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return BED_MODELS.map((bed) => ({ slug: bed.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bed = BED_MODELS.find((b) => b.slug === slug);
  if (!bed) return { title: 'Bed not found | Opal Comfort' };
  return {
    title: `${bed.name} Bed | Opal Comfort`,
    description: `Configure the ${bed.name} bed — your base, size, headboard and fabric. Bespoke, handmade in West Yorkshire.`,
  };
}

export default async function BedDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bed = BED_MODELS.find((b) => b.slug === slug);
  if (!bed) notFound();

  // Product structured data. No prices published for now — Product without an
  // offer/price. (Add an AggregateOffer here later if the client wants pricing.)
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${bed.name} Bespoke Bed`,
    description: bed.description,
    category: 'Beds',
    brand: { '@type': 'Brand', name: 'Opal Comfort' },
  };

  return (
    <>
      <JsonLd data={productLd} />
      {/* Hero */}
      <section className="bg-sage pt-28 pb-0 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href="/beds"
            className="inline-flex items-center gap-1 font-body text-sm text-ivory/70 transition-colors hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" /> All beds
          </Link>
          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="pb-12">
              <span className="inline-block rounded-sm bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sage">
                {FULFILMENT_LABELS[bed.fulfilment]}
              </span>
              <h1 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">
                {bed.name}
              </h1>
              {/* descriptionPlaceholder: generic copy until the client supplies real per-style text. */}
              <p className="mt-5 max-w-md font-body text-lg text-ivory/75">
                {bed.description}
              </p>
            </div>
            <div className="relative h-72 w-full overflow-hidden rounded-t-md lg:h-96">
              {/* Stock photo while real product photography is pending. */}
              <PlaceholderImage
                src={bed.imagePlaceholder ? getPlaceholderImage('bed', bed.slug) : bed.image}
                alt={bed.name}
                label={bed.name}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Configurator bed={bed} />
        </div>
      </section>
    </>
  );
}
