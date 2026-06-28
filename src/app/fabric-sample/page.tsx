import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FabricSampleForm from '@/components/FabricSampleForm';

export const metadata: Metadata = {
  title: 'Request a Fabric Sample | Opal Comfort',
  description:
    'Choose your fabrics and we will post free samples to your door, anywhere in the UK.',
};

export default function FabricSamplePage() {
  return (
    <>
      <PageHero
        eyebrow="Free, Posted to Your Door"
        title="Request a Fabric Sample"
        subtitle="Not sure which colour? Pick the fabrics you like and we'll post the swatches out so you can see and feel them at home before you decide."
      />
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <FabricSampleForm />
        </div>
      </section>
    </>
  );
}
