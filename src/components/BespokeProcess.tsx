import Link from 'next/link';
import { Phone, Package, Palette, Hammer, Truck } from 'lucide-react';
import AnimateIn from './AnimateIn';

const STEPS = [
  {
    num: '01',
    icon: Phone,
    title: 'Get in Touch',
    desc: "Call us or fill in our online form. We'll respond the same day.",
  },
  {
    num: '02',
    icon: Package,
    title: 'We Send Samples',
    desc: 'We post fabric samples directly to your door so you can feel the quality.',
  },
  {
    num: '03',
    icon: Palette,
    title: 'Design Together',
    desc: 'We discuss your vision, size, fabric, colour, and headboard style.',
  },
  {
    num: '04',
    icon: Hammer,
    title: 'We Build It',
    desc: 'Our craftspeople handmake your piece in West Yorkshire. Usually ready in 2 weeks.',
  },
  {
    num: '05',
    icon: Truck,
    title: 'Delivery & Install',
    desc: 'We deliver UK-wide, bring it to your room, fully assemble it, and remove your old furniture.',
  },
];

export default function BespokeProcess() {
  return (
    <section id="process" className="bg-warm-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
            How It Works
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
            Your Piece, Built in 5 Steps
          </h2>
          <p className="mt-5 font-body text-slate">
            From first conversation to installation — most bespoke orders are
            completed and delivered within 2 weeks.
          </p>
        </AnimateIn>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-5 md:gap-x-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimateIn key={step.num} delay={i * 0.1} className="relative">
                {/* Gold dashed connector (desktop only, not after the last item) */}
                {i < STEPS.length - 1 && (
                  <span className="absolute left-[60%] right-0 top-10 hidden border-t-2 border-dashed border-gold/30 md:block" />
                )}

                <div className="relative px-2">
                  {/* Large decorative number behind the icon */}
                  <span className="pointer-events-none absolute -top-6 left-0 select-none font-display text-7xl font-bold text-sage/10">
                    {step.num}
                  </span>

                  <div className="relative">
                    <Icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                    <h3 className="mt-3 font-display text-xl text-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-slate">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        {/* CTA */}
        <AnimateIn className="mt-16 text-center" delay={0.1}>
          <Link
            href="/bespoke"
            className="inline-block rounded-md bg-sage px-10 py-4 font-body text-sm uppercase tracking-widest text-ivory transition-colors hover:bg-sage-light"
          >
            Start Your Bespoke Order
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
