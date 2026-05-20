import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import ServicesShowcase from "@/components/ServicesShowcase";
import DesignShowcase from "@/components/DesignShowcase";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import { getDesignImages } from "@/lib/supabasePhotos";
import { connection } from "next/server";

export default async function ServicesPage() {
  await connection();
  const stampPatternImages = await getDesignImages();

  return (
    <>
      {/* Page hero -- centered */}
      <PageHero>
        <SectionHeader
          topText="Our"
          bottomText="Services"
          description="Decorative finishes and heavy-duty concrete flooring for residential and commercial projects."
          light
          align="center"
        />
      </PageHero>

      <Marquee text="STAMPED CONCRETE EXPERTS" />

      {/* Services -- same content as home page */}
      <section className="py-12 md:py-18 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Our"
              bottomText="Services"
              description="Stamp concrete, trimix flooring, and application types for every residential and commercial project."
              align="left"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <ServicesShowcase twoColumnMobileApplications />
          </ScrollReveal>
        </div>
      </section>

      {/* Design Showcase -- after services */}
      <section id="stamp-design-patterns" className="py-12 md:py-18 bg-cream scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-charcoal uppercase tracking-tight">
                Stamp Design Patterns
              </h2>
              <p className="mt-3 text-warm-gray text-lg max-w-lg mx-auto">
                Watch as our signature patterns come to life
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <DesignShowcase images={stampPatternImages} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* Process -- right aligned header, centered steps */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Our"
              bottomText="Process"
              description="A seamless journey from your first call to your finished surface."
              align="right"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We visit your site, discuss your vision, and provide a detailed free estimate.",
              },
              {
                step: "02",
                title: "Design",
                desc: "Choose your pattern, colors, and finish. We create mockups so you see it before we pour.",
              },
              {
                step: "03",
                title: "Installation",
                desc: "Our expert crew prepares, pours, stamps, and finishes your concrete to perfection.",
              },
              {
                step: "04",
                title: "Sealing",
                desc: "We apply premium sealant to protect your investment and enhance the colors for years.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 150}>
                <div className="text-center">
                  <span className="text-5xl md:text-7xl font-black text-neutral-400 block">
                    {item.step}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-charcoal uppercase tracking-wide mt-2">
                    {item.title}
                  </h3>
                  <p className="text-warm-gray mt-3 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Have a Project in Mind?"
        subtitle="Let's discuss your vision and bring it to life with stamped concrete."
      />
    </>
  );
}
