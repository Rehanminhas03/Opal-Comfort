import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Cookie Policy | Opal Comfort',
  description: 'How this website uses cookies.',
};

// [DRAFT — review before launch.] Update the "what we use" section if/when
// analytics or marketing cookies are added (see roadmap).
export default function CookiesPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" subtitle="Last updated 24 June 2026" />
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Prose>
            <p>Cookies are small text files stored on your device when you visit a website. They help
              the site work and can provide information to the site owner.</p>

            <h2>What we use</h2>
            <p>This website currently uses only the essential cookies needed for it to function
              correctly. We do not use advertising cookies. [PLACEHOLDER: if analytics (e.g. Google
              Analytics) is added later, list it here and add a consent banner.]</p>

            <h2>Managing cookies</h2>
            <p>You can control and delete cookies through your browser settings. Blocking essential
              cookies may affect how parts of the site work.</p>

            <h2>Changes to this policy</h2>
            <p>We may update this policy as the website evolves. The latest version will always appear
              on this page.</p>

            <h2>Contact us</h2>
            <p>Questions about cookies? Call 07831213807 or message us on WhatsApp.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
