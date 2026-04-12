import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden no-sidebar-offset">
      {/* Background */}
      <div className="absolute inset-0 concrete-texture-dark" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(198,123,79,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,115,85,0.2) 0%, transparent 40%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, transparent 0% 50%)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center py-32 md:py-40">
        <p className="text-terracotta text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-8">
          {siteConfig.tagline}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-cream uppercase leading-[0.9] tracking-tight">
          Crafting
          <br />
          <span className="text-terracotta">Beautiful</span>
          <br />
          Surfaces
        </h1>
        <p className="mt-10 text-base md:text-lg text-cream max-w-xl mx-auto leading-relaxed">
          {siteConfig.description}
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-terracotta text-white font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-terracotta-dark transition-colors duration-300"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/gallery"
            className="px-8 py-3.5 border-2 border-cream/30 text-cream font-bold text-sm uppercase tracking-wider rounded-sm hover:border-terracotta hover:text-terracotta transition-colors duration-300"
          >
            View Our Work
          </Link>
        </div>
      </div>

      {/* Scroll indicator: mouse on desktop, hand swipe on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        {/* Desktop */}
        <div className="hidden md:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-cream text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-cream/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-cream/50 animate-[scrollDot_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
        {/* Mobile: stroke finger swipe up */}
        <div className="flex md:hidden flex-col items-center gap-2 animate-[swipeUp_1.5s_ease-in-out_infinite]">
          <span className="text-cream text-[10px] uppercase tracking-[0.2em] font-medium">Swipe</span>
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8V2M10 2L7 5M10 2l3 3" stroke="rgba(255,248,240,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="17" r="7" stroke="rgba(255,248,240,0.3)" strokeWidth="1.5"/>
            <circle cx="10" cy="17" r="2" stroke="rgba(255,248,240,0.3)" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-charcoal/20" />
    </section>
  );
}
