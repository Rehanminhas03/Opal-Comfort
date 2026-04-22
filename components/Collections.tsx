'use client';

import AnimateIn from './AnimateIn';

const collections = [
  {
    name: 'Ottoman Storage Beds',
    subtitle: 'Hidden Storage',
    price: 'From £549',
    desc: 'Hydraulic lift storage beneath a flawlessly upholstered exterior — perfect for real UK homes where every inch counts.',
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  },
  {
    name: 'Divan Beds',
    subtitle: 'The Essential',
    price: 'From £449',
    desc: 'Classic, supportive divan bases with optional drawer storage. Built to last, designed to disappear into any bedroom.',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  },
  {
    name: 'Upholstered Beds',
    subtitle: 'The Statement',
    price: 'From £695',
    desc: 'Timeless silhouettes wrapped in your choice of premium fabric — the foundation of a beautifully styled bedroom.',
    img: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=800&q=80',
  },
  {
    name: 'Mattresses',
    subtitle: 'Better Sleep',
    price: 'From £299',
    desc: 'Pocket-sprung, memory foam and hybrid mattresses — independently rated for support, comfort and breathability.',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  },
  {
    name: 'Headboards',
    subtitle: 'The Finishing Touch',
    price: 'From £195',
    desc: 'Transform any existing bed with a statement headboard — upholstered to order in over 100 fabrics.',
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  },
  {
    name: 'Bespoke Orders',
    subtitle: 'Made For You',
    price: 'From £895',
    desc: 'Your dimensions, your fabric, your vision. Every bespoke piece is a one-of-a-kind creation built in our workshop.',
    img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  },
];

export default function Collections() {
  return (
    <section id="collections" className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gold tracking-[0.3em] uppercase text-xs font-body">
              Our Collection
            </p>
            <h2 className="font-display font-light text-navy text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.1]">
              Beds Built to Last a Lifetime
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-8" />
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {collections.map((c, i) => (
            <AnimateIn key={c.name} delay={i * 0.08}>
              <a
                href="#contact"
                className="group block overflow-hidden bg-white shadow-[0_8px_30px_rgba(18,35,58,0.05)] hover:shadow-[0_20px_50px_rgba(18,35,58,0.12)] transition-shadow duration-500 h-full"
              >
                <div className="overflow-hidden h-64 sm:h-72 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 lg:p-7">
                  <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-body">
                    {c.subtitle}
                  </p>
                  <h3 className="font-display text-2xl text-navy mt-1 leading-tight">
                    {c.name}
                  </h3>
                  <p className="font-body text-sm text-muted mt-1">{c.price}</p>
                  <p className="font-body text-sm text-charcoal/70 mt-3 leading-relaxed">
                    {c.desc}
                  </p>
                  <span className="inline-block mt-5 text-gold text-xs tracking-[0.25em] uppercase opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Enquire Now →
                  </span>
                </div>
              </a>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
