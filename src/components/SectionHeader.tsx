interface SectionHeaderProps {
  topText: string;
  bottomText: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({
  topText,
  bottomText,
  description,
  light = false,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const topClass = light ? "text-neutral-400" : "text-neutral-500";
  const descClass = light ? "text-cream" : "text-warm-gray";
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
        ? "text-right items-end"
        : "text-left items-start";

  const descAlign =
    align === "center"
      ? "mx-auto"
      : align === "right"
        ? "ml-auto"
        : "";

  return (
    <div className={`w-full flex flex-col ${alignClass} ${className}`}>
      <div className="leading-[0.85]">
        <span
          className={`block text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase ${topClass}`}
        >
          {topText}
        </span>
        <span
          className={`block text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase -mt-3 md:-mt-5 lg:-mt-7 ${
            light ? "text-cream" : "text-charcoal"
          }`}
        >
          {bottomText}
        </span>
      </div>
      {description && (
        <p
          className={`mt-6 md:mt-8 text-base md:text-lg max-w-2xl leading-relaxed ${descAlign} ${descClass}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}