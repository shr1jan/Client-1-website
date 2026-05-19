import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import { siteConfig } from "@/config/siteConfig";

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <PageHero>
        <SectionHeader
          topText="Get In"
          bottomText="Touch"
          description="Ready to transform your space? Reach out for a free consultation and quote."
          light
          align="center"
        />
      </PageHero>

      <Marquee text="FREE ESTIMATES & CONSULTATIONS" />

      {/* Contact section */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal uppercase tracking-tight mb-10">
                  Send Us a Message
                </h2>
                <ContactForm />
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="border-t border-tan/20 pt-10 lg:border-t-0 lg:pt-0">
              <ScrollReveal direction="right" delay={200}>
                <div className="space-y-10">
                  {/* Phone */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal mb-3">
                      Phone
                    </h3>
                    <a
                      href={`tel:${siteConfig.phoneTel}`}
                      className="text-xl font-bold text-charcoal hover:text-terracotta transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal mb-3">
                      Email
                    </h3>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-lg font-medium text-charcoal hover:text-terracotta transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal mb-3">
                      Location
                    </h3>
                    <p className="text-warm-gray">{siteConfig.address}</p>
                  </div>

                  {/* Hours */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal mb-3">
                      Business Hours
                    </h3>
                    <div className="space-y-2 text-warm-gray text-sm">
                      <p>{siteConfig.hours.weekdays}</p>
                      <p>{siteConfig.hours.saturday}</p>
                      <p>{siteConfig.hours.sunday}</p>
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal mb-3">
                      Find Us
                    </h3>
                    <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-inner">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3532.9948006706804!2d85.27464727546662!3d27.686555576194493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQxJzExLjYiTiA4NcKwMTYnMzguMCJF!5e0!3m2!1sen!2snp!4v1779176999647!5m2!1sen!2snp"
                        className="h-full w-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Map to Saheed Basu Ismriti Marge, Kathmandu"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Prefer to Call?"
        subtitle={`Reach us directly at ${siteConfig.phone} during business hours.`}
        buttonText="Call Now"
        href={`tel:${siteConfig.phoneTel}`}
      />
    </>
  );
}
