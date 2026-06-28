import type { Metadata } from 'next';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import PageHero from '@/components/PageHero';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact & Quote | Opal Comfort',
  description:
    'Request a quote or callback for a bespoke bed or sofa. Same-day replies by phone, WhatsApp or our enquiry form. Handmade in West Yorkshire, delivered UK-wide.',
};

const WHATSAPP_URL =
  'https://wa.me/447831213807?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20bespoke%20bed%2Fsofa';

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; message?: string }>;
}) {
  const { product, message } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Request a Quote or Callback"
        subtitle="Tell us what you have in mind and we'll get back to you the same day — no pushy sales calls, just a friendly chat about your project."
      />

      <section className="bg-ivory py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:px-10">
          {/* Contact details */}
          <div>
            <h2 className="font-display text-2xl text-charcoal">Talk to us directly</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
                <a href="tel:07831213807" className="font-body text-charcoal transition-colors hover:text-sage">
                  07831213807
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-charcoal transition-colors hover:text-sage"
                >
                  WhatsApp us (tap to chat)
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
                <span className="font-body text-charcoal">West Yorkshire, UK</span>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
                <span className="font-body text-charcoal">Same-day replies, 7 days a week</span>
              </li>
            </ul>
            <p className="mt-8 max-w-sm font-body text-sm leading-relaxed text-slate">
              Prefer to see the fabrics first? We post free samples to your door —
              just ask, or request them on the Fabrics page.
            </p>
          </div>

          {/* Form (pre-filled from "Get a Quote" CTAs) */}
          <div>
            <EnquiryForm defaultProduct={product ?? ''} defaultMessage={message ?? ''} />
          </div>
        </div>
      </section>
    </>
  );
}
