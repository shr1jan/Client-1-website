import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import { getGalleryPhotos } from "@/lib/supabasePhotos";
import { connection } from "next/server";

export default async function GalleryPage() {
  await connection();
  const photos = await getGalleryPhotos();

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
            <GalleryGrid photos={photos} />
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
