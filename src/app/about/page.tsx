import SectionHeader from "@/components/SectionHeader";
import StatsCounter from "@/components/StatsCounter";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import { siteConfig } from "@/config/siteConfig";

const team = [
  {
    name: "Team Member Name",
    role: "Founder & Lead Designer",
    bio: "With over 15 years in decorative concrete, our founder brings an artist's eye and an engineer's precision to every project.",
  },
  {
    name: "Team Member Name",
    role: "Project Manager",
    bio: "Ensures every project runs on time, on budget, and exceeds expectations. The bridge between our clients' vision and our crew's expertise.",
  },
  {
    name: "Team Member Name",
    role: "Lead Installer",
    bio: "A master of stamping techniques with an incredible attention to detail. Responsible for the flawless finish on hundreds of projects.",
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
      {/* Page hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-slate">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            topText="About"
            bottomText="Us"
            description="The story, people, and values behind every surface we craft."
            light
          />
        </div>
      </section>

      <Marquee text="PASSION FOR PERFECTION" />

      {/* Story */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="concrete-texture aspect-[4/3] rounded-sm shadow-lg" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <SectionHeader
                  topText="Our"
                  bottomText="Story"
                />
                <div className="space-y-4 text-warm-gray leading-relaxed">
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

      {/* Stats */}
      <StatsCounter stats={stats} />

      {/* Values */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Our"
              bottomText="Values"
              description="The principles that guide every project we undertake."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 100}>
                <div className="bg-white p-8 md:p-10 rounded-sm border border-tan/20 hover:shadow-lg transition-shadow duration-500">
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

      {/* Team */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader
              topText="Meet"
              bottomText="The Team"
              description="The skilled professionals who bring your vision to life."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="text-center group">
                  <div className="w-40 h-40 mx-auto rounded-full concrete-texture-light shadow-md group-hover:shadow-xl transition-shadow duration-500 flex items-center justify-center">
                    <span className="text-4xl text-brown/40">&#9679;</span>
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
