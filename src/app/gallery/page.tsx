import SectionHeader from "@/components/SectionHeader";
import GalleryGrid from "@/components/GalleryGrid";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";

export default function GalleryPage() {
  return (
    <>
      {/* Page hero -- right aligned */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-24 bg-slate">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            topText="Our"
            bottomText="Gallery"
            description="Browse our portfolio of completed projects and see the quality of our craftsmanship firsthand."
            light
            align="right"
          />
        </div>
      </section>

      <Marquee text="CRAFTSMANSHIP IN EVERY DETAIL" />

      {/* Gallery -- centered filters */}
      <section className="py-24 md:py-36 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <GalleryGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* Note -- centered */}
      <section className="py-20 md:py-24 bg-cream-dark">
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
