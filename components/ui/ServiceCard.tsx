"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Service } from "@/types";
import { getServiceIcon } from "@/lib/service-icons";
import { isAiService } from "@/lib/services-data";
import { StaggerItem } from "./motion";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  /** Smaller footprint for related-services rows and footer-style contexts. */
  compact?: boolean;
}

/**
 * Service card with a subtle 3D tilt that follows the cursor. Whole card links
 * to /services/[slug]. Hover: gradient hairline brightens, icon glows, CTA pill
 * fills with the brand gradient and the arrow slides.
 */
export default function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 220, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const Icon = getServiceIcon(service.slug);
  const isAI = isAiService(service.slug);

  return (
    <StaggerItem className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="gradient-border group relative h-full"
      >
        <Link
          href={`/services/${service.slug}`}
          aria-label={`Learn more about ${service.title}`}
          className={cn(
            "relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:shadow-[0_0_0_1px_rgba(79,124,255,0.25),0_24px_48px_-24px_rgba(0,0,0,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric",
            compact ? "p-5" : "p-7 sm:p-8"
          )}
        >
          {/* Top gradient accent hairline */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-electric/0 via-electric/80 to-fuchsia/0 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Icon with glow blob */}
          <div className={cn("relative", compact ? "mb-5" : "mb-6")}>
            <span
              aria-hidden="true"
              className="absolute -inset-2.5 rounded-full bg-brand-gradient opacity-25 blur-xl transition-opacity duration-500 group-hover:opacity-50"
            />
            <div
              className={cn(
                "relative grid place-items-center rounded-2xl bg-brand-gradient shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                compact ? "h-11 w-11" : "h-14 w-14"
              )}
            >
              <Icon
                className={cn("text-white", compact ? "h-5 w-5" : "h-7 w-7")}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* AI badge */}
          {isAI && !compact && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-electric/40 bg-electric/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-electric-bright backdrop-blur-sm">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              AI
            </span>
          )}

          <h3
            className={cn(
              "font-display font-semibold tracking-tight text-white",
              compact ? "text-base" : "text-xl"
            )}
          >
            {service.title}
          </h3>

          {!compact && (
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{service.short}</p>
          )}

          {/* CTA pill  fills with the brand gradient on hover (always visible on touch) */}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 self-start rounded-full border border-electric/40 bg-electric/[0.08] font-semibold text-electric-bright transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow",
              compact ? "mt-auto px-3 py-1 text-[10px]" : "mt-6 px-3.5 py-1.5 text-xs"
            )}
          >
            Learn More
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </Link>
      </motion.div>
    </StaggerItem>
  );
}
