import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import AnimateIn from '@/components/AnimateIn';
import { MATTRESSES, ACCESSORIES, FULFILMENT_LABELS } from '@/lib/catalogue';
import { buildWhatsAppUrl } from '@/lib/enquiry';
import { getPlaceholderImage } from '@/lib/placeholderImages';
import PlaceholderImage from '@/components/PlaceholderImage';

export const metadata: Metadata = {
  title: 'Mattresses & Sleep Accessories | Opal Comfort',
  description:
    'Sprung, pocket sprung, memory foam and luxury-top mattresses, plus sleep accessories. Enquire for pricing and availability.',
};

// [PRICING] The client has NOT confirmed a public price list, so prices are
// hidden by default. Flip to true only once a confirmed list exists; every
// MATTRESSES item is also flagged `confirm: true` in lib/catalogue.ts.
const SHOW_PRICES = false;

export default function MattressesPage() {
  return (
    <>
      <PageHero
        eyebrow="Sleep Well"
        title="Mattresses & Accessories"
        subtitle="Mostly ready-made and available now. Tell us your size and we'll confirm price and availability — no checkout, just a quick chat."
      />
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MATTRESSES.map((m, i) => (
              <AnimateIn key={m.slug} delay={(i % 3) * 0.08}>
                <ProductTile
                  name={m.name}
                  eyebrow={m.type}
                  badge={FULFILMENT_LABELS[m.fulfilment]}
                  image={m.imagePlaceholder ? getPlaceholderImage('mattress', m.slug) : m.image}
                  priceLabel={
                    SHOW_PRICES && m.examplePriceGBP
                      ? `From £${m.examplePriceGBP}`
                      : 'Enquire for price'
                  }
                  enquiry={`Mattress enquiry: ${m.name} (${m.type})`}
                />
              </AnimateIn>
            ))}
          </div>

          {ACCESSORIES.length > 0 && (
            <>
              <h2 className="mt-20 font-display text-3xl text-charcoal">Accessories</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ACCESSORIES.map((a, i) => (
                  <AnimateIn key={a.slug} delay={(i % 3) * 0.08}>
                    <ProductTile
                      name={a.name}
                      image={a.imagePlaceholder ? '/images/categories/accessories.jpg' : a.image}
                      priceLabel="Enquire for price"
                      enquiry={`Accessory enquiry: ${a.name}`}
                    />
                  </AnimateIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function ProductTile({
  name,
  eyebrow,
  badge,
  image,
  priceLabel,
  enquiry,
}: {
  name: string;
  eyebrow?: string;
  badge?: string;
  image: string;
  priceLabel: string;
  enquiry: string;
}) {
  return (
    <div className="overflow-hidden rounded-md shadow-sm">
      <div className="relative h-56 w-full overflow-hidden">
        {/* Stock photo while real product photography is pending. */}
        <PlaceholderImage src={image} alt={name} label={name} className="h-full w-full" />
        {badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sage">
            {badge}
          </span>
        )}
      </div>
      <div className="border-t-2 border-gold bg-warm-white p-6">
        {eyebrow && (
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        )}
        <h3 className="mt-1 font-display text-2xl text-charcoal">{name}</h3>
        <p className="mt-1 font-body text-sm text-slate">{priceLabel}</p>
        <a
          href={buildWhatsAppUrl({ Enquiry: enquiry })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-green-600 transition-colors hover:text-green-700"
        >
          <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
