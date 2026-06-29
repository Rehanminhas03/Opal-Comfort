import type { Metadata } from 'next';
import { Phone, Palette, Hammer } from 'lucide-react';
import PageHero from '@/components/PageHero';
import AnimateIn from '@/components/AnimateIn';
import BespokeForm from '@/components/BespokeForm';
import { BUSINESS } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: 'Bespoke & Custom | Opal Comfort',
  description:
    'Tell us your idea for a bed or sofa. We send fabrics and design examples, you share your vision, and we build it by hand in around 2+ weeks.',
};

const STEPS = [
  {
    icon: Phone,
    title: 'Tell us your idea',
    desc: 'Call, WhatsApp or fill in the form below with what you have in mind.',
  },
  {
    icon: Palette,
    title: 'We send fabrics & examples',
    desc: 'We post fabric samples and share design examples so you can picture it.',
  },
  {
    icon: Hammer,
    title: 'We build it for you',
    desc: `You share your final vision and we hand-build your piece in around ${BUSINESS.bespokeLeadTime}.`,
  },
];

export default function BespokePage() {
  return (
    <>
      <PageHero
        eyebrow="Beds & Sofas"
        title="Bespoke & Custom"
        subtitle="If you can picture it, we can build it. Share your idea and we'll make it real — your size, your fabric, your colour."
      />

      {/* How it works */}
      <section className="bg-warm-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <AnimateIn key={step.title} delay={i * 0.1}>
                <div>
                  <step.icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-xl text-charcoal">{step.title}</h3>
                  <p className="mt-2 font-body text-sm text-slate">{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="font-display text-3xl text-charcoal">Tell us your idea</h2>
          <p className="mt-3 font-body text-slate">
            The more detail the better — but don&apos;t worry if you&apos;re not
            sure yet, we&apos;ll guide you through it.
          </p>
          <div className="mt-10">
            <BespokeForm />
          </div>
        </div>
      </section>
    </>
  );
}
