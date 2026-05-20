import Image from "next/image";
import Link from "next/link";

import CTABanner from "@/components/CTABanner";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";

const benefits = [
  "Delivers the look of stone, brick, slate, tile, or wood with more budget control.",
  "Supports a wide variety of patterns and color blends for custom design work.",
  "Handles outdoor traffic well when installed and sealed correctly.",
  "Typically installs faster than laying individual pavers or natural stone pieces.",
];

const process = [
  "Site preparation and form setup.",
  "Concrete placement, screeding, and initial finishing.",
  "Color hardener/release application and stamping at the right set time.",
  "Detailing, joints, curing, and final sealer coat.",
];

export default function StampConcretePage() {
  return (
    <>
      <PageHero>
        <SectionHeader
          topText="Service"
          bottomText="Stamp Concrete"
          description="Decorative concrete crafted to achieve premium stone-like aesthetics with long-term durability."
          light
          align="center"
        />
      </PageHero>

      <Marquee text="STAMP CONCRETE SOLUTIONS" />

      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg bg-tan">
              <Image
                src="/assets/stamp.jpg"
                alt="Stamped concrete surface detail"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-charcoal uppercase tracking-tight">
                What It Is
              </h2>
              <p className="mt-4 text-warm-gray leading-relaxed">
                Stamped concrete is a decorative finish where patterns are pressed
                into freshly placed concrete to replicate natural materials such
                as stone, brick, slate, tile, or wood. It combines design
                flexibility with a monolithic slab system that is easier to
                maintain than many jointed surfaces.
              </p>
              <p className="mt-4 text-warm-gray leading-relaxed">
                We use it for patios, terraces, walkways, entries, poolside
                zones, and driveways where clients want a premium look with
                practical maintenance.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-18 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <ScrollReveal>
            <div>
              <h3 className="text-xl md:text-3xl font-black text-charcoal uppercase tracking-tight">
                Key Benefits
              </h3>
              <ul className="mt-4 space-y-3 text-warm-gray">
                {benefits.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div>
              <h3 className="text-xl md:text-3xl font-black text-charcoal uppercase tracking-tight">
                Typical Installation Flow
              </h3>
              <ol className="mt-4 space-y-3 text-warm-gray list-decimal pl-5">
                {process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-10 bg-cream">
        <div className="max-w-7xl mx-auto px-6 text-sm text-warm-gray">
          Sources:
          {" "}
          <Link className="underline" href="https://www.concretenetwork.com/stamped-concrete/">
            Concrete Network overview
          </Link>
          {" · "}
          <Link
            className="underline"
            href="https://www.concretenetwork.com/stamped-concrete/installation-tips.html"
          >
            installation guide
          </Link>
        </div>
      </section>

      <CTABanner
        title="Plan Your Stamp Concrete Project"
        subtitle="Share your area dimensions and preferred style, and we will recommend the right pattern and finish."
      />
    </>
  );
}
