"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface StatsCounterProps {
  stats: Stat[];
}

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  triggered,
}: Stat & { triggered: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    let rafId: number;
    let cancelled = false;
    const duration = 2000;
    const startTime = performance.now();

    function step(currentTime: number) {
      if (cancelled) return;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [triggered, value]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-black text-terracotta">
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const columnClass =
    stats.length <= 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-3xl justify-items-center"
      : "grid-cols-2 lg:grid-cols-4 max-w-7xl";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-slate py-12 md:py-16">
      <div
        ref={ref}
        className={`mx-auto px-6 grid ${columnClass} gap-10 md:gap-16`}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center w-full">
            <AnimatedNumber {...stat} triggered={triggered} />
            <p className="mt-4 text-sm md:text-base uppercase tracking-[0.2em] text-cream font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}