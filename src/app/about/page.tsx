import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import StatsCounter from "@/components/StatsCounter";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import { siteConfig } from "@/config/siteConfig";

const team = [
  {
    name: "Anush Bhattarai",
    role: "Marketing Manager",
    bio: "Leads client communication, brand outreach, and project coordination so every customer experience feels clear and responsive.",
  },
  {
    name: "Netra Bahadur Bhattarai",
    role: "CEO",
    bio: "Guides the company with hands-on industry knowledge, a focus on quality workmanship, and a commitment to dependable service.",
  },
];

const stats = [
  { label: "Years Experience", value: siteConfig.stats.yearsInBusiness, suffix: "+" },
  { label: "Projects Completed", value: siteConfig.stats.projectsCompleted, suffix: "+" },
  { label: "Satisfied Clients", value: siteConfig.stats.satisfiedClients, suffix: "+" },
  { label: "Design Patterns", value: siteConfig.stats.designPatterns, suffix: "+" },
];

const values = [
  {
    title: "Quality First",
    description:
      "We never cut corners. From the base preparation to the final seal coat, every step meets our exacting standards.",
  },
  {
    title: "Client Vision",
    description:
      "Your project is personal. We listen, advise, and collaborate to ensure the final result matches — or exceeds — what you imagined.",
  },
  {
    title: "Honest Pricing",
    description:
      "No hidden fees, no surprise charges. We provide detailed quotes upfront so you know exactly what to expect.",
  },
  {
    title: "Standing Behind Our Work",
    description:
      "Every project comes with our satisfaction guarantee. We're not done until you're thrilled with the result.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero -- left aligned */}
      <PageHero>
        <SectionHeader
          topText="About"
          bottomText="Us"
          description="The story, people, and values behind every surface we craft."
          light
          align="left"
        />
      </PageHero>

      <Marquee text="PASSION FOR PERFECTION" />

      {/* Story -- image left, text right (inherently mixed) */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="concrete-texture aspect-[4/3] rounded-sm shadow-lg" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <SectionHeader
                  topText="Our"
                  bottomText="Story"
                  align="left"
                  className="mb-4"
                />
                <div className="space-y-5 text-warm-gray leading-relaxed">
                  <p>
                    What started as a small crew with a passion for concrete has
                    grown into one of the region&apos;s most trusted decorative
                    concrete companies. For over {siteConfig.stats.yearsInBusiness} years,
                    we&apos;ve been transforming ordinary concrete into extraordinary
                    surfaces.
                  </p>
                  <p>
                    Our journey began with a simple belief: concrete doesn&apos;t have
                    to be boring. With the right techniques, colors, and patterns,
                    it can rival the beauty of natural stone, brick, or wood — at
                    a fraction of the cost and with superior durability.
                  </p>
                  <p>
                    Today, with {siteConfig.stats.projectsCompleted}+ completed
                    projects and a team of dedicated artisans, we continue to push
                    the boundaries of what stamped concrete can achieve.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats -- centered */}
      <StatsCounter stats={stats} />

      {/* Values -- right aligned header */}
      <section className="py-12 md:py-18 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Our"
              bottomText="Values"
              description="The principles that guide every project we undertake."
              align="right"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 100}>
                <div className="bg-white p-8 md:p-10 rounded-sm border border-tan/20 hover:shadow-lg transition-shadow duration-500 text-center">
                  <h3 className="text-xl font-bold text-charcoal uppercase tracking-wide mb-3">
                    {value.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team -- centered */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Meet"
              bottomText="The Team"
              description="The skilled professionals who bring your vision to life."
              align="center"
              className="mb-8 md:mb-10"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="text-center group">
                  <div className="w-40 h-40 mx-auto rounded-full concrete-texture-light shadow-md group-hover:shadow-xl transition-shadow duration-500 flex items-center justify-center">
                    <span className="text-4xl text-brown">&#9679;</span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-charcoal uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-terracotta text-sm font-semibold uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                  <p className="mt-3 text-warm-gray text-sm leading-relaxed max-w-xs mx-auto">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Work With Us?"
        subtitle="Let's discuss your project and show you what we can do."
      />
    </>
  );
}
