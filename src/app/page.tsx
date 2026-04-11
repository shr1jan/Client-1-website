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

const features = [
  {
    icon: "◆",
    title: "Expert Craftsmanship",
    description:
      "Our skilled artisans bring decades of experience to every project, ensuring precision and artistry in every stamp.",
  },
  {
    icon: "◈",
    title: "Custom Designs",
    description:
      "Choose from dozens of patterns and unlimited color combinations to create a surface uniquely yours.",
  },
  {
    icon: "◇",
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

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Why"
              bottomText="Choose Us"
              description="We combine artistry with engineering to deliver surfaces that are as durable as they are beautiful."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 150}>
                <ServiceCard {...feature} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Our"
              bottomText="Services"
              description="From patios to pool decks, we transform any surface into a work of art."
            />
          </ScrollReveal>
          <div className="overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory flex gap-5">
            {servicePreview.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100}>
                <Link
                  href={service.href}
                  className="snap-start shrink-0 w-[200px] md:w-[240px] group"
                >
                  <div className="concrete-texture aspect-square rounded-sm flex items-center justify-center text-5xl text-cream/80 group-hover:scale-105 transition-transform duration-500 shadow-md">
                    {service.icon}
                  </div>
                  <p className="mt-4 text-center font-bold text-charcoal uppercase tracking-wider text-sm group-hover:text-terracotta transition-colors">
                    {service.title}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={300}>
            <div className="mt-10 text-center">
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

      {/* Stats */}
      <StatsCounter stats={stats} />

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="What"
              bottomText="Clients Say"
              description="Don't just take our word for it — hear from homeowners and businesses who love their new surfaces."
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <TestimonialCarousel />
          </ScrollReveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
