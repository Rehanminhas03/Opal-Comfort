// NB: lucide-react v1 removed brand icons (Instagram/Facebook), so we use
// generic glyphs for the "coming soon" social row. Swap for real brand
// SVGs once the client's social accounts exist.
import Link from 'next/link';
import { Camera, ThumbsUp } from 'lucide-react';
import Wordmark from './Wordmark';

// Real catalogue routes.
const PRODUCTS = [
  { label: 'Beds', href: '/beds' },
  { label: 'Sofas', href: '/sofas' },
  { label: 'Mattresses', href: '/mattresses' },
  { label: 'Fabrics & Colours', href: '/fabrics' },
  { label: 'Bespoke & Custom', href: '/bespoke' },
  { label: 'Request a Sample', href: '/fabric-sample' },
];

// Homepage sections use root-relative anchors so they work from any sub-page.
const INFORMATION = [
  { label: 'About Us', href: '/#about' },
  { label: 'How It Works', href: '/#process' },
  { label: 'Delivery & Installation', href: '/#delivery' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact Us', href: '/contact' },
];

const WHATSAPP_URL =
  'https://wa.me/447831213807?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20bespoke%20bed%2Fsofa';

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-16 pb-8 text-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <Wordmark tone="light" />
            <p className="mt-4 max-w-xs font-body text-sm text-ivory/60">
              Crafted for Rest, Designed for Comfort.
            </p>
            {/* Social — no accounts exist yet (flag for client) */}
            <div className="mt-6 flex items-center gap-4">
              <span className="flex items-center gap-2 text-ivory/50">
                <Camera className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-wider">
                  Coming Soon
                </span>
              </span>
              <span className="flex items-center gap-2 text-ivory/50">
                <ThumbsUp className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-wider">
                  Coming Soon
                </span>
              </span>
            </div>
          </div>

          {/* Col 2 — Products */}
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-gold">
              Shop
            </h4>
            <ul className="space-y-2">
              {PRODUCTS.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="font-body text-sm text-ivory/60 transition-colors hover:text-gold"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Information */}
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-gold">
              Information
            </h4>
            <ul className="space-y-2">
              {INFORMATION.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-ivory/60 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-gold">
              Contact Us
            </h4>
            <ul className="space-y-2 font-body text-sm text-ivory/60">
              <li>
                <a href="tel:07831213807" className="hover:text-gold">
                  07831213807
                </a>
              </li>
              {/* [PLACEHOLDER EMAIL] Client has not created one yet (BUSINESS.email is null). */}
              <li>
                <a href="mailto:hello@opalcomfort.co.uk" className="hover:text-gold">
                  hello@opalcomfort.co.uk
                </a>
              </li>
              <li>West Yorkshire, UK</li>
              <li>Same-day replies</li>
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-body text-sm text-green-400 transition-colors hover:text-green-300"
            >
              WhatsApp Us Now →
            </a>
          </div>
        </div>

        {/* Centre tagline */}
        <p className="mt-12 text-center font-body text-xs tracking-wide text-ivory/40">
          ♦ Handmade in West Yorkshire · Delivered Across the UK ♦
        </p>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center gap-4 border-t border-ivory/10 pt-6 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-ivory/40">
            © 2025 Opal Comfort. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-body text-xs text-ivory/40">
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <span className="text-ivory/20">|</span>
            <Link href="/terms" className="transition-colors hover:text-gold">
              Terms &amp; Conditions
            </Link>
            <span className="text-ivory/20">|</span>
            <Link href="/cookies" className="transition-colors hover:text-gold">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
