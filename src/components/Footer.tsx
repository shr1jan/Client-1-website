import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Stamped Patios",
  "Driveways & Walkways",
  "Pool Decks",
  "Interior Floors",
  "Resurfacing",
  "Custom Patterns",
];

export default function Footer() {
  return (
    <footer className="bg-slate text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-wider mb-4">
              {siteConfig.businessName}
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-4 mt-6">
              {Object.entries(siteConfig.social).map(([platform, href]) => (
                <a
                  key={platform}
                  href={href}
                  className="w-10 h-10 rounded-sm bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-terracotta hover:text-white transition-all duration-300 text-xs uppercase font-bold"
                  aria-label={platform}
                >
                  {platform.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cream/40 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-terracotta transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cream/40 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-cream/70 text-sm"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cream/40 mb-6">
              Contact Us
            </h4>
            <div className="space-y-4 text-sm text-cream/70">
              <p>{siteConfig.address}</p>
              <p>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="hover:text-terracotta transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-terracotta transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
              <div className="pt-2 space-y-1 text-cream/50 text-xs">
                <p>{siteConfig.hours.weekdays}</p>
                <p>{siteConfig.hours.saturday}</p>
                <p>{siteConfig.hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/40 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All
            rights reserved.
          </p>
          <p className="text-cream/30 text-xs text-center sm:text-right">
            Premium Decorative Concrete Stamping
          </p>
        </div>
      </div>
    </footer>
  );
}
