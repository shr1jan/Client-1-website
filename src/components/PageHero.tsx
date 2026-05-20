"use client";

import type { ReactNode } from "react";

import LineWaves from "./LineWaves";

export default function PageHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-slate" aria-hidden />
      <div className="absolute inset-0">
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.2}
          color1="#ffffff"
          color2="#ffffff"
          color3="#ffffff"
          enableMouseInteraction
          mouseInfluence={2}
        />
      </div>
      {/* Black core behind headline copy, fading to transparent toward edges */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 150% 110% at 50% 48%, rgb(0 0 0) 0%, rgb(0 0 0 / 0.98) 14%, rgb(0 0 0 / 0.78) 30%, rgb(0 0 0 / 0.38) 50%, rgb(0 0 0 / 0.1) 66%, transparent 78%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pointer-events-none">
        {children}
      </div>
    </section>
  );
}