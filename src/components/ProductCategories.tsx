'use client';

import Link from 'next/link';
import AnimateIn from './AnimateIn';
import PlaceholderImage from './PlaceholderImage';

type Product = {
  category: string;
  tagline: string;
  desc: string;
  price: string;
  badge?: string;
  href: string;
  img: string;
};

// Each card uses its own category-specific image (public/images/categories/).
// Swap these for the client's real photos when available.
const PRODUCTS: Product[] = [
  {
    category: 'Upholstered Beds',
    tagline: 'The Classic Choice',
    desc: 'Timeless upholstered frames wrapped in your chosen fabric. Available in all sizes from single to emperor.',
    price: 'Made to order',
    badge: 'Most Popular',
    href: '/beds',
    img: '/images/categories/upholstered-beds.jpg',
  },
  {
    category: 'Ottoman Beds',
    tagline: 'Style Meets Storage',
    desc: 'Hydraulic lift base reveals generous storage space beneath a beautifully upholstered exterior.',
    price: 'Made to order',
    href: '/beds',
    img: '/images/categories/ottoman-beds.jpg',
  },
  {
    category: 'Sleigh Beds',
    tagline: 'A Statement Piece',
    desc: 'Sweeping curved headboard and footboard. Instantly the centrepiece of any bedroom.',
    price: 'Made to order',
    href: '/beds',
    img: '/images/categories/sleigh-beds.jpg',
  },
  {
    category: 'Divan Beds',
    tagline: 'Built-In Convenience',
    desc: 'Solid divan base with optional drawer storage. Practical, durable, and beautifully finished.',
    price: 'Made to order',
    href: '/beds',
    img: '/images/categories/divan-beds.jpg',
  },
  {
    category: 'Mattresses',
    tagline: 'Rest Easy',
    desc: 'Sprung, pocket sprung, memory foam and luxury-top mattresses — mostly ready-made and available now.',
    price: 'Enquire for price',
    href: '/mattresses',
    img: '/images/categories/mattresses.jpg',
  },
  {
    category: 'Bespoke Sofas',
    tagline: 'Your Dream Sofa',
    desc: "We don't just make beds. Order a sofa built entirely to your spec — fabric, size, style, colour.",
    price: 'Made to order',
    badge: 'NEW',
    href: '/sofas',
    img: '/images/categories/sofas.jpg',
  },
];

export default function ProductCategories() {
  return (
    <section id="collection" className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
            Our Collection
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
            Handcrafted Pieces
            <br />
            for Every Home
          </h2>
          <p className="mt-5 font-body text-slate">
            All beds and sofas are made to order. Choose your style below and
            we&apos;ll build it exactly the way you want.
          </p>
        </AnimateIn>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <AnimateIn key={p.category} delay={i * 0.08}>
              <Link
                href={p.href}
                className="group block overflow-hidden rounded-md shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-72 w-full overflow-hidden">
                  <PlaceholderImage
                    src={p.img}
                    alt={p.category}
                    label={p.category}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute left-3 top-3 rounded-sm bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sage">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="border-t-2 border-gold bg-warm-white p-6">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-gold">
                    {p.tagline}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-charcoal">
                    {p.category}
                  </h3>
                  <p className="mt-1 font-body text-sm text-slate">{p.price}</p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-slate/80">
                    {p.desc}
                  </p>
                  <span className="mt-4 inline-block font-body text-sm font-medium text-sage opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Range →
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
