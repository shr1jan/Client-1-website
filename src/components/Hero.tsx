"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import type { GalleryPhoto } from "@/lib/supabasePhotos";

interface HeroProps {
  photos?: GalleryPhoto[];
  initialPhotoIndex?: number;
}

const ROTATION_MS = 6500;
const FADE_MS = 1400;

export default function Hero({ photos = [], initialPhotoIndex = 0 }: HeroProps) {
  const normalizedInitialIndex = photos.length
    ? Math.min(Math.max(initialPhotoIndex, 0), photos.length - 1)
    : 0;
  const [activeIndex, setActiveIndex] = useState(normalizedInitialIndex);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(normalizedInitialIndex);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (photos.length < 2) {
      return;
    }

    const interval = setInterval(() => {
      const currentIndex = activeIndexRef.current;
      let nextIndex = currentIndex;

      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * photos.length);
      }

      setPreviousIndex(currentIndex);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      if (fadeTimer.current) {
        clearTimeout(fadeTimer.current);
      }

      fadeTimer.current = setTimeout(() => {
        setPreviousIndex(null);
      }, FADE_MS);
    }, ROTATION_MS);

    return () => {
      clearInterval(interval);

      if (fadeTimer.current) {
        clearTimeout(fadeTimer.current);
      }
    };
  }, [photos.length]);

  const activePhoto = photos[activeIndex];
  const previousPhoto =
    previousIndex !== null ? photos[previousIndex] : undefined;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden no-sidebar-offset">
      {/* Background */}
      <div className="absolute inset-0 concrete-texture-dark" />

      {previousPhoto && (
        <Image
          key={`previous-${previousPhoto.path}`}
          src={previousPhoto.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-100 scale-105"
          priority
          aria-hidden
        />
      )}

      {activePhoto && (
        <Image
          key={`active-${activePhoto.path}`}
          src={activePhoto.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-100 animate-[heroPhotoReveal_1400ms_ease-out_both]"
          priority
          aria-hidden
        />
      )}

      <div className="absolute inset-0 bg-charcoal/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/35 via-charcoal/20 to-charcoal/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/45 via-transparent to-charcoal/45" />
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light bg-[radial-gradient(circle_at_20%_50%,rgba(57,170,54,0.7)_0%,transparent_45%),radial-gradient(circle_at_80%_20%,rgba(232,213,183,0.5)_0%,transparent_35%)]" />

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
