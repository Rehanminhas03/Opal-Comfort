'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/447831213807?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20bespoke%20bed%2Fsofa';

// [PLACEHOLDER] Drop the client's real hero photo at public/images/hero.jpg and
// switch HERO_SRC to '/images/hero.jpg'. Until then we use a stock bedroom.
const HERO_SRC =
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=85';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll-linked depth: background pushes back, content recedes as you scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const bgStyle = reduce ? undefined : { scale: bgScale, y: bgY };
  const contentStyle = reduce
    ? undefined
    : { y: contentY, opacity: contentOpacity, scale: contentScale };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background — scroll parallax (priority = LCP) */}
      <motion.div style={bgStyle} className="absolute inset-0 will-change-transform">
        {/* slight overscale so parallax never reveals edges */}
        <div className="absolute inset-[-6%]">
          <Image
            src={HERO_SRC}
            alt="A handcrafted upholstered bed in a calm, styled bedroom"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Sage gradient overlay (darker at the bottom for text legibility) */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-dark/40 via-sage-dark/55 to-sage-dark/80" />

      {/* Warm grain texture */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-10" />

      {/* Soft gold depth accent (static) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(184,147,90,0.35),_transparent_60%)]" />
      </div>

      {/* Content */}
      <motion.div style={contentStyle} className="relative z-10 will-change-transform">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl px-6 text-center"
        >
          <motion.span
            variants={item}
            className="inline-block rounded-full border border-gold/40 bg-gold/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-gold-light"
          >
            Handcrafted in West Yorkshire
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display font-normal leading-[1.05] text-ivory"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.25rem)' }}
          >
            Crafted for Rest,
            <span className="block italic font-normal">Designed for Comfort</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl font-body text-lg font-light text-ivory/75"
          >
            Every piece is handmade to your exact specification in West Yorkshire.
            Your fabric. Your colour. Your size. Delivered and installed across the
            UK in as little as 1 week.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-press btn-sheen rounded-md bg-gold px-8 py-4 font-body text-sm font-medium uppercase tracking-widest text-sage transition-all hover:bg-gold-light"
            >
              Get a Quote
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-ivory/60 px-8 py-4 font-body text-sm uppercase tracking-widest text-ivory transition hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bouncing chevron */}
      <a
        href="#trust"
        aria-label="Scroll down"
        className="animate-soft-bounce absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  );
}
