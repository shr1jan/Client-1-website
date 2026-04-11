"use client";

interface MarqueeProps {
  text: string;
  separator?: string;
  className?: string;
}

export default function Marquee({
  text,
  separator = " / ",
  className = "",
}: MarqueeProps) {
  const repeated = Array(12)
    .fill(`${text}${separator}`)
    .join("");

  return (
    <div
      className={`overflow-hidden whitespace-nowrap bg-charcoal text-cream py-5 md:py-6 select-none ${className}`}
    >
      <div className="animate-marquee inline-block will-change-transform">
        <span className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
          {repeated}
        </span>
        <span className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
          {repeated}
        </span>
      </div>
    </div>
  );
}
