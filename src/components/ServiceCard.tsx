import type { ReactNode } from "react";

interface ServiceCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  /** Tighter padding, no min-height stretch — for dense grids */
  compact?: boolean;
}

export default function ServiceCard({
  icon,
  title,
  description,
  compact = false,
}: ServiceCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 border border-tan/20 hover:border-terracotta/30 overflow-hidden flex flex-col ${
        compact
          ? "p-5 md:p-6"
          : "p-8 md:p-10 h-full"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-terracotta scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      {icon ? <div className="mb-6 [&_svg]:block">{icon}</div> : null}
      <h3
        className={`text-lg md:text-xl font-bold text-charcoal uppercase tracking-wide ${
          compact ? "mb-2" : "mb-3"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-warm-gray text-sm md:text-base ${
          compact ? "leading-snug" : "leading-relaxed flex-1"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
