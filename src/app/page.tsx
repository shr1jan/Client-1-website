import { Brain, Dumbbell, Wrench } from "lucide-react";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";

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

const servicePreview = [
  { icon: "⬡", title: "Stamped Patios", href: "/services" },
  { icon: "⬢", title: "Driveways", href: "/services" },
  { icon: "◎", title: "Pool Decks", href: "/services" },
  { icon: "▣", title: "Interior Floors", href: "/services" },
  { icon: "◈", title: "Resurfacing", href: "/services" },
];

const stats = [
  { label: "Years Experience", value: siteConfig.stats.yearsInBusiness, suffix: "+" },
  { label: "Projects Completed", value: siteConfig.stats.projectsCompleted, suffix: "+" },
  { label: "Satisfied Clients", value: siteConfig.stats.satisfiedClients, suffix: "+" },
  { label: "Design Patterns", value: siteConfig.stats.designPatterns, suffix: "+" },
];

export default function Home() {
  return (
    <>
      <Hero />
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

      {/* Services Preview -- right aligned header */}
      <section className="py-12 md:py-18 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Our"
              bottomText="Services"
              description="From patios to pool decks, we transform any surface into a work of art."
              align="right"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
              {servicePreview.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group"
                >
                  <div className="concrete-texture aspect-square rounded-sm flex items-center justify-center text-4xl md:text-5xl text-cream/80 group-hover:scale-105 transition-transform duration-500 shadow-md">
                    {service.icon}
                  </div>
                  <p className="mt-4 text-center font-bold text-charcoal uppercase tracking-wider text-xs md:text-sm group-hover:text-terracotta transition-colors">
                    {service.title}
                  </p>
                </Link>
              ))}
            </div>
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
