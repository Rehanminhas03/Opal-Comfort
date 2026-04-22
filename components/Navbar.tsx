'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Our Beds', href: '#collections' },
  { label: 'Bespoke', href: '#bespoke' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy/95 backdrop-blur-sm shadow-[0_2px_30px_rgba(0,0,0,0.25)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#top" className="flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl text-gold tracking-wide">
              Opal Comfort
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 mt-1">
              est. 2023
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="gold-underline font-body text-[12px] tracking-[0.25em] uppercase text-white/80 hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="border border-gold text-gold font-body text-xs tracking-[0.25em] uppercase px-5 py-3 hover:bg-gold hover:text-navy transition-colors"
            >
              Request Brochure
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-navy flex flex-col"
          >
            <div className="flex items-center justify-between h-20 px-6">
              <span className="font-display text-2xl text-gold">Opal Comfort</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white p-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  className="font-display text-4xl font-light text-white hover:text-gold transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 border border-gold text-gold font-body text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-gold hover:text-navy transition-colors"
              >
                Request Brochure
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
