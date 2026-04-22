import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Collections from '@/components/Collections';
import BespokeProcess from '@/components/BespokeProcess';
import FabricsStrip from '@/components/FabricsStrip';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import DeliveryStrip from '@/components/DeliveryStrip';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Collections />
      <BespokeProcess />
      <FabricsStrip />
      <AboutSection />
      <Testimonials />
      <DeliveryStrip />
      <ContactSection />
    </>
  );
}
