import Link from 'next/link';
import PlaceholderImage from '../PlaceholderImage';

type CatalogueCardProps = {
  name: string;
  href: string;
  /** Stock/placeholder or real photo URL. */
  image: string;
  /** Small eyebrow above the name, e.g. fabric type or collection. */
  eyebrow?: string;
  /** Fulfilment badge text (top-left). */
  badge?: string;
  /** Optional short line under the name (NO prices unless client-confirmed). */
  meta?: string;
  cta?: string;
};

/**
 * Product card matching ProductCategories styling. No price by default —
 * this is a lead-gen site. Imagery is shown via <PlaceholderImage>, which
 * falls back to a branded gradient if the photo fails to load (product
 * photography is still pending client sign-off).
 */
export default function CatalogueCard({
  name,
  href,
  image,
  eyebrow,
  badge,
  meta,
  cta = 'View & Enquire →',
}: CatalogueCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-72 w-full overflow-hidden">
        <PlaceholderImage
          src={image}
          alt={name}
          label={name}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sage">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="border-t-2 border-gold bg-warm-white p-6">
        {eyebrow && (
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
        )}
        <h3 className="mt-1 font-display text-2xl text-charcoal">{name}</h3>
        {meta && <p className="mt-1 font-body text-sm text-slate">{meta}</p>}
        <span className="mt-4 inline-block font-body text-sm font-medium text-sage opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {cta}
        </span>
      </div>
    </Link>
  );
}
