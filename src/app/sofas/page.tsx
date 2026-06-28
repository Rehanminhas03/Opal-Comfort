import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import AnimateIn from '@/components/AnimateIn';
import CatalogueCard from '@/components/catalogue/CatalogueCard';
import { SOFA_MODELS } from '@/lib/catalogue';
import { getPlaceholderImage } from '@/lib/placeholderImages';

export const metadata: Metadata = {
  title: 'Bespoke Sofas | Opal Comfort',
  description:
    'Made-to-order sofas, upholstered in your choice of fabric and colour. Built by hand in West Yorkshire and delivered across the UK.',
};

export default function SofasPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Collection"
        title="Made-to-Order Sofas"
        subtitle="Upholstered in your choice of fabric and colour. Choose a style below, or tell us your own design."
      />
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOFA_MODELS.map((sofa, i) => (
              <AnimateIn key={sofa.slug} delay={(i % 3) * 0.08}>
                {/* brandRef is internal only — never rendered. */}
                <CatalogueCard
                  name={sofa.name}
                  href={`/sofas/${sofa.slug}`}
                  image={sofa.imagePlaceholder ? getPlaceholderImage('sofa', sofa.slug) : sofa.image}
                  eyebrow="Bespoke Sofa"
                  badge="Made to order"
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
