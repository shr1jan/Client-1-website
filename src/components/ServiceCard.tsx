interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="group relative bg-white rounded-sm p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-tan/20 hover:border-terracotta/30 overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-terracotta scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="text-3xl md:text-4xl mb-6">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold text-charcoal uppercase tracking-wide mb-3">
        {title}
      </h3>
      <p className="text-warm-gray leading-relaxed text-sm md:text-base flex-1">
        {description}
      </p>
      <div className="mt-8 text-terracotta font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
        Learn More &rarr;
      </div>
    </div>
  );
}
