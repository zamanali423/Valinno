"use client";

import { motion } from "framer-motion";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion";
import type { ServiceProcessStep } from "@/types";

/**
 * Horizontal stepper for a service detail page. Mirrors the ProcessFlow
 * visual language (node + connecting line + stagger reveal) but renders
 * the steps tailored to the individual service.
 */
export default function ServiceProcess({ steps }: { steps: ServiceProcessStep[] }) {
  return (
    <div className="relative">
      {/* Connecting line (desktop) */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-6 hidden h-px bg-white/10 lg:block"
      />
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-electric via-violet to-fuchsia lg:block"
      />

      <StaggerGroup
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
        amount={0.2}
      >
        {steps.map((step) => (
          <StaggerItem key={step.step}>
            <div className="group relative text-center lg:pt-16">
              {/* Node */}
              <span className="absolute left-1/2 top-6 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-base bg-electric shadow-glow lg:block" />
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-surface/80 font-display text-sm font-bold text-white transition-all duration-300 group-hover:bg-brand-gradient group-hover:shadow-glow">
                {step.step}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-[13px]">
                {step.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
