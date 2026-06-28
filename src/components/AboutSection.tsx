import Image from 'next/image';
import { Clock, MapPin, Shield } from 'lucide-react';
import AnimateIn from './AnimateIn';

// [PLACEHOLDER] Replace with a real photo of the client's workshop/team.
const ABOUT_IMG =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80';

const FACTS = [
  { icon: Clock, label: '2-Week Turnaround' },
  { icon: MapPin, label: 'West Yorkshire Made' },
  { icon: Shield, label: 'Installed & Guaranteed' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-ivory py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-12 px-6 lg:grid-cols-2 lg:gap-0 lg:px-10">
        {/* Image */}
        <AnimateIn direction="right" className="order-1 lg:order-none">
          <div className="relative h-full min-h-[360px] w-full overflow-hidden shadow-xl">
            <Image
              src={ABOUT_IMG}
              alt="Handcrafted bedroom furniture by Opal Comfort"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </AnimateIn>

        {/* Text */}
        <AnimateIn direction="left" className="flex flex-col justify-center lg:pl-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
            Our Story
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
            Made by Hand.
            <br />
            Built with Pride.
          </h2>

          <p className="mt-6 font-body leading-relaxed text-slate">
            Opal Comfort was born out of a simple belief — that your bed and sofa
            should be exactly what you want, not what&apos;s left on a shop floor.
            Based in Wakefield, West Yorkshire, we&apos;ve spent the last 3 years
            handcrafting furniture for homes across the UK.
          </p>
          <p className="mt-4 font-body leading-relaxed text-slate">
            We handle everything ourselves: design, fabric selection, making,
            delivery, and installation. Every piece that leaves our workshop is
            built to your exact specification. We don&apos;t cut corners, and we
            don&apos;t do &apos;close enough&apos;.
          </p>

          {/* Fact pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {FACTS.map((f) => {
              const Icon = f.icon;
              return (
                <span
                  key={f.label}
                  className="flex items-center gap-2 rounded-md border border-cream-border bg-warm-white px-4 py-2 font-body text-sm text-charcoal"
                >
                  <Icon className="h-4 w-4 text-gold" strokeWidth={1.7} />
                  {f.label}
                </span>
              );
            })}
          </div>

          <a
            href="#process"
            className="mt-8 inline-block font-body font-medium text-sage transition-colors hover:text-sage-light"
          >
            Learn About Our Process →
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
