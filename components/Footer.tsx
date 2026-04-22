import { Mail, Phone, MapPin } from 'lucide-react';

function SocialBadge({ label, letter }: { label: string; letter: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-navy transition-colors flex items-center justify-center font-display text-base"
    >
      {letter}
    </a>
  );
}

const collections = [
  'Ottoman Storage Beds',
  'Divan Beds',
  'Upholstered Beds',
  'Mattresses',
  'Headboards',
  'Bespoke Orders',
];

const info = [
  'About Us',
  'Our Process',
  'Fabrics & Materials',
  'Delivery Information',
  'Warranty & Guarantee',
  'FAQ',
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl text-gold">
                Opal Comfort
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 mt-1">
                est. 2023
              </span>
            </div>
            <p className="font-body text-sm text-white/60 mt-5 leading-relaxed max-w-xs">
              Handcrafted beds, mattresses and storage — built for rest,
              delivered across the UK.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <SocialBadge label="Instagram" letter="ig" />
              <SocialBadge label="Facebook" letter="f" />
              <SocialBadge label="Pinterest" letter="P" />
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-gold tracking-[0.25em] uppercase text-xs font-body">
              Collections
            </h4>
            <ul className="mt-5 space-y-3">
              {collections.map((c) => (
                <li key={c}>
                  <a
                    href="#collections"
                    className="font-body text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-gold tracking-[0.25em] uppercase text-xs font-body">
              Information
            </h4>
            <ul className="mt-5 space-y-3">
              {info.map((i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="font-body text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold tracking-[0.25em] uppercase text-xs font-body">
              Contact Us
            </h4>
            <ul className="mt-5 space-y-3 font-body text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <span>42 Kings Road, Chelsea, London SW3 4UD</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <a href="tel:08001234567" className="hover:text-gold transition-colors">
                  0800 123 4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <a
                  href="mailto:hello@opalcomfort.co.uk"
                  className="hover:text-gold transition-colors break-all"
                >
                  hello@opalcomfort.co.uk
                </a>
              </li>
              <li className="text-white/60 mt-4">
                Mon–Sat 10am–6pm
                <br />
                Sun 12pm–5pm
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-white/50">
          <p>© 2026 Opal Comfort. All rights reserved.</p>
          <p className="text-gold/80 tracking-[0.2em] uppercase text-[10px] order-first md:order-none">
            Crafted for Rest ✦ Designed for Comfort
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
