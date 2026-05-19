"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryPhoto } from "@/lib/supabasePhotos";

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  if (!photos.length) {
    return (
      <div className="border border-warm-gray/20 bg-cream-dark/40 px-6 py-12 text-center">
        <p className="text-charcoal font-bold uppercase tracking-wider">
          No gallery photos found
        </p>
        <p className="text-warm-gray mt-3">
          Add image files to the Supabase photos bucket and they will appear
          here automatically.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {photos.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightbox(item)}
            className="group relative aspect-[4/3] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer animate-[fadeInUp_0.4s_ease-out_both]"
            style={{ animationDelay: `${i * 60}ms` }}
            aria-label={`View ${item.label}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority={i < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-cream font-bold text-sm uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-cream text-xs mt-1">{item.category}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.label}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full aspect-[4/3] rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-8">
              <p className="text-cream font-bold text-xl uppercase tracking-wider">
                {lightbox.label}
              </p>
              <p className="text-cream text-sm mt-1">
                {lightbox.category}
              </p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-charcoal/50 text-cream rounded-full flex items-center justify-center hover:bg-terracotta transition-colors text-xl"
              aria-label="Close lightbox"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
