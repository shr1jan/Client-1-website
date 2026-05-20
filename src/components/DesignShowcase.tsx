"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DesignShowcaseProps {
  images?: { src: string; label: string }[];
  intervalMs?: number;
  /** Three side-by-side panes showing consecutive patterns (no duplicates). Needs at least 3 images. */
  columns?: 1 | 3;
}

const TRANSITION_MS = 700;

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
  "linear-gradient(135deg, #39aa36 0%, #63c560 25%, #2e8f2b 50%, #98d996 75%, #39aa36 100%)",
  "linear-gradient(135deg, #8B8B8B 0%, #A8A8A8 25%, #6B6B6B 50%, #C8C8C8 75%, #8B8B8B 100%)",
  "linear-gradient(135deg, #6B5740 0%, #8B7355 25%, #4A3C2D 50%, #A0845C 75%, #6B5740 100%)",
];

function paneIndex(base: number, col: number, len: number) {
  return ((base + col) % len + len) % len;
}

/** Indices shown when the left column starts at `base`. */
function indicesForBase(base: number, len: number, paneCount: number): Set<number> {
  const s = new Set<number>();
  for (let c = 0; c < paneCount; c++) {
    s.add(paneIndex(base, c, len));
  }
  return s;
}

/** True if the two panes sets share no design (next slide never repeats any current image). */
function basesDisjoint(
  baseA: number,
  baseB: number,
  len: number,
  paneCount: number
): boolean {
  const a = indicesForBase(baseA, len, paneCount);
  const b = indicesForBase(baseB, len, paneCount);
  for (const x of b) {
    if (a.has(x)) return false;
  }
  return true;
}

/** Smallest positive offset from `fromBase` whose triple is disjoint (auto-advance). */
function findNextDisjointBase(
  fromBase: number,
  len: number,
  paneCount: number
): number | null {
  for (let offset = 1; offset < len; offset++) {
    const candidate = (fromBase + offset) % len;
    if (basesDisjoint(fromBase, candidate, len, paneCount)) {
      return candidate;
    }
  }
  return null;
}

/** Largest negative offset from `fromBase` whose panes are disjoint (previous arrow). */
function findPreviousDisjointBase(
  fromBase: number,
  len: number,
  paneCount: number
): number | null {
  for (let offset = 1; offset < len; offset++) {
    const candidate = (fromBase - offset + len) % len;
    if (basesDisjoint(fromBase, candidate, len, paneCount)) {
      return candidate;
    }
  }
  return null;
}

/** First disjoint base scanning from `preferred` (dot clicks). */
function findDisjointBasePreferring(
  fromBase: number,
  preferred: number,
  len: number,
  paneCount: number
): number {
  const start = ((preferred % len) + len) % len;
  for (let i = 0; i < len; i++) {
    const candidate = (start + i) % len;
    if (basesDisjoint(fromBase, candidate, len, paneCount)) {
      return candidate;
    }
  }
  return (fromBase + 1) % len;
}

