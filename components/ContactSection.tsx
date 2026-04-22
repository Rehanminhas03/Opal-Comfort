'use client';

import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import AnimateIn from './AnimateIn';

type FormState = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  interest: string;
  budget: string;
  message: string;
  samples: boolean;
  consent: boolean;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  postcode: '',
  interest: '',
  budget: '',
  message: '',
  samples: false,
  consent: false,
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.consent) {
      setError('Please complete the required fields and confirm consent.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT — navy contact panel */}
      <div className="bg-navy text-white p-10 sm:p-14 lg:p-20 noise relative">
        <AnimateIn>
          <p className="text-gold tracking-[0.3em] uppercase text-xs font-body">
            Get In Touch
          </p>
          <h2 className="font-display font-light text-4xl sm:text-5xl mt-4 leading-[1.1]">
            Let&apos;s Talk Beds
          </h2>
          <div className="w-12 h-px bg-gold mt-6" />
          <p className="font-body text-white/70 mt-6 max-w-md leading-relaxed">
            Visit our Chelsea showroom, or we&apos;ll come to you. Get in touch
            and we&apos;ll respond within one working day.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <a
                href="tel:08001234567"
                className="font-body text-white/90 hover:text-gold transition-colors"
              >
                0800 123 4567
              </a>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <a
                href="mailto:hello@opalcomfort.co.uk"
                className="font-body text-white/90 hover:text-gold transition-colors"
              >
                hello@opalcomfort.co.uk
              </a>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <span className="font-body text-white/90">
                42 Kings Road, Chelsea, London SW3 4UD
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <span className="font-body text-white/90">
                Mon–Sat 10am–6pm &nbsp;|&nbsp; Sun 12pm–5pm
              </span>
            </li>
          </ul>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mt-10 bg-navy-light border border-gold/20 h-48 flex items-center justify-center text-white/60 font-body text-sm tracking-wide">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" /> View on Google Maps
            </span>
          </div>
        </AnimateIn>
      </div>

      {/* RIGHT — form panel */}
      <div className="bg-cream p-10 sm:p-14 lg:p-20">
        <AnimateIn>
          {submitted ? (
            <div className="min-h-[400px] flex items-center justify-center text-center">
              <div>
                <div className="font-display text-6xl text-gold">✦</div>
                <p className="font-display italic text-2xl sm:text-3xl text-navy mt-6 leading-snug max-w-md">
                  Thank you! We&apos;ll be in touch within one working day. ✦
                </p>
                <button
                  onClick={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                  className="mt-8 text-gold text-xs tracking-[0.25em] uppercase gold-underline"
                >
                  Submit another enquiry
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gold tracking-[0.3em] uppercase text-xs font-body">
                Enquiry Form
              </p>
              <h3 className="font-display font-light text-navy text-3xl sm:text-4xl mt-3 leading-tight">
                Request a Callback or Brochure
              </h3>
              <div className="w-12 h-px bg-gold mt-6" />

              <form onSubmit={handleSubmit} className="mt-10 space-y-7">
                <FloatingInput
                  id="name"
                  label="Full Name *"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <FloatingInput
                  id="email"
                  label="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <FloatingInput
                    id="phone"
                    label="Phone Number *"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    required
                  />
                  <FloatingInput
                    id="postcode"
                    label="Postcode"
                    type="text"
                    value={form.postcode}
                    onChange={(v) => setForm({ ...form, postcode: v })}
                  />
                </div>

                <FloatingSelect
                  id="interest"
                  label="I'm interested in..."
                  value={form.interest}
                  onChange={(v) => setForm({ ...form, interest: v })}
                  options={[
                    'Ottoman Storage Beds',
                    'Divan Beds',
                    'Upholstered Beds',
                    'Mattresses',
                    'Headboards',
                    'Bespoke Order',
                    'Not sure yet',
                  ]}
                />

                <FloatingSelect
                  id="budget"
                  label="Budget Range"
                  value={form.budget}
                  onChange={(v) => setForm({ ...form, budget: v })}
                  options={[
                    'Under £1,000',
                    '£1,000–£2,000',
                    '£2,000–£3,000',
                    '£3,000+',
                  ]}
                />

                <FloatingTextarea
                  id="message"
                  label="Tell us about your project (optional)"
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                />

                <div className="space-y-3 pt-2">
                  <Checkbox
                    id="samples"
                    label="Send me a free fabric sample pack"
                    checked={form.samples}
                    onChange={(v) => setForm({ ...form, samples: v })}
                  />
                  <Checkbox
                    id="consent"
                    label="I agree to be contacted by Opal Comfort regarding my enquiry *"
                    checked={form.consent}
                    onChange={(v) => setForm({ ...form, consent: v })}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-700 font-body">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gold text-navy font-body font-medium tracking-[0.25em] uppercase text-sm py-4 hover:bg-gold-light transition-colors"
                >
                  Submit Enquiry
                </button>
              </form>
            </>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}

// — Floating-label inputs (peer pattern) —

function FloatingInput({
  id,
  label,
  type,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        className="peer w-full bg-transparent border-b border-charcoal/30 focus:border-gold outline-none py-3 font-body text-navy placeholder-transparent transition-colors"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-3 font-body text-sm text-muted transition-all
          peer-focus:-top-3 peer-focus:text-[11px] peer-focus:text-gold peer-focus:tracking-[0.2em] peer-focus:uppercase
          peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-gold peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:uppercase
          pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full bg-transparent border-b border-charcoal/30 focus:border-gold outline-none py-3 font-body appearance-none transition-colors ${
          value ? 'text-navy' : 'text-transparent'
        }`}
      >
        <option value="" disabled hidden></option>
        {options.map((o) => (
          <option key={o} value={o} className="text-navy">
            {o}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-0 font-body transition-all pointer-events-none ${
          value
            ? '-top-3 text-[11px] text-gold tracking-[0.2em] uppercase'
            : 'top-3 text-sm text-muted'
        }`}
      >
        {label}
      </label>
      <span className="absolute right-0 top-3 text-muted pointer-events-none">▾</span>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        rows={3}
        className="peer w-full bg-transparent border-b border-charcoal/30 focus:border-gold outline-none py-3 font-body text-navy placeholder-transparent transition-colors resize-none"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-3 font-body text-sm text-muted transition-all
          peer-focus:-top-3 peer-focus:text-[11px] peer-focus:text-gold peer-focus:tracking-[0.2em] peer-focus:uppercase
          peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-gold peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:uppercase
          pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}

function Checkbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 cursor-pointer group"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 accent-gold cursor-pointer"
      />
      <span className="font-body text-sm text-charcoal/80 group-hover:text-navy transition-colors">
        {label}
      </span>
    </label>
  );
}
