import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Opal Comfort',
  description: 'The terms on which Opal Comfort provides its products and services.',
};

// [DRAFT — have a solicitor review before launch.] Reflects the confirmed
// lead-gen / made-to-order model. Fill in [PLACEHOLDER] policy specifics.
export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" subtitle="Last updated 24 June 2026" />
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Prose>
            <p>These terms apply to all enquiries and orders placed with Opal Comfort. Please read
              them carefully. [PLACEHOLDER: registered business name and address.]</p>

            <h2>About our products</h2>
            <p>Most of our beds and sofas are <strong>bespoke and made to order</strong> — built to
              the size, base, headboard and fabric you choose. Some mattresses and items are
              ready-made. Because fabrics and finishes vary, colours shown on this website are a
              guide only; we recommend requesting a free fabric sample before ordering.</p>

            <h2>Quotes and pricing</h2>
            <p>This website does not sell online and takes no payment. Prices are provided
              individually by quote based on your chosen specification. A quote is valid for the
              period stated when we give it to you.</p>

            <h2>Orders and confirmation</h2>
            <p>An order is confirmed once we have agreed the specification and any deposit
              arrangements with you directly. Please check all measurements and choices carefully, as
              bespoke items are made specifically for you.</p>

            <h2>Lead times, delivery and installation</h2>
            <p>Bespoke items are typically handmade within around two weeks. We deliver and install
              across the UK and can remove your old items on request. [PLACEHOLDER: delivery charges
              and coverage to be confirmed.]</p>

            <h2>Cancellations and returns</h2>
            <p>As bespoke items are made to your specification, cancellation and return rights may be
              limited once production has begun. [PLACEHOLDER: confirm the client&apos;s
              cancellation, returns and refund policy.]</p>

            <h2>Warranty</h2>
            <p>[PLACEHOLDER: confirm warranty terms and duration.] Nothing in these terms affects
              your statutory rights as a consumer.</p>

            <h2>Liability</h2>
            <p>We are responsible for foreseeable loss caused by us, but we do not exclude liability
              where it would be unlawful to do so, including for death or personal injury caused by
              our negligence.</p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of England and Wales.</p>

            <h2>Contact us</h2>
            <p>Questions about these terms? Call 07831213807 or message us on WhatsApp.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
