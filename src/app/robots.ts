import type { MetadataRoute } from 'next';

// Mirror metadataBase (app/layout.tsx) — update to the live domain before launch.
const BASE_URL = 'https://www.opalcomfort.co.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
