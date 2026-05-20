import { Brain, Dumbbell, Wrench } from "lucide-react";
import { randomInt } from "crypto";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/config/siteConfig";
import { getGalleryPhotos } from "@/lib/supabasePhotos";
import Image from "next/image";
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

const servicePreview = [
  {
    title: "Terrace",
    imageSrc: "/assets/PHOTO-2026-05-19-15-41-13.jpg",
    imageAlt: "Red stamped concrete terrace",
    href: "/services",
  },
  {
    title: "Driveway",
    imageSrc: "/assets/PHOTO-2026-05-19-15-41-13%202.jpg",
    imageAlt: "Stamped concrete driveway through a garden",
    href: "/services",
  },
  {
    title: "Rooftop Flooring",
    imageSrc: "/assets/PHOTO-2026-05-19-15-41-13%203.jpg",
    imageAlt: "Grey concrete rooftop flooring",
    href: "/services",
  },
  {
    title: "Patio",
    imageSrc: "/assets/PHOTO-2026-05-19-15-41-14.jpg",
    imageAlt: "Stamped concrete patio beside a home",
    href: "/services",
  },
  {
    title: "Stairs",
    imageSrc: "/assets/PHOTO-2026-05-19-15-41-14%202.jpg",
    imageAlt: "Stamped concrete outdoor stairs",
    href: "/services",
  },
  {
    title: "Walkway",
    imageSrc: "/assets/PHOTO-2026-05-19-15-41-14%203.jpg",
    imageAlt: "Stamped concrete covered walkway",
    href: "/services",
  },
];

const featuredServiceDescriptions = [
  {
    title: "Stamp Concrete",
    imageSrc: "/assets/stamp.jpg",
    imageAlt: "Stamped concrete patio surface",
    description:
      "Stamped concrete is a decorative technique that imprints patterns and textures onto fresh concrete to mimic premium materials like natural stone, slate, brick, or wood. It is a highly durable, cost-effective, and customizable alternative for driveways, patios, and walkways.",
  },
  {
    title: "Trimix Flooring",
    imageSrc: "/assets/trimix.jpg",
    imageAlt: "Trimix concrete flooring surface",
    description:
      "Trimix Flooring, also known as Vacuum Dewatered Flooring (VDF), is a heavy-duty industrial concrete flooring technique. It achieves high compressive strength and wear resistance by extracting excess water from the freshly poured concrete using a specialized vacuum pump, resulting in a floor designed for high-impact and heavy-load environments.",
  },
];

/**
 * Flex + wrap + justify-center centers any short last row (1 item, 2 items, …)
 * for any number of services. These remain compact below the larger feature cards.
 */
const servicePreviewItemClass =
  "group block shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]";

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
              description="Decorative finishes and heavy-duty concrete flooring for residential and commercial projects."
              align="right"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
              {featuredServiceDescriptions.map((service) => (
                <article
                  key={service.title}
                  className="group overflow-hidden rounded-sm bg-white border border-tan/20 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] bg-tan overflow-hidden">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-black text-charcoal uppercase tracking-wide">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base text-warm-gray leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {servicePreview.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className={servicePreviewItemClass}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-tan shadow-md">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
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
