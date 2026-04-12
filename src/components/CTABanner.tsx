import Link from "next/link";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
}

export default function CTABanner({
  title = "Ready to Transform Your Space?",
  subtitle = "Get a free consultation and quote for your project today.",
  buttonText = "Get a Free Quote",
  href = "/contact",
}: CTABannerProps) {
  const isExternal =
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http");

  const buttonClass =
    "inline-block mt-10 px-10 py-4 bg-white text-terracotta font-bold text-base rounded-sm uppercase tracking-wider hover:bg-cream transition-colors duration-300";

  return (
    <section className="bg-terracotta relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-14 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
          {title}
        </h2>
        <p className="mt-5 text-base md:text-lg text-white max-w-2xl mx-auto">
          {subtitle}
        </p>
        {isExternal ? (
          <a href={href} className={buttonClass}>
            {buttonText}
          </a>
        ) : (
          <Link href={href} className={buttonClass}>
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
