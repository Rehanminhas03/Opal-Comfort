import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote hosts allowed for next/image optimisation.
    // - loremflickr: temporary themed placeholder photos (see lib/placeholderImages.ts)
    // - unsplash: homepage stock imagery
    // Swap/remove these once the client's real photos live in /public/images.
    remotePatterns: [
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
