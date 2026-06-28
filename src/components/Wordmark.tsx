/**
 * Opal Comfort text wordmark (Playfair name + eyebrow). Built as a self-contained
 * component so it can be swapped for a real logo asset later — replace the inner
 * markup with an <Image src="/images/logo.svg" …> without touching call sites.
 */
export default function Wordmark({
  className = '',
  tone = 'light',
}: {
  className?: string;
  /** 'light' for dark backgrounds (sage/charcoal), 'dark' for light backgrounds. */
  tone?: 'light' | 'dark';
}) {
  const nameColor = tone === 'light' ? 'text-ivory' : 'text-charcoal';
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className={`font-display text-xl ${nameColor}`}>Opal Comfort</span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold">
        Est. West Yorkshire
      </span>
    </span>
  );
}
