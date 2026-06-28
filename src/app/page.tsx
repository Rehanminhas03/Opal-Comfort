import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import MostLoved from '@/components/MostLoved';
import StatsStrip from '@/components/StatsStrip';
import ProductCategories from '@/components/ProductCategories';
import BespokeProcess from '@/components/BespokeProcess';
import FabricsSection from '@/components/FabricsSection';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import DeliverySection from '@/components/DeliverySection';
import Newsletter from '@/components/Newsletter';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import JsonLd from '@/components/JsonLd';
import { BUSINESS } from '@/lib/catalogue';

const SITE_URL = 'https://www.opalcomfort.co.uk';

// LocalBusiness structured data for rich results / local SEO.
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: BUSINESS.name,
  description: BUSINESS.intro,
  image: `${SITE_URL}/opengraph-image`,
  url: SITE_URL,
  telephone: '+447831213807',
  slogan: BUSINESS.tagline,
  areaServed: 'GB',
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wakefield',
    addressRegion: 'West Yorkshire',
    addressCountry: 'GB',
  },
};

// Navbar, Footer and the floating WhatsApp button live in app/layout.tsx
// so they persist across the whole site.
export default function Home() {
  return (
    <>
      <JsonLd data={localBusiness} />
      <Hero />
      <TrustBar />
      <MostLoved />
      <ProductCategories />
      <StatsStrip />
      <BespokeProcess />
      <FabricsSection />
      <AboutSection />
      <Testimonials />
      <DeliverySection />
      <Newsletter />
      <FAQSection />
      <ContactSection />
    </>
  );
}
