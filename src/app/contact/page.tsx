import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import { siteConfig } from "@/config/siteConfig";

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-24 bg-slate">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            topText="Get In"
            bottomText="Touch"
            description="Ready to transform your space? Reach out for a free consultation and quote."
            light
            align="center"
          />
        </div>
      </section>

      <Marquee text="FREE ESTIMATES & CONSULTATIONS" />

      {/* Contact section */}
      <section className="py-24 md:py-36 bg-cream">
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
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-3">
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
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-3">
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
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-3">
                      Location
                    </h3>
                    <p className="text-warm-gray">{siteConfig.address}</p>
                  </div>

                  {/* Hours */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-3">
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
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-3">
                      Find Us
                    </h3>
                    <div className="aspect-[4/3] rounded-sm concrete-texture-light flex items-center justify-center shadow-inner">
                      <div className="text-center text-brown/50">
                        <div className="text-4xl mb-2">&#9673;</div>
                        <p className="text-sm font-medium uppercase tracking-wider">
                          Map Placeholder
                        </p>
                      </div>
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
