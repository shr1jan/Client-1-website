import {
  Armchair,
  CarFront,
  Waves,
  LayoutGrid,
  RefreshCw,
  Palette,
} from "lucide-react";

import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import DesignShowcase from "@/components/DesignShowcase";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import { getDesignImages } from "@/lib/supabasePhotos";
import { connection } from "next/server";

const serviceIconClass =
  "w-10 h-10 md:w-12 md:h-12 text-terracotta shrink-0";

const services = [
  {
    title: "Stamped Concrete Patios",
    description:
      "Create a stunning outdoor living space with custom stamped concrete patios. Choose from dozens of patterns including natural stone, slate, brick, and tile designs that transform your backyard into a retreat.",
    icon: (
      <Armchair className={serviceIconClass} strokeWidth={1.5} aria-hidden />
    ),
  },
  {
    title: "Driveways & Walkways",
    description:
      "Make a lasting first impression with a beautifully stamped driveway or walkway. Our durable finishes withstand heavy traffic while maintaining their elegant appearance for years to come.",
    icon: (
      <CarFront className={serviceIconClass} strokeWidth={1.5} aria-hidden />
    ),
  },
  {
    title: "Pool Decks",
    description:
      "Enhance your pool area with slip-resistant stamped concrete that looks like natural stone or pavers. Cool-touch finishes and custom drainage solutions included in every pool deck project.",
    icon: (
      <Waves className={serviceIconClass} strokeWidth={1.5} aria-hidden />
    ),
  },
  {
    title: "Interior Floors",
    description:
      "Bring the beauty of stamped concrete indoors. Perfect for basements, sunrooms, kitchens, and commercial spaces. Our interior finishes are polished, sealed, and easy to maintain.",
    icon: (
      <LayoutGrid
        className={serviceIconClass}
        strokeWidth={1.5}
        aria-hidden
      />
    ),
  },
  {
    title: "Concrete Resurfacing",
    description:
      "Revive existing concrete surfaces with our resurfacing process. We overlay worn or damaged concrete with a fresh stamped finish — a cost-effective alternative to full replacement.",
    icon: (
      <RefreshCw
        className={serviceIconClass}
        strokeWidth={1.5}
        aria-hidden
      />
    ),
  },
  {
    title: "Custom Patterns & Colors",
    description:
      "Can't find the perfect match? We create custom stamp patterns and color blends tailored to your vision. From rustic aged stone to modern geometric designs, the possibilities are limitless.",
    icon: (
      <Palette className={serviceIconClass} strokeWidth={1.5} aria-hidden />
    ),
  },
];

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
          description="From elegant patios to durable driveways, we specialize in every form of decorative stamped concrete."
          light
          align="center"
        />
      </PageHero>

      <Marquee text="STAMPED CONCRETE EXPERTS" />

      {/* Design Showcase -- centered */}
      <section className="py-12 md:py-18 bg-cream">
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

      {/* Services Grid -- left aligned header */}
      <section className="py-12 md:py-18 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="What"
              bottomText="We Do"
              description="Comprehensive stamped concrete services for residential and commercial projects."
              align="left"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100}>
                <ServiceCard {...service} compact />
              </ScrollReveal>
            ))}
          </div>
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
