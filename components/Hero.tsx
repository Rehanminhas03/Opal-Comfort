'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const heroImg =
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1800&q=80';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-screen min-h-[640px] w-full overflow-hidden noise"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      {/* Dark overlays */}
      <div className="absolute inset-0 bg-navy/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-gold tracking-[0.35em] uppercase text-xs sm:text-sm font-body font-light"
          >
            British Comfort, Crafted Since 2023
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display font-light text-white leading-[1.05] mt-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Crafted for Rest.
            <br />
            <em className="italic font-light text-gold-pale">
              Designed for Comfort.
            </em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-body font-light text-white/75 text-base sm:text-lg max-w-xl mx-auto mt-8 leading-relaxed"
          >
            High-quality beds, mattresses and storage solutions for modern UK
            living — combining comfort, practicality and style at accessible
            prices.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#collections"
              className="bg-gold text-navy font-body font-medium tracking-[0.2em] uppercase text-xs sm:text-sm px-8 py-4 hover:bg-gold-light transition-colors"
            >
              Explore Our Beds
            </a>
            <a
              href="#contact"
              className="border border-white/60 text-white font-body tracking-[0.2em] uppercase text-xs sm:text-sm px-8 py-4 hover:border-gold hover:text-gold transition-colors"
            >
              Book Showroom Visit
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#trust"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold animate-soft-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
}
