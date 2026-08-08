"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services-data";

// Curated order  AI services lead, core disciplines alongside. All 13 are linked.
const footerServiceOrder = [
  "ai-automation",
  "ai-chatbots",
  "generative-ai-content",
  "agentic-ai",
  "web-development",
  "mobile-app-development",
  "cloud-solutions-devops",
  "social-media",
  "ui-ux-design",
  "it-consulting-strategy",
  "erp-systems",
  "csm-systems",
  "crm-systems",
];

/**
 * Footer “Services” column.
 *
 * On mobile the list collapses into an accordion behind the heading (tap to
 * expand); from the `md` breakpoint up it renders as a plain vertical list.
 * Every row deep-links to the service’s own detail page.
 */
export default function FooterServices() {
  const [open, setOpen] = useState(false);

  const ordered = footerServiceOrder
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <nav aria-label="Footer services">
      {/* Accordion toggle  only interactive below md */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="footer-services-list"
        className="group flex w-full items-center justify-between gap-2 text-left md:pointer-events-none"
      >
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
          Services
        </h3>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-ink-faint transition-transform duration-300 md:hidden",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id="footer-services-list"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          "md:grid-rows-[1fr]"
        )}
      >
        <ul className="mt-5 space-y-3 overflow-hidden">
          {ordered.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group/link inline-flex items-center gap-1 text-sm text-ink-muted transition-colors duration-300 hover:text-white"
              >
                {service.title}
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
