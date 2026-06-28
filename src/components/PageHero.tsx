import { ReactNode } from 'react';

/**
 * Sage header used at the top of every sub-page. The top padding clears the
 * fixed Navbar (h-20) which the full-screen homepage Hero would otherwise cover.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-sage pt-32 pb-16 text-ivory lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {eyebrow && (
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        )}
        <h1 className="mt-4 font-display text-4xl leading-[1.1] text-ivory sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl font-body text-lg text-ivory/75">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
