"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-white/[0.06] bg-base/80 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4 sm:h-20" aria-label="Main navigation">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {siteConfig.navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={!link.href.startsWith("/#") && active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    active ? "text-white" : "text-ink-muted hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-white md:flex"
          >
            <Phone className="h-4 w-4 text-electric-bright" aria-hidden="true" />
            {siteConfig.phone}
          </a>

          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-violet sm:inline-flex"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            id="mobile-menu"
            className="overflow-hidden border-t border-white/[0.06] bg-base/95 backdrop-blur-2xl lg:hidden"
          >
            <ul className="container-px flex flex-col gap-1 py-6">
              {siteConfig.navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    aria-current={!link.href.startsWith("/#") && isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-white/[0.06] text-white"
                        : "text-ink-muted hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 opacity-40" aria-hidden="true" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
                className="mt-3"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3.5 text-base font-semibold text-white shadow-glow"
                >
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-ink-muted"
                >
                  <Phone className="h-4 w-4 text-electric-bright" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
