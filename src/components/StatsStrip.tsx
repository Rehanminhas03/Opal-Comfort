import { BED_MODELS, FABRIC_COLLECTIONS } from '@/lib/catalogue';
import AnimateIn from './AnimateIn';
import CountUp from './CountUp';

const STYLE_COUNT = BED_MODELS.length;
const COLOUR_COUNT = FABRIC_COLLECTIONS.reduce((n, c) => n + c.colours.length, 0);

const STATS = [
  { end: STYLE_COUNT, suffix: '', label: 'Bed styles to choose from' },
  { end: COLOUR_COUNT, suffix: '+', label: 'Fabric colours' },
  { end: 2, suffix: ' wks', label: 'Typical lead time' },
  { end: 100, suffix: '%', label: 'Made to order' },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-cream-border bg-ivory py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 lg:grid-cols-4 lg:px-10">
        {STATS.map((s, i) => (
          <AnimateIn
            key={s.label}
            delay={i * 0.1}
            className={`px-4 text-center ${i > 0 ? 'lg:border-l lg:border-cream-border' : ''}`}
          >
            <CountUp
              end={s.end}
              suffix={s.suffix}
              className="font-display text-5xl text-gold sm:text-6xl"
            />
            <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-slate">
              {s.label}
            </p>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
