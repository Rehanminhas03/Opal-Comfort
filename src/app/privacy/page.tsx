import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Privacy Policy | Opal Comfort',
  description: 'How Opal Comfort collects, uses and protects your personal data.',
};

// [DRAFT — have a solicitor review before launch.] Boilerplate covering UK GDPR
// basics; fill in the [PLACEHOLDER] company details once confirmed.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated 24 June 2026" />
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Prose>
            <p>
              This policy explains how Opal Comfort (&quot;we&quot;, &quot;us&quot;) collects and
              uses your personal information when you contact us or use this website. We are the data
              controller for the information you provide. [PLACEHOLDER: registered business name and
              address.]
            </p>

            <h2>Information we collect</h2>
            <p>When you make an enquiry — through our contact form, WhatsApp, phone or email — we may
              collect:</p>
            <ul>
              <li>Your name, email address and phone number;</li>
              <li>Your postcode or delivery address;</li>
              <li>Details of your enquiry, including product, budget and any message you send.</li>
            </ul>

            <h2>How we use your information</h2>
            <p>We use your information only to respond to your enquiry, prepare a quote, arrange
              fabric samples, and deliver and install your order. Our lawful bases are your consent
              and the steps necessary to enter into and perform a contract with you.</p>

            <h2>Sharing your information</h2>
            <p>We do not sell your data. We may share it with trusted service providers who help us
              run our business (for example delivery partners), and only as far as needed to fulfil
              your order.</p>

            <h2>How long we keep it</h2>
            <p>We keep enquiry and order information only for as long as necessary to provide our
              services and to meet our legal obligations, after which it is securely deleted.</p>

            <h2>Your rights</h2>
            <p>Under UK data protection law you have the right to access, correct, delete or restrict
              the use of your personal data, and to object to its processing. To exercise any of
              these rights, contact us using the details below. You may also complain to the
              Information Commissioner&apos;s Office (ico.org.uk).</p>

            <h2>Cookies</h2>
            <p>See our <a href="/cookies">Cookie Policy</a> for how this website uses cookies.</p>

            <h2>Contact us</h2>
            <p>For any privacy questions, call 07831213807 or message us on WhatsApp.
              [PLACEHOLDER: business email once created.]</p>

            <h2>Changes to this policy</h2>
            <p>We may update this policy from time to time. The latest version will always appear on
              this page.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
