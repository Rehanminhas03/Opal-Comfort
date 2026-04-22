import { Truck, Shield, RotateCcw, LucideIcon } from 'lucide-react';
import AnimateIn from './AnimateIn';

const items: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Truck,
    title: 'Free White-Glove Delivery',
    desc: 'Two-person team. Delivered to your room, fully assembled. Packaging removed.',
  },
  {
    icon: Shield,
    title: '10-Year Frame Guarantee',
    desc: 'We build to last. Every Opal Comfort bed comes with our decade-long promise.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Easy Returns',
    desc: "Not quite right? We'll collect it and give you a full refund. No questions asked.",
  },
];

export default function DeliveryStrip() {
  return (
    <section className="bg-navy-dark py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimateIn key={item.title} delay={i * 0.1}>
                <div
                  className={`text-center px-6 ${
                    i > 0 ? 'md:border-l md:border-gold/20' : ''
                  }`}
                >
                  <Icon className="w-9 h-9 text-gold mx-auto" strokeWidth={1.4} />
                  <h3 className="font-display text-xl text-white mt-5">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 mt-3 leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
