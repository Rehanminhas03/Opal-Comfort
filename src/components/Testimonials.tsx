import AnimateIn from './AnimateIn';

/* DUMMY REVIEWS — replace with real customer reviews before launch.
   Names, locations and products below are illustrative only. */
const REVIEWS = [
  {
    quote:
      'I ordered a bespoke king bed and sofa in the same sage velvet fabric. The whole process took less than 3 weeks from first call to being installed in my bedroom. Absolutely beautiful — better than anything I&apos;ve seen in a shop.',
    name: 'Rachel T.',
    location: 'Leeds, West Yorkshire',
    stars: 5,
    product: 'Bespoke King Bed & Sofa',
  },
  {
    quote:
      'We were nervous ordering a custom bed online but the team sent fabric samples, talked us through everything, and the result is stunning. The delivery lads even took away our old bed. Can&apos;t fault them.',
    name: 'Mark & Julie H.',
    location: 'Sheffield',
    stars: 5,
    product: 'Upholstered Super King',
  },
  {
    quote:
      'My daughter&apos;s bed is incredible — she chose the pink velvet fabric herself. It was made quickly, fits perfectly, and the quality is so much better than anything in the high street. Will definitely order again.',
    name: 'Sonia B.',
    location: 'Manchester',
    stars: 5,
    product: "Children&apos;s Upholstered Bed",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-warm-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
            Testimonials
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
            What Our Customers Say
          </h2>
          {/* [PLACEHOLDER RATING] Swap for a real Trustpilot/Google rating + add
              AggregateRating JSON-LD once genuine reviews exist. */}
          <div className="mt-5 flex flex-col items-center gap-1">
            <div className="text-2xl text-gold" aria-label="Rated 5 out of 5">
              ★★★★★
            </div>
            <p className="font-body text-sm text-slate">
              <span className="font-semibold text-charcoal">Rated Excellent</span> by
              happy customers across the UK
            </p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <AnimateIn key={r.name} delay={i * 0.1}>
              <figure className="relative h-full overflow-hidden rounded-r-md border-l-4 border-gold bg-ivory p-8">
                {/* Decorative quote mark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 left-4 select-none font-display text-8xl leading-none text-gold/15"
                >
                  &ldquo;
                </span>

                <blockquote
                  className="relative font-display text-lg italic leading-relaxed text-charcoal"
                  dangerouslySetInnerHTML={{ __html: r.quote }}
                />

                <div
                  className="mt-4 text-gold"
                  aria-label={`${r.stars} out of 5 stars`}
                >
                  {'★★★★★'.slice(0, r.stars)}
                </div>

                <figcaption className="mt-1">
                  <p
                    className="text-xs uppercase tracking-widest text-gold"
                    dangerouslySetInnerHTML={{ __html: r.product }}
                  />
                  <p className="mt-3 font-body font-semibold text-charcoal">
                    {r.name}
                  </p>
                  <p className="font-body text-sm text-slate">{r.location}</p>
                </figcaption>
              </figure>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
