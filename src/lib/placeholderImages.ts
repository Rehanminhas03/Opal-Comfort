/**
 * Category stock imagery, saved locally in public/images/categories/ so it's
 * fast, reliable and never rots. These are tasteful placeholders matched to each
 * category while the client's REAL product photos are pending. catalogue.ts
 * keeps the real `/images/...` path + `imagePlaceholder: true` flag.
 *
 * When real photos arrive: drop them in public/images and set
 * `imagePlaceholder: false` in catalogue.ts; components then use the real path.
 */

type ImageKind = 'bed' | 'sofa' | 'mattress';

const POOLS: Record<ImageKind, string[]> = {
  bed: [
    '/images/categories/upholstered-beds.jpg',
    '/images/categories/ottoman-beds.jpg',
    '/images/categories/sleigh-beds.jpg',
    '/images/categories/divan-beds.jpg',
    '/images/categories/kids-beds.jpg',
  ],
  sofa: ['/images/categories/sofas.jpg'],
  mattress: ['/images/categories/mattresses.jpg'],
};

/** Simple stable string hash so each slug always maps to the same photo. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic category photo for a given item, spread across the pool. */
export function getPlaceholderImage(kind: ImageKind, key: string): string {
  const pool = POOLS[kind];
  return pool[hash(key) % pool.length];
}
