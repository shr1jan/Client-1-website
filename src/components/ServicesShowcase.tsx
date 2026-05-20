import Image from "next/image";
import Link from "next/link";

import {
  featuredServices,
  serviceApplications,
} from "@/config/services";

const serviceApplicationItemClass =
  "group block shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]";

interface ServicesShowcaseProps {
  applicationHref?: string;
}

export default function ServicesShowcase({
  applicationHref,
}: ServicesShowcaseProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
        {featuredServices.map((service) => (
          <article
            key={service.title}
            className="group overflow-hidden rounded-sm bg-white border border-tan/20 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] bg-tan overflow-hidden">
              <Image
                src={service.imageSrc}
                alt={service.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black text-charcoal uppercase tracking-wide">
                {service.title}
              </h3>
              <p className="mt-4 text-sm md:text-base text-warm-gray leading-relaxed">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {serviceApplications.map((service) => {
          const inner = (
            <>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-tan shadow-md">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p
                className={`mt-4 text-center font-bold text-charcoal uppercase tracking-wider text-xs md:text-sm${
                  applicationHref
                    ? " group-hover:text-terracotta transition-colors"
                    : ""
                }`}
              >
                {service.title}
              </p>
            </>
          );

          if (applicationHref) {
            return (
              <Link
                key={service.title}
                href={applicationHref}
                className={serviceApplicationItemClass}
              >
                {inner}
              </Link>
            );
          }

          return (
            <div key={service.title} className={serviceApplicationItemClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </>
  );
}
