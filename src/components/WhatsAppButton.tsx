'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  "https://wa.me/447831213807?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20bespoke%20bed%2Fsofa";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-xl transition-colors hover:bg-green-600 lg:flex"
    >
      {/* Soft pulsing ring (toned down for a calmer, premium feel) */}
      <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-green-400/25" />

      <MessageCircle className="h-7 w-7 text-white" />

      {/* Hover tooltip */}
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded bg-charcoal px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
