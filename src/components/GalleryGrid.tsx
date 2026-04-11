"use client";

import { useEffect, useState } from "react";

interface GalleryItem {
  id: number;
  category: string;
  label: string;
  gradient: string;
}

const categories = [
  "All",
  "Patios",
  "Driveways",
  "Pool Decks",
  "Interiors",
  "Walkways",
];

const galleryItems: GalleryItem[] = [
  { id: 1, category: "Patios", label: "Ashlar Slate Patio", gradient: "linear-gradient(135deg, #A0845C, #C4A97D, #8B7355)" },
  { id: 2, category: "Patios", label: "Flagstone Patio", gradient: "linear-gradient(135deg, #7A6347, #A88B6A, #6B5740)" },
  { id: 3, category: "Driveways", label: "Cobblestone Driveway", gradient: "linear-gradient(135deg, #8B8B8B, #A8A8A8, #6B6B6B)" },
  { id: 4, category: "Driveways", label: "Brick Pattern Driveway", gradient: "linear-gradient(135deg, #C67B4F, #D4956B, #A8603A)" },
  { id: 5, category: "Pool Decks", label: "Travertine Pool Deck", gradient: "linear-gradient(135deg, #D2B48C, #E8D5B7, #C4A97D)" },
  { id: 6, category: "Pool Decks", label: "Sandstone Pool Deck", gradient: "linear-gradient(135deg, #C4A97D, #A0845C, #E8D5B7)" },
  { id: 7, category: "Interiors", label: "Wood Plank Interior", gradient: "linear-gradient(135deg, #6B5740, #8B7355, #4A3C2D)" },
  { id: 8, category: "Interiors", label: "Marble Finish Floor", gradient: "linear-gradient(135deg, #E0E0E0, #F5F5F5, #C8C8C8)" },
  { id: 9, category: "Walkways", label: "Herringbone Brick Path", gradient: "linear-gradient(135deg, #C67B4F, #A8603A, #D4956B)" },
  { id: 10, category: "Patios", label: "Roman Slate Patio", gradient: "linear-gradient(135deg, #8B7355, #6B5740, #A0845C)" },
  { id: 11, category: "Walkways", label: "Fieldstone Walkway", gradient: "linear-gradient(135deg, #7A6347, #C4A97D, #6B5740)" },
  { id: 12, category: "Pool Decks", label: "Limestone Pool Deck", gradient: "linear-gradient(135deg, #D2B48C, #A0845C, #F5EDE0)" },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const filtered =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 ${
              filter === cat
                ? "bg-terracotta text-white"
                : "bg-white text-warm-gray border border-tan/30 hover:border-terracotta/50 hover:text-terracotta"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setLightbox(item)}
            className="group relative aspect-[4/3] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer animate-[fadeInUp_0.4s_ease-out_both]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{ background: item.gradient }}
            />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 16px)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-cream font-bold text-sm uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-cream/60 text-xs mt-1">{item.category}</p>
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
            <div
              className="absolute inset-0"
              style={{ background: lightbox.gradient }}
            />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 16px)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-8">
              <p className="text-cream font-bold text-xl uppercase tracking-wider">
                {lightbox.label}
              </p>
              <p className="text-cream/60 text-sm mt-1">
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
