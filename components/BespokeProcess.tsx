import AnimateIn from './AnimateIn';

const steps = [
  {
    num: '01',
    title: 'Choose Your Style',
    desc: 'Browse our collections or come to us with your own idea. We love a challenge.',
  },
  {
    num: '02',
    title: 'Select Your Fabric',
    desc: 'Choose from over 100 luxury fabrics — velvets, linens, boucles, leathers and more.',
  },
  {
    num: '03',
    title: 'We Build It',
    desc: 'Our craftspeople handmake your bed in our London workshop. Takes 4–6 weeks.',
  },
  {
    num: '04',
    title: 'We Deliver',
    desc: 'Free white-glove delivery. We bring it upstairs, assemble it, and take away all packaging.',
  },
];

export default function BespokeProcess() {
  return (
    <section id="bespoke" className="bg-cream-warm py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gold tracking-[0.3em] uppercase text-xs font-body">
              How It Works
            </p>
            <h2 className="font-display font-light text-navy text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.1]">
              Your Dream Bed, Built to Order
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-8" />
          </div>
        </AnimateIn>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {steps.map((s, i) => (
            <AnimateIn key={s.num} delay={i * 0.1}>
              <div className="relative lg:pr-6">
                <div className="font-display text-7xl lg:text-8xl font-light text-gold/30 leading-none">
                  {s.num}
                </div>
                <h3 className="font-display text-2xl text-navy mt-3 leading-tight">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-muted mt-3 leading-relaxed">
                  {s.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-12 h-px bg-gold/40" />
                )}
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3}>
          <div className="text-center mt-16">
            <a
              href="#contact"
              className="inline-block bg-navy text-white font-body text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-navy-light transition-colors"
            >
              Start Your Bespoke Order
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
