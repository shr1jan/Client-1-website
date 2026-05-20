import { Brain, Dumbbell, Wrench } from "lucide-react";
import { randomInt } from "crypto";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import ServicesShowcase from "@/components/ServicesShowcase";
import StatsCounter from "@/components/StatsCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/config/siteConfig";
import { getGalleryPhotos } from "@/lib/supabasePhotos";
import Link from "next/link";
import { connection } from "next/server";

const featureIconClass =
  "w-10 h-10 md:w-12 md:h-12 text-terracotta shrink-0";

const features = [
  {
    icon: (
      <Brain className={featureIconClass} strokeWidth={1.5} aria-hidden />
    ),
    title: "Expert Craftsmanship",
    description:
      "Our skilled artisans bring decades of experience to every project, ensuring precision and artistry in every stamp.",
  },
  {
    icon: (
      <Wrench className={featureIconClass} strokeWidth={1.5} aria-hidden />
    ),
    title: "Custom Designs",
    description:
      "Choose from dozens of patterns and unlimited color combinations to create a surface uniquely yours.",
  },
  {
    icon: (
      <Dumbbell className={featureIconClass} strokeWidth={1.5} aria-hidden />
    ),
    title: "Built to Last",
    description:
      "Our stamped concrete is sealed and reinforced for decades of beauty, standing up to weather and heavy use.",
  },
];

const stats = [
  { label: "Years Experience", value: siteConfig.stats.yearsInBusiness, suffix: "+" },
  { label: "Projects Completed", value: siteConfig.stats.projectsCompleted, suffix: "+" },
];

export default async function Home() {
  await connection();
  const heroPhotos = await getGalleryPhotos();
  const initialHeroPhotoIndex = heroPhotos.length
    ? randomInt(heroPhotos.length)
    : 0;

  return (
    <>
      <Hero
        photos={heroPhotos}
        initialPhotoIndex={initialHeroPhotoIndex}
      />

      {/* Services Preview -- right aligned header */}
      <section className="py-12 md:py-18 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Our"
              bottomText="Services"
              description="Decorative finishes and heavy-duty concrete flooring for residential and commercial projects."
              align="right"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <ServicesShowcase applicationHref="/services" />
          </ScrollReveal>
          <ScrollReveal delay={250}>
            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="inline-block px-8 py-3 border-2 border-charcoal text-charcoal font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-charcoal hover:text-cream transition-all duration-300"
              >
                View All Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Marquee text={siteConfig.businessName.toUpperCase()} />

      {/* Why Choose Us -- centered */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Why"
              bottomText="Choose Us"
              description="We combine artistry with engineering to deliver surfaces that are as durable as they are beautiful."
              align="center"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 150}>
                <ServiceCard {...feature} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats -- always centered */}
      <StatsCounter stats={stats} />

      {/* Testimonials -- left aligned header */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="What"
              bottomText="Clients Say"
              description="Don't just take our word for it -- hear from homeowners and businesses who love their new surfaces."
              align="left"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <TestimonialCarousel />
          </ScrollReveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
