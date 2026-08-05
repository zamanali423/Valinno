"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { getServiceIcon } from "@/lib/service-icons";
import { StaggerItem } from "./motion";

/** Service card with a subtle 3D tilt that follows the cursor. */
export default function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 220, damping: 20 });

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

  return (
    <StaggerItem className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.02 }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="gradient-border group relative h-full"
      >
        <Link
          href="/services"
          className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:shadow-card sm:p-8"
        >
          {/* Icon */}
          <div className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-7 w-7 text-white" aria-hidden="true" />
          </div>

          <h3 className="font-display text-xl font-semibold tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{service.short}</p>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-bright transition-colors group-hover:text-white">
            Learn more
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      </motion.div>
    </StaggerItem>
  );
}
