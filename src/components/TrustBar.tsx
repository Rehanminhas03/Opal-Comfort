import { Hammer, Clock, Truck, Trash2 } from 'lucide-react';
import AnimateIn from './AnimateIn';

const STATS = [
  {
    icon: Hammer,
    stat: 'Handmade in the UK',
    label: 'Built by hand in West Yorkshire',
  },
  {
    icon: Clock,
    stat: '~2-Week Lead Time',
    label: 'On most bespoke orders',
  },
  {
    icon: Truck,
    stat: 'Nationwide Delivery',
    label: 'Delivered & installed UK-wide',
  },
  {
    icon: Trash2,
    stat: 'Free Old-Bed Removal',
    label: 'We take the old one away',
  },
];

export default function TrustBar() {
  return (
    <section id="trust" className="bg-sage py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 md:grid-cols-4 lg:px-10">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <AnimateIn
              key={s.label}
              delay={i * 0.1}
              className={`flex flex-col items-center px-4 text-center md:px-8 ${
                i > 0 ? 'md:border-l md:border-gold/30' : ''
              }`}
            >
              <Icon className="h-6 w-6 text-gold" strokeWidth={1.6} />
              <span className="mt-3 font-display text-2xl text-ivory">{s.stat}</span>
              <span className="mt-1 font-body text-xs uppercase tracking-wider text-ivory/60">
                {s.label}
              </span>
            </AnimateIn>
          );
        })}
      </div>
    </section>
  );
}
