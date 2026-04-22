import AnimateIn from './AnimateIn';

const fabrics = [
  { name: 'Midnight Velvet', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80' },
  { name: 'Ivory Linen', img: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=300&q=80' },
  { name: 'Blush Boucle', img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&q=80' },
  { name: 'Slate Chenille', img: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=300&q=80' },
  { name: 'Caramel Leather', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80' },
  { name: 'Forest Tweed', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Navy Herringbone', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80' },
  { name: 'Cream Suede', img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300&q=80' },
];

const loop = [...fabrics, ...fabrics];

export default function FabricsStrip() {
  return (
    <section className="bg-navy py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gold tracking-[0.3em] uppercase text-xs font-body">
              Materials
            </p>
            <h2 className="font-display font-light text-white text-4xl sm:text-5xl mt-4 leading-[1.1]">
              100+ Fabrics. Infinite Possibilities.
            </h2>
            <p className="font-body text-white/60 mt-4 text-base">
              Request a free sample pack and feel the quality for yourself.
            </p>
          </div>
        </AnimateIn>
      </div>

      <AnimateIn delay={0.15}>
        <div className="mt-14 relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy to-transparent z-10" />

          <div className="flex w-max animate-scroll gap-8">
            {loop.map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden ring-1 ring-gold/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.img}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-white/70">
                  {f.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.25}>
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-block border border-gold text-gold font-body text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-gold hover:text-navy transition-colors"
          >
            Request Free Samples
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}
