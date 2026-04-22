import AnimateIn from './AnimateIn';

const reviews = [
  {
    quote:
      'Absolutely beautiful bed — the quality is outstanding. The delivery team were professional, set everything up perfectly and even hoovered up after themselves.',
    name: 'Sarah M.',
    location: 'Kensington, London',
    stars: 5,
    bed: 'Ottoman King',
  },
  {
    quote:
      'We ordered a bespoke super king in midnight blue velvet with gold legs. It took 5 weeks and it is absolutely perfect. Worth every single penny.',
    name: 'James & Claire T.',
    location: 'Edinburgh',
    stars: 5,
    bed: 'Bespoke Super King',
  },
  {
    quote:
      'This is my third order from Opal Comfort. The craftsmanship is genuinely unmatched and the customer service is second to none. I recommend them to everyone.',
    name: 'Priya K.',
    location: 'Manchester',
    stars: 5,
    bed: 'Divan Double',
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gold tracking-[0.3em] uppercase text-xs font-body">
              Customer Stories
            </p>
            <h2 className="font-display font-light text-navy text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.1]">
              What Our Customers Say
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-8" />
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {reviews.map((r, i) => (
            <AnimateIn key={r.name} delay={i * 0.1}>
              <div className="bg-white p-8 lg:p-10 border-l-2 border-gold relative h-full flex flex-col">
                <span className="font-display text-8xl text-gold/20 leading-none absolute top-2 left-6 select-none pointer-events-none">
                  &ldquo;
                </span>
                <div className="text-gold tracking-widest text-base mt-2">
                  {'★'.repeat(r.stars)}
                </div>
                <p className="font-display text-lg italic text-charcoal leading-relaxed mt-6 flex-1">
                  {r.quote}
                </p>
                <div className="mt-6 pt-6 border-t border-cream-warm">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gold">
                    {r.bed}
                  </p>
                  <p className="font-body font-medium text-navy mt-2">
                    {r.name}
                  </p>
                  <p className="font-body text-sm text-muted">{r.location}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
