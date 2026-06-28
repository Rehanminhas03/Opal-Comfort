import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Check } from 'lucide-react';
import { SOFA_MODELS } from '@/lib/catalogue';
import { getPlaceholderImage } from '@/lib/placeholderImages';
import SofaConfigurator from '@/components/SofaConfigurator';
import PlaceholderImage from '@/components/PlaceholderImage';

export function generateStaticParams() {
  return SOFA_MODELS.map((sofa) => ({ slug: sofa.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sofa = SOFA_MODELS.find((s) => s.slug === slug);
  if (!sofa) return { title: 'Sofa not found | Opal Comfort' };
  return {
    title: `${sofa.name} Sofa | Opal Comfort`,
    description: `${sofa.name} — made to order in your choice of fabric and colour. Handmade in West Yorkshire.`,
  };
}

export default async function SofaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sofa = SOFA_MODELS.find((s) => s.slug === slug);
  if (!sofa) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-sage pt-28 pb-0 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href="/sofas"
            className="inline-flex items-center gap-1 font-body text-sm text-ivory/70 transition-colors hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" /> All sofas
          </Link>
          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="pb-12">
              <span className="inline-block rounded-sm bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sage">
                Made to order
              </span>
              <h1 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">{sofa.name}</h1>
              <p className="mt-5 max-w-md font-body text-lg text-ivory/75">{sofa.description}</p>
              {sofa.features && sofa.features.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {sofa.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-body text-ivory/85">
                      <Check className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative h-72 w-full overflow-hidden rounded-t-md lg:h-96">
              {/* Stock photo while real product photography is pending. */}
              <PlaceholderImage
                src={sofa.imagePlaceholder ? getPlaceholderImage('sofa', sofa.slug) : sofa.image}
                alt={sofa.name}
                label={sofa.name}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Configurator / enquiry */}
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {/* Pass only public fields — never leak brandRef/confirm to the client. */}
          <SofaConfigurator sofa={{ name: sofa.name, sizesCm: sofa.sizesCm }} />
        </div>
      </section>
    </>
  );
}
