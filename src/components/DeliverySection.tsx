import { Truck, Wrench, Trash2, Clock } from 'lucide-react';
import AnimateIn from './AnimateIn';

const ITEMS = [
  {
    icon: Truck,
    title: 'Free UK Delivery',
    // [CONFIRM WITH CLIENT] Is delivery genuinely free to all UK areas, including remote postcodes?
    desc: 'We deliver to every corner of the UK at no extra charge.',
  },
  {
    icon: Wrench,
    title: 'Full Installation',
    desc: "Our team assembles everything in your room. We leave only when you're happy.",
  },
  {
    icon: Trash2,
    title: 'Old Furniture Removed',
    desc: 'We can take away your old bed or sofa. Just let us know when you order.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    desc: 'Listed beds are ready in 1–2 weeks; fully bespoke pieces in 2+ weeks from sign-off.',
  },
];

export default function DeliverySection() {
  return (
    <section id="delivery" className="bg-sage py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-12 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <AnimateIn
              key={item.title}
              delay={i * 0.1}
              className={`flex flex-col items-center px-6 text-center ${
                i > 0 ? 'lg:border-l lg:border-gold/30' : ''
              }`}
            >
              <Icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-xl text-ivory">{item.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ivory/65">
                {item.desc}
              </p>
            </AnimateIn>
          );
        })}
      </div>
    </section>
  );
}
