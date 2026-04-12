import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";

export default function GalleryPage() {
  return (
    <>
      {/* Page hero -- right aligned */}
      <PageHero>
        <SectionHeader
          topText="Our"
          bottomText="Gallery"
          description="Browse our portfolio of completed projects and see the quality of our craftsmanship firsthand."
          light
          align="right"
        />
      </PageHero>

      <Marquee text="CRAFTSMANSHIP IN EVERY DETAIL" />

      {/* Gallery */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <GalleryGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* Note -- centered */}
      <section className="py-10 md:py-12 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-warm-gray text-lg leading-relaxed">
              These are placeholder representations of our work. Replace with
              actual project photos to showcase your completed stamped concrete
              projects.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTABanner
        title="Like What You See?"
        subtitle="Let's create something beautiful for your home or business."
        buttonText="Start Your Project"
      />
    </>
  );
}
