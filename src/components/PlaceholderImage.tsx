'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Renders an optimised next/image and, if it fails to load (or no src is
 * given), falls back to a branded sage gradient with the product name — so a
 * dead/placeholder URL never shows a broken image. The parent element must be
 * `position: relative` with a fixed height (next/image uses `fill`).
 */
export default function PlaceholderImage({
  src,
  alt,
  label,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: {
  src?: string;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-sage to-sage-dark ${className}`}
      >
        <span className="px-4 text-center font-display text-2xl text-ivory/90">
          {label}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      className={`object-cover transition-all duration-700 ease-out ${
        loaded ? 'scale-100 blur-0 opacity-100' : 'scale-[1.03] blur-md opacity-0'
      } ${className}`}
    />
  );
}
