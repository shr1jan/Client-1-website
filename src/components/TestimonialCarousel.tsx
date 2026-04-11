"use client";

import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    name: "John D.",
    role: "Homeowner",
    text: "Absolutely transformed our backyard patio. The stamped concrete looks like real stone and everyone who visits compliments it. Professional team from start to finish.",
  },
  {
    name: "Sarah M.",
    role: "Property Manager",
    text: "We hired them for a large commercial pool deck project. The quality of work exceeded our expectations and they finished ahead of schedule. Highly recommend.",
  },
  {
    name: "Mike R.",
    role: "Homeowner",
    text: "Our driveway went from plain gray concrete to a beautiful cobblestone pattern. The attention to detail in the coloring and texturing is remarkable.",
  },
  {
    name: "Lisa K.",
    role: "Business Owner",
    text: "They resurfaced our restaurant patio with a gorgeous slate pattern. Our customers love the new look. Great value for premium quality work.",
  },
  {
    name: "David & Amy T.",
    role: "Homeowners",
    text: "From design consultation to final sealing, the entire process was seamless. Our new walkway and front entry are the highlight of our home's curb appeal.",
  },
];

export default function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory flex gap-6 md:gap-8 scrollbar-hide"
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="snap-start shrink-0 w-[85vw] sm:w-[360px] md:w-[400px] bg-white rounded-sm p-8 md:p-10 shadow-sm border border-tan/20 flex flex-col"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-terracotta text-lg">
                  &#9733;
                </span>
              ))}
            </div>
            <p className="text-warm-gray leading-relaxed text-sm italic flex-1">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="mt-8 pt-6 border-t border-tan/20">
              <p className="font-bold text-charcoal">{t.name}</p>
              <p className="text-warm-gray-light text-sm">{t.role}</p>
            </div>
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/80 text-cream flex items-center justify-center shadow-lg hover:bg-terracotta transition-colors duration-300 -ml-1 z-10"
          aria-label="Scroll testimonials left"
        >
          &#8592;
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/80 text-cream flex items-center justify-center shadow-lg hover:bg-terracotta transition-colors duration-300 -mr-1 z-10"
          aria-label="Scroll testimonials right"
        >
          &#8594;
        </button>
      )}
    </div>
  );
}
