import AnimateIn from './AnimateIn';

const facts = [
  { big: 'Est. 2023', small: 'Founded' },
  { big: 'UK Made', small: 'Every Bed' },
  { big: 'Family Owned', small: 'Direct Service' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white">
      {/* Why Opal Comfort? — verbatim from screenshot 1 */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-24 lg:pt-32">
        <AnimateIn>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-gold tracking-[0.3em] uppercase text-xs font-body">
              Why Choose Us
            </p>
            <h2 className="font-display font-light text-navy text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.1]">
              Why Opal Comfort?
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-8" />
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mt-12 max-w-3xl mx-auto space-y-6 font-body text-lg text-charcoal leading-relaxed">
            <p>
              At Opal Comfort, we believe great sleep starts with thoughtful
              design.
            </p>
            <p>
              We specialise in high-quality beds, mattresses, and storage
              solutions made for modern living — combining comfort,
              practicality, and style at accessible prices.
            </p>
            <p>
              Unlike big retailers, we handle everything ourselves — from
              sourcing to delivery — so every customer gets personal service
              and reliable support.
            </p>
            <p>
              Whether you need extra storage, better sleep, or a full bedroom
              upgrade, Opal Comfort is crafted for rest and designed for
              comfort.
            </p>
          </div>
        </AnimateIn>
      </div>

      {/* Our Story — two-column with image */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image - second on mobile, first on desktop */}
        <AnimateIn className="order-2 lg:order-1">
          <div className="aspect-[3/4] w-full overflow-hidden shadow-[0_20px_60px_rgba(18,35,58,0.15)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80"
              alt="Opal Comfort workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </AnimateIn>

        {/* Text */}
        <AnimateIn delay={0.1} className="order-1 lg:order-2 lg:pl-8">
          <p className="text-gold tracking-[0.3em] uppercase text-xs font-body">
            Our Story
          </p>
          <h2 className="font-display font-light text-navy text-4xl sm:text-5xl mt-4 leading-[1.1]">
            A Brand Built Around Better Rest
          </h2>
          <div className="w-12 h-px bg-gold mt-6" />

          <div className="mt-8 space-y-5 font-body text-base text-charcoal/80 leading-relaxed">
            <p>
              Opal Comfort was created with a simple idea:{' '}
              <strong className="text-navy">
                everyone deserves better rest — without overpaying.
              </strong>
            </p>
            <p>
              After seeing how many people struggle to find beds that combine
              comfort, storage, and modern design at fair prices, Opal Comfort
              was founded to change that.
            </p>
            <p>
              The name <em>Opal</em> comes from the gemstone known for its
              strength, beauty, and uniqueness — symbolising quality, care, and
              individuality. Those values sit at the heart of everything we do.
            </p>
            <p>
              We started by focusing on practical bedroom solutions, especially
              ottoman storage beds and supportive mattresses, designed for real
              UK homes where space matters just as much as comfort.
            </p>
          </div>

          {/* Mini facts */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gold/30">
            {facts.map((f) => (
              <div key={f.big}>
                <div className="font-display text-xl text-gold leading-tight">
                  {f.big}
                </div>
                <div className="font-body text-[11px] tracking-[0.2em] uppercase text-muted mt-1">
                  {f.small}
                </div>
              </div>
            ))}
          </div>

          {/* Pull-quote tagline */}
          <p className="font-display italic text-2xl text-navy mt-10 leading-snug">
            Crafted for Rest. Designed for Comfort.
          </p>

          <a
            href="#contact"
            className="inline-block mt-8 text-gold text-xs tracking-[0.25em] uppercase gold-underline"
          >
            Meet the team →
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
