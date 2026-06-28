'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateIn from './AnimateIn';

const FAQS = [
  {
    q: 'How quickly can you make my order?',
    a: "Most bespoke beds and sofas are completed and delivered within 2 weeks of your design being finalised. We'll always confirm your exact lead time when you enquire.",
  },
  {
    q: 'Do I have to visit a showroom?',
    a: "No — we don't have a showroom. Everything is done remotely. We post fabric samples to your door, have a call to discuss your vision, and handle everything from there.",
  },
  {
    q: 'Can I really choose any fabric and colour?',
    a: 'Yes. We offer dozens of fabrics including velvet, linen, boucle, chenille, leather and more, in a huge range of colours. Request a free sample pack and feel them for yourself.',
  },
  {
    q: 'What sizes do you offer?',
    a: 'We make beds in all standard UK sizes (Single, Small Double, Double, King, Super King, Emperor) and can also make completely custom dimensions if you need something different.',
  },
  {
    q: 'Do you deliver and install?',
    a: 'Yes — we deliver across the UK and our team will bring your furniture up to your room, fully assemble it, and remove all packaging. We can also take away your old furniture.',
  },
  {
    q: 'Do you make sofas as well as beds?',
    a: "Yes! We make fully bespoke sofas to order. The same process applies — choose your fabric, style, size, and colour, and we'll build it exactly how you want.",
  },
  {
    q: 'What is your returns policy?',
    // [TO CONFIRM WITH CLIENT] Returns window and bespoke exclusion are smart defaults — confirm before launch.
    a: "Standard (non-personalised) items can be returned within 14 days. Because bespoke items are made specifically for you, we're unable to accept returns on custom orders. We'll always ensure you're happy with the design before we start making. [TO CONFIRM WITH CLIENT]",
  },
  {
    q: 'How does payment and deposit work?',
    // [TO CONFIRM WITH CLIENT] Deposit %, balance timing and accepted methods.
    a: "There's no payment on this website. Once your design is agreed we'll confirm pricing, any deposit, and how to pay directly with you. [TO CONFIRM WITH CLIENT]",
  },
  {
    q: 'How do I get started?',
    a: "Simply fill in our enquiry form, call us on 07831213807, or send us a WhatsApp message. We'll get back to you the same day.",
  },
];

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-cream-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span
          className={`font-display text-lg transition-colors ${
            open ? 'text-sage' : 'text-charcoal'
          }`}
        >
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-body text-sm leading-relaxed text-slate">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <AnimateIn className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
            Questions &amp; Answers
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-5 font-body text-slate">
            Everything you need to know before ordering.
          </p>
        </AnimateIn>

        <AnimateIn className="mt-12" delay={0.05}>
          {FAQS.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </AnimateIn>
      </div>
    </section>
  );
}
