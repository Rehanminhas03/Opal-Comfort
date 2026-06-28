'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/447831213807?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20bespoke%20bed%2Fsofa';

/**
 * Persistent bottom CTA bar on mobile only — keeps "Get a Quote" and WhatsApp one
 * tap away. Hidden on lg+ where the floating WhatsApp button + header CTA appear.
 */
export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-cream-border bg-ivory/95 p-3 backdrop-blur lg:hidden">
      <Link
        href="/contact"
        className="btn-press btn-sheen flex flex-1 items-center justify-center rounded-md bg-gold py-3 font-body text-sm font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold-light"
      >
        Get a Quote
      </Link>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex w-14 shrink-0 items-center justify-center rounded-md bg-green-500 text-white transition-colors hover:bg-green-600"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
