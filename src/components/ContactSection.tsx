import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import AnimateIn from './AnimateIn';
import EnquiryForm from './EnquiryForm';

const WHATSAPP_URL =
  'https://wa.me/447831213807?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20bespoke%20bed%2Fsofa';

export default function ContactSection() {
  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT — sage contact panel */}
      <div className="order-2 bg-sage p-12 text-ivory lg:order-1 lg:p-16">
        <AnimateIn>
          <h2 className="font-display text-4xl leading-[1.1] text-ivory">
            Let&apos;s Build
            <br />
            Something Beautiful
          </h2>
          <p className="mt-6 max-w-md font-body leading-relaxed text-ivory/75">
            Tell us what you have in mind and we&apos;ll get back to you the same
            day. No pushy sales calls — just a friendly chat about your project.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-center gap-4">
              <Phone className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
              <a
                href="tel:07831213807"
                className="font-body text-ivory/90 transition-colors hover:text-gold"
              >
                07831213807
              </a>
            </li>
            <li className="flex items-center gap-4">
              <MessageCircle className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-ivory/90 transition-colors hover:text-gold"
              >
                WhatsApp: 07831213807 (tap to chat)
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
              {/* [PLACEHOLDER EMAIL] Client has not created this address yet. */}
              <a
                href="mailto:hello@opalcomfort.co.uk"
                className="font-body text-ivory/90 transition-colors hover:text-gold"
              >
                hello@opalcomfort.co.uk
              </a>
            </li>
            <li className="flex items-center gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
              <span className="font-body text-ivory/90">West Yorkshire, UK</span>
            </li>
            <li className="flex items-center gap-4">
              <Clock className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
              <span className="font-body text-ivory/90">
                Same-day replies, 7 days a week
              </span>
            </li>
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-green-500 py-4 font-body tracking-wide text-white transition-colors hover:bg-green-600"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp Now
          </a>
        </AnimateIn>
      </div>

      {/* RIGHT — unified enquiry form */}
      <div className="order-1 bg-ivory p-8 lg:order-2 lg:p-16">
        <AnimateIn>
          <EnquiryForm
            heading="Request a Quote or Callback"
            intro="Same-day replies. Tell us a little about your project below."
          />
        </AnimateIn>
      </div>
    </section>
  );
}
