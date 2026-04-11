"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface DesignShowcaseProps {
  images?: { src: string; label: string }[];
  gridSize?: number;
  intervalMs?: number;
}

const defaultDesigns = [
  { src: "", label: "Ashlar Slate" },
  { src: "", label: "Cobblestone" },
  { src: "", label: "Herringbone Brick" },
  { src: "", label: "Roman Slate" },
  { src: "", label: "Wood Plank" },
];

const textureGradients = [
  "linear-gradient(135deg, #A0845C 0%, #C4A97D 25%, #8B7355 50%, #D2B48C 75%, #A0845C 100%)",
  "linear-gradient(135deg, #7A6347 0%, #A88B6A 25%, #6B5740 50%, #C4A97D 75%, #7A6347 100%)",
  "linear-gradient(135deg, #C67B4F 0%, #D4956B 25%, #A8603A 50%, #E8B090 75%, #C67B4F 100%)",
  "linear-gradient(135deg, #8B8B8B 0%, #A8A8A8 25%, #6B6B6B 50%, #C8C8C8 75%, #8B8B8B 100%)",
  "linear-gradient(135deg, #6B5740 0%, #8B7355 25%, #4A3C2D 50%, #A0845C 75%, #6B5740 100%)",
];

export default function DesignShowcase({
  images,
  gridSize: rawGridSize = 16,
  intervalMs = 4000,
}: DesignShowcaseProps) {
  const gridSize = Math.max(rawGridSize, 2);
  const designs = images && images.length > 0 ? images : defaultDesigns;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const maxDiag = gridSize - 1 + (gridSize - 1);

  const doTransition = useCallback(
    (to: number) => {
      if (transitioning) return;
      setNextIndex(to);
      setTransitioning(true);

      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        setCurrentIndex(to);
        setTransitioning(false);
      }, maxDiag * 30 + 500);
    },
    [transitioning, maxDiag]
  );

  const startTransition = useCallback(() => {
    const next = (currentIndex + 1) % designs.length;
    doTransition(next);
  }, [currentIndex, designs.length, doTransition]);

  useEffect(() => {
    const timer = setInterval(startTransition, intervalMs);
    return () => clearInterval(timer);
  }, [startTransition, intervalMs]);

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  const getBackground = (index: number) => {
    const design = designs[index];
    if (design.src) {
      return `url(${design.src})`;
    }
    return textureGradients[index % textureGradients.length];
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] overflow-hidden rounded-sm shadow-2xl">
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            const diag = gridSize - 1 - col + row;
            const delay = diag * 30;
            const colPct = (col / (gridSize - 1)) * 100;
            const rowPct = (row / (gridSize - 1)) * 100;

            return (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{ clipPath: "circle(55%)" }}
              >
                <div
                  className="absolute inset-0 transition-opacity"
                  style={{
                    backgroundImage: getBackground(currentIndex),
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${colPct}% ${rowPct}%`,
                    backgroundRepeat: "no-repeat",
                    opacity: transitioning ? 0 : 1,
                    transitionDuration: "400ms",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDelay: transitioning ? `${delay}ms` : "0ms",
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity"
                  style={{
                    backgroundImage: getBackground(nextIndex),
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${colPct}% ${rowPct}%`,
                    backgroundRepeat: "no-repeat",
                    opacity: transitioning ? 1 : 0,
                    transitionDuration: "400ms",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDelay: transitioning ? `${delay}ms` : "0ms",
                  }}
                />
                <div
                  className="absolute inset-0 transition-transform"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                    transform: transitioning ? "scale(1)" : "scale(0)",
                    transitionDuration: "500ms",
                    transitionDelay: transitioning ? `${delay}ms` : "0ms",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6 pointer-events-none">
          <p className="text-cream text-lg md:text-xl font-bold uppercase tracking-wider">
            {designs[transitioning ? nextIndex : currentIndex].label}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6" role="tablist" aria-label="Design patterns">
        {designs.map((design, i) => (
          <button
            key={i}
            onClick={() => {
              if (i !== currentIndex) doTransition(i);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === (transitioning ? nextIndex : currentIndex)
                ? "bg-terracotta scale-125"
                : "bg-brown/30 hover:bg-brown/50"
            }`}
            role="tab"
            aria-selected={i === (transitioning ? nextIndex : currentIndex)}
            aria-label={`Show ${design.label} pattern`}
          />
        ))}
      </div>
    </div>
  );
}
