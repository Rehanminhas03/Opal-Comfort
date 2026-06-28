import type { MetadataRoute } from 'next';
import { BED_MODELS, SOFA_MODELS } from '@/lib/catalogue';

// Mirror metadataBase (app/layout.tsx) — update to the live domain before launch.
const BASE_URL = 'https://www.opalcomfort.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/beds',
    '/sofas',
    '/mattresses',
    '/fabrics',
    '/fabric-sample',
    '/bespoke',
    '/privacy',
    '/terms',
    '/cookies',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const bedRoutes = BED_MODELS.map((bed) => ({
    url: `${BASE_URL}/beds/${bed.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const sofaRoutes = SOFA_MODELS.map((sofa) => ({
    url: `${BASE_URL}/sofas/${sofa.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...bedRoutes, ...sofaRoutes];
}
