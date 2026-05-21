"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function subscribeToScrollPosition(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("resize", onStoreChange);
  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

function getPastHeroScrollSnapshot() {
  return window.scrollY > window.innerHeight * 0.1;
}

function getServerPastHeroScrollSnapshot() {
  return false;
}

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState<{
    isOpen: boolean;
    pathname: string | null;
  }>({ isOpen: false, pathname: null });
  const pathname = usePathname();
  const scrolledPastHero = useSyncExternalStore(
    subscribeToScrollPosition,
    getPastHeroScrollSnapshot,
    getServerPastHeroScrollSnapshot
  );

  const isHome = pathname === "/";
  const pastHero = !isHome || scrolledPastHero;
  const mobileOpen = mobileMenu.isOpen && mobileMenu.pathname === pathname;
  const toggleMobileMenu = () => {
    setMobileMenu((current) => ({
      isOpen: !(current.isOpen && current.pathname === pathname),
      pathname,
    }));
  };
  const closeMobileMenu = () => {
    setMobileMenu({ isOpen: false, pathname });
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop: fixed right sidebar */}
      <aside
        className={`hidden lg:flex fixed top-0 right-0 h-screen w-44 z-50 flex-col bg-slate transition-transform duration-500 ${pastHero ? "translate-x-0" : "translate-x-full"}`}
        style={{ fontFamily: "'Courages', sans-serif" }}
      >
        <div className="flex h-full w-44 flex-col items-center justify-evenly ml-auto">
          <Link
            href="/"
            className="text-cream font-black text-2xl uppercase tracking-widest"
          >
            {siteConfig.businessName.split(" ").map(w => w[0]).join("")}
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-black uppercase tracking-widest transition-all duration-300 px-3 py-2 rounded-sm text-center ${
                isActive(link.href)
                  ? "text-terracotta"
                  : "text-cream hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="px-5 py-3 bg-terracotta text-white text-sm font-black uppercase tracking-widest rounded-sm hover:bg-terracotta-dark transition-colors duration-300 text-center"
          >
            Quote
          </Link>
        </div>
      </aside>

      {/* Mobile: top bar + hamburger */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate/95 backdrop-blur-md py-3">
        <div className="px-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-black uppercase tracking-wider text-cream"
          >
            {siteConfig.businessName}
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="flex flex-col justify-center items-center w-10 h-10 p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span
              className={`block w-6 h-0.5 bg-cream transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[3px]" : "-translate-y-[3px]"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-cream transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[3px]" : "translate-y-[3px]"
              }`}
            />
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-5 py-5 flex flex-col gap-4 border-t border-cream/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`text-base uppercase tracking-[0.15em] transition-colors duration-300 font-medium ${
                  isActive(link.href)
                    ? "text-terracotta"
                    : "text-cream hover:text-terracotta"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="mt-2 px-6 py-3 bg-terracotta text-white text-sm font-bold uppercase tracking-wider rounded-sm text-center hover:bg-terracotta-dark transition-colors"
            >
              Free Quote
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
