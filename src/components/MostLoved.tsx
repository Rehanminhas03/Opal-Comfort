import Link from 'next/link';
import { BED_MODELS, SIZE_CHARTS } from '@/lib/catalogue';
import { getPlaceholderImage } from '@/lib/placeholderImages';
import AnimateIn from './AnimateIn';
import PlaceholderImage from './PlaceholderImage';
import Tilt3D from './Tilt3D';

// A curated selection of styles for the "Most Loved" row.
const FEATURED_SLUGS = [
  'florida',
  'arizona',
  'chesterfield',
  'kensington',
  'miami',
  'sleigh',
  'paris',
  'seline',
];

const FEATURED = FEATURED_SLUGS.map((slug) =>
  BED_MODELS.find((b) => b.slug === slug),
).filter((b): b is NonNullable<typeof b> => Boolean(b));

export default function MostLoved() {
  return (
    <section className="bg-warm-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn className="flex items-end justify-between gap-4">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
              Customer Favourites
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.1] text-charcoal">
              Most Loved Styles
            </h2>
          </div>
          <Link
            href="/beds"
            className="hidden shrink-0 font-body text-sm font-medium text-sage underline-offset-4 hover:underline sm:inline"
          >
            View all beds →
          </Link>
        </AnimateIn>

        {/* Horizontal snap-scroll row */}
        <AnimateIn delay={0.05} className="mt-10">
          <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:-mx-10 lg:px-10">
            {FEATURED.map((bed) => (
              <Tilt3D key={bed.slug} max={6} className="w-64 shrink-0 snap-start">
                <Link
                  href={`/beds/${bed.slug}`}
                  className="group block overflow-hidden rounded-md bg-ivory shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                <div className="relative h-56 w-full overflow-hidden">
                  <PlaceholderImage
                    src={getPlaceholderImage('bed', bed.slug)}
                    alt={`${bed.name} bed`}
                    label={bed.name}
                    sizes="256px"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-sage">
                    Made to order
                  </span>
                </div>
                <div className="border-t-2 border-gold p-5">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-gold">
                    {SIZE_CHARTS[bed.sizeChartByBase.divan ?? 'standard'].label} frame
                  </p>
                  <h3 className="mt-1 font-display text-xl text-charcoal">{bed.name}</h3>
                  <span className="mt-3 inline-block font-body text-sm font-medium text-sage">
                    View &amp; Enquire →
                  </span>
                </div>
                </Link>
              </Tilt3D>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
