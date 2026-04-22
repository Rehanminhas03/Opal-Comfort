import AnimateIn from './AnimateIn';

const stats = [
  { big: '500+', small: 'Beds Delivered' },
  { big: '10 Year', small: 'Frame Guarantee' },
  { big: '100+', small: 'Luxury Fabrics' },
  { big: 'Free', small: 'UK-Wide Delivery' },
];

export default function TrustBar() {
  return (
    <section id="trust" className="bg-navy py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {stats.map((s, i) => (
              <div
                key={s.big + s.small}
                className={`text-center px-4 ${
                  i !== 0 ? 'md:border-l md:border-gold/30' : ''
                } ${i === 2 ? 'border-l border-gold/30 md:border-l' : ''} ${
                  i === 1 ? 'border-l border-gold/30 md:border-l' : ''
                }`}
              >
                <div className="font-display text-3xl sm:text-4xl text-gold font-light">
                  {s.big}
                </div>
                <div className="font-body text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white/70 mt-2">
                  {s.small}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