export default function DesignShowcase({
  images,
  intervalMs = 4000,
  columns = 1,
}: DesignShowcaseProps) {
  const designs = images && images.length > 0 ? images : defaultDesigns;
  const len = designs.length;
  const [isDesktopThreePane, setIsDesktopThreePane] = useState(false);
  const paneCount = columns === 3 && len >= 3 && isDesktopThreePane ? 3 : 1;

  const [baseIndex, setBaseIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [fromBase, setFromBase] = useState(0);
  const [toBase, setToBase] = useState(0);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const doTransition = useCallback(
    (targetBase: number) => {
      if (transitioning) return;
      const normalized = ((targetBase % len) + len) % len;
      if (normalized === baseIndex) return;
      setFromBase(baseIndex);
      setToBase(normalized);
      setTransitioning(true);

      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        setBaseIndex(normalized);
        setTransitioning(false);
      }, TRANSITION_MS);
    },
    [transitioning, baseIndex, len]
  );

  const startTransition = useCallback(() => {
    const next =
      findNextDisjointBase(baseIndex, len, paneCount) ??
      (baseIndex + 1) % len;
    if (next !== baseIndex) doTransition(next);
  }, [baseIndex, len, paneCount, doTransition]);

  const moveDesigns = useCallback(
    (direction: "previous" | "next") => {
      const next =
        direction === "next"
          ? findNextDisjointBase(baseIndex, len, paneCount)
          : findPreviousDisjointBase(baseIndex, len, paneCount);
      const fallback =
        direction === "next"
          ? (baseIndex + 1) % len
          : (baseIndex - 1 + len) % len;

      doTransition(next ?? fallback);
    },
    [baseIndex, len, paneCount, doTransition]
  );

  useEffect(() => {
    const timer = setInterval(startTransition, intervalMs);
    return () => clearInterval(timer);
  }, [startTransition, intervalMs]);

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (columns !== 3 || len < 3) {
      setIsDesktopThreePane(false);
      return;
    }

    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktopThreePane(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [columns, len]);

  const cols = Array.from({ length: paneCount }, (_, i) => i);

  const paneClass =
    paneCount === 3
      ? "relative aspect-square w-full min-w-0"
      : "relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]";

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => moveDesigns("previous")}
          className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-green-700/90 text-cream shadow-lg transition-colors duration-300 hover:bg-green-600 disabled:opacity-40"
          aria-label="Show previous design patterns"
          disabled={len < 2}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div
          className={
            paneCount === 3
              ? "grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-14 w-full max-w-5xl mx-auto"
              : "flex flex-col items-center px-14"
          }
        >
          {cols.map((col) => {
            const settledIdx = paneIndex(baseIndex, col, len);
            const fromIdx = paneIndex(fromBase, col, len);
            const toIdx = paneIndex(toBase, col, len);
            const showIdx = transitioning ? toIdx : settledIdx;
            const label = designs[showIdx].label;
            const backIdx = transitioning ? fromIdx : settledIdx;
            const frontIdx = transitioning ? toIdx : settledIdx;
            const backDesign = designs[backIdx];
            const frontDesign = designs[frontIdx];

            return (
              <div
                key={col}
                className={`${paneClass} overflow-hidden rounded-sm shadow-2xl shrink-0 bg-tan`}
              >
                {backDesign.src ? (
                  <Image
                    src={backDesign.src}
                    alt=""
                    fill
                    sizes={
                      paneCount === 3
                        ? "(min-width: 1024px) 33vw, 90vw"
                        : "(min-width: 768px) 480px, 90vw"
                    }
                    className="object-cover transition-opacity ease-out"
                    style={{
                      opacity: transitioning ? 0 : 1,
                      transitionDuration: `${TRANSITION_MS}ms`,
                    }}
                    aria-hidden
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-opacity ease-out"
                    style={{
                      background: textureGradients[
                        backIdx % textureGradients.length
                      ],
                      opacity: transitioning ? 0 : 1,
                      transitionDuration: `${TRANSITION_MS}ms`,
                    }}
                  />
                )}

                {frontDesign.src ? (
                  <Image
                    src={frontDesign.src}
                    alt=""
                    fill
                    sizes={
                      paneCount === 3
                        ? "(min-width: 1024px) 33vw, 90vw"
                        : "(min-width: 768px) 480px, 90vw"
                    }
                    className="object-cover transition-opacity ease-out"
                    style={{
                      opacity: transitioning ? 1 : 0,
                      transitionDuration: `${TRANSITION_MS}ms`,
                    }}
                    aria-hidden
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-opacity ease-out pointer-events-none"
                    style={{
                      background: textureGradients[
                        frontIdx % textureGradients.length
                      ],
                      opacity: transitioning ? 1 : 0,
                      transitionDuration: `${TRANSITION_MS}ms`,
                    }}
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4 md:p-5 pointer-events-none">
                  <p className="text-cream text-base md:text-lg font-bold uppercase tracking-wider">
                    {label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => moveDesigns("next")}
          className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-green-700/90 text-cream shadow-lg transition-colors duration-300 hover:bg-green-600 disabled:opacity-40"
          aria-label="Show next design patterns"
          disabled={len < 2}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 max-w-3xl"
        role="tablist"
        aria-label="Design patterns"
      >
        {designs.map((design, i) => (
          <button
            key={i}
            onClick={() => {
              const target = findDisjointBasePreferring(
                baseIndex,
                i,
                len,
                paneCount
              );
              if (target !== baseIndex) doTransition(target);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 shrink-0 ${
              i === (transitioning ? toBase : baseIndex)
                ? "bg-terracotta scale-125"
                : "bg-brown/30 hover:bg-brown/50"
            }`}
            role="tab"
            aria-selected={i === (transitioning ? toBase : baseIndex)}
            aria-label={
              paneCount === 3
                ? `Show patterns starting with ${design.label}`
                : `Show ${design.label} pattern`
            }
          />
        ))}
      </div>
    </div>
  );
}