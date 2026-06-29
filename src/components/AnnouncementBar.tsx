'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const USPS = [
  'Handmade in the UK',
  '1–2 week lead time',
  'Nationwide delivery & installation',
  'Free old-bed removal',
];

/**
 * Slim USP bar at the very top of the fixed header. Dismissible (remembered via
 * localStorage) and collapses to nothing once the user scrolls down, so the
 * header condenses — matching the premium retail pattern.
 */
export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Deferred so it's not a synchronous setState in the effect body; reads the
    // persisted dismissal after mount (avoids SSR/hydration mismatch).
    const t = setTimeout(() => {
      setDismissed(localStorage.getItem('opal_announce_dismissed') === '1');
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Starts visible at the top (scrolled=false); the listener collapses it.
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hidden = dismissed || scrolled;

  return (
    <div
      className={`overflow-hidden bg-gold text-sage transition-all duration-300 ${
        hidden ? 'max-h-0' : 'max-h-12'
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-10 py-2">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-center font-body text-[11px] font-medium tracking-wide sm:text-xs">
          {USPS.map((u, i) => (
            <span key={u} className="flex items-center gap-x-3">
              {i > 0 && <span className="text-sage/40">·</span>}
              {u}
            </span>
          ))}
          <a href="tel:07831213807" className="hidden font-semibold underline-offset-2 hover:underline sm:inline">
            07831 213807
          </a>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            setDismissed(true);
            localStorage.setItem('opal_announce_dismissed', '1');
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sage/70 transition-colors hover:text-sage"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
