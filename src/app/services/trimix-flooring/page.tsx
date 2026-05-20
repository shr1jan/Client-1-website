import Image from "next/image";
import Link from "next/link";

import CTABanner from "@/components/CTABanner";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";

const useCases = [
  "Warehouses and logistics floors",
  "Factory and workshop slabs",
  "Parking zones and ramps",
  "Commercial and institutional high-traffic areas",
];

const highlights = [
  "Vacuum dewatering removes excess water from fresh concrete for denser slabs.",
  "Improves surface hardness and wear resistance for heavy-duty usage.",
  "Reduces shrinkage-related issues compared to conventional finishing in demanding conditions.",
  "Produces a flatter, more uniform finish suitable for industrial operations.",
];

export default function TrimixFlooringPage() {
  return (
    <>
      <PageHero>
        <SectionHeader
          topText="Service"
          bottomText="Trimix Flooring"
          description="Vacuum dewatered flooring engineered for high-load, abrasion-prone, and industrial-use surfaces."
          light
          align="center"
        />
      </PageHero>

      <Marquee text="TRIMIX VDF FLOORING" />

      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg bg-tan">
              <Image
                src="/assets/trimix.jpg"
                alt="Trimix flooring concrete surface"
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
                Trimix flooring (also called VDF flooring) is a concrete floor
                construction method where vacuum equipment removes excess water
                after placement and finishing. This helps improve compaction and
                creates a denser, tougher wearing surface.
              </p>
              <p className="mt-4 text-warm-gray leading-relaxed">
                It is commonly selected where floors must tolerate repetitive
                movement, load, and abrasion while keeping maintenance practical.
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
                Performance Highlights
              </h3>
              <ul className="mt-4 space-y-3 text-warm-gray">
                {highlights.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div>
              <h3 className="text-xl md:text-3xl font-black text-charcoal uppercase tracking-tight">
                Best-fit Applications
              </h3>
              <ul className="mt-4 space-y-3 text-warm-gray">
                {useCases.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-10 bg-cream">
        <div className="max-w-7xl mx-auto px-6 text-sm text-warm-gray">
          Source:
          {" "}
          <Link
            className="underline"
            href="https://www.livspace.com/in/magazine/vdf-flooring-expert-guide"
          >
            Livspace VDF flooring guide
          </Link>
        </div>
      </section>

      <CTABanner
        title="Need Industrial-grade Flooring?"
        subtitle="Tell us your usage, loading pattern, and area size to get the right Trimix flooring recommendation."
      />
    </>
  );
}
