'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Wordmark from './Wordmark';
import AnnouncementBar from './AnnouncementBar';
import { BED_MODELS, BASE_TYPES, BaseType, SIZE_CHARTS } from '@/lib/catalogue';

// Real routes for the catalogue pages; homepage sections use root-relative
// anchors (/#about) so they work from any sub-page.
const NAV_LINKS = [
  { label: 'Sofas', href: '/sofas' },
  { label: 'Mattresses', href: '/mattresses' },
  { label: 'Fabrics', href: '/fabrics' },
  { label: 'Bespoke', href: '/bespoke' },
  { label: 'Samples', href: '/fabric-sample' },
];

const BASE_ENTRIES = Object.entries(BASE_TYPES) as [BaseType, { label: string }][];
const STYLE_LINKS = BED_MODELS.slice(0, 12);
const SIZE_NAMES = [
  ...SIZE_CHARTS.standard.rows.map((r) => r.name),
  '6ft 6in Emperor',
  'Custom size',
];

const WHATSAPP_URL =
  'https://wa.me/447831213807?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20bespoke%20bed%2Fsofa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setMegaOpen(false); // close the Beds mega-menu when the user scrolls
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      id="top"
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? 'bg-sage/95 backdrop-blur-sm shadow-lg shadow-sage-dark/20'
          : 'bg-transparent'
      }`}
    >
      <AnnouncementBar />

      <nav className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Swappable wordmark — replace with a real logo asset later */}
          <Link href="/" aria-label="Opal Comfort — home">
            <Wordmark tone="light" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {/* Beds — mega-menu (JS-controlled so it closes on scroll) */}
            <li
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(false);
              }}
            >
              <Link
                href="/beds"
                onFocus={() => setMegaOpen(true)}
                className="gold-underline flex items-center gap-1 font-body text-sm uppercase tracking-wider text-ivory/80 transition-colors hover:text-gold"
              >
                Beds
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`}
                />
              </Link>

              {/* Full-width dropdown panel */}
              <div
                onClick={() => setMegaOpen(false)}
                className={`absolute inset-x-0 top-full transition-all duration-200 ${
                  megaOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible translate-y-1 opacity-0'
                }`}
              >
                <div className="border-t border-cream-border bg-ivory shadow-2xl">
                  <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-6 py-8 lg:px-10">
                    <MegaCol title="By Style">
                      {STYLE_LINKS.map((b) => (
                        <MegaLink key={b.slug} href={`/beds/${b.slug}`}>
                          {b.name}
                        </MegaLink>
                      ))}
                      <MegaLink href="/beds" strong>
                        View all beds →
                      </MegaLink>
                    </MegaCol>

                    <MegaCol title="By Base">
                      {BASE_ENTRIES.map(([key, val]) => (
                        <MegaLink key={key} href={`/beds?base=${key}`}>
                          {val.label}
                        </MegaLink>
                      ))}
                    </MegaCol>

                    <MegaCol title="By Size">
                      {SIZE_NAMES.map((s) => (
                        <MegaLink key={s} href="/beds">
                          {s}
                        </MegaLink>
                      ))}
                    </MegaCol>

                    {/* Featured tile */}
                    <div className="flex flex-col justify-between rounded-md bg-sage p-6 text-ivory">
                      <div>
                        <p className="font-display text-xl">Not sure on fabric?</p>
                        <p className="mt-2 font-body text-sm text-ivory/75">
                          We post free samples to your door so you can see and feel
                          them at home.
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        <Link
                          href="/fabric-sample"
                          className="rounded-md bg-gold px-4 py-2.5 text-center font-body text-xs font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold-light"
                        >
                          Order free samples
                        </Link>
                        <Link
                          href="/bespoke"
                          className="text-center font-body text-xs uppercase tracking-widest text-gold underline-offset-4 hover:underline"
                        >
                          Bespoke service →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="gold-underline font-body text-sm uppercase tracking-wider text-ivory/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-green-500 text-white transition-colors hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Link
              href="/contact"
              className="btn-press rounded-md border border-gold px-5 py-2.5 font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-sage"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-md text-ivory lg:hidden"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-sage-dark lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              className="flex min-h-full flex-col items-center justify-center gap-5 px-6 py-12"
            >
              {[{ label: 'Beds', href: '/beds' }, ...NAV_LINKS].map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-ivory transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}

              {/* Quick base filters */}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-wrap items-center justify-center gap-2"
              >
                {BASE_ENTRIES.map(([key, val]) => (
                  <Link
                    key={key}
                    href={`/beds?base=${key}`}
                    onClick={() => setOpen(false)}
                    className="rounded-md border border-gold/40 px-3 py-1.5 font-body text-xs uppercase tracking-wider text-gold"
                  >
                    {val.label}
                  </Link>
                ))}
              </motion.li>

              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-4 flex flex-col items-center gap-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-sage transition-colors hover:bg-gold-light"
                >
                  Get a Quote
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest text-green-400"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp Us
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-gold">{title}</p>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function MegaLink({
  href,
  children,
  strong = false,
}: {
  href: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`font-body text-sm transition-colors hover:text-sage ${
          strong ? 'font-semibold text-sage' : 'text-slate'
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
