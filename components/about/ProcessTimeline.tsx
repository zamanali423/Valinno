"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/lib/data";
import { EASE } from "@/lib/animations";

export default function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={ref} className="relative mx-auto max-w-4xl">
      {/* Track */}
      <div
        aria-hidden="true"
        className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2"
      />
      {/* Animated fill */}
      <motion.div
        aria-hidden="true"
        style={{ scaleY: lineScale }}
        className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-electric via-violet to-fuchsia sm:left-1/2 sm:-translate-x-1/2"
      />

      {processSteps.map((step, i) => {
        const onLeft = i % 2 === 0;
        return (
          <li key={step.step} className="relative pb-14 pl-14 last:pb-0 sm:pl-0 sm:pb-16">
            {/* Node */}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute left-4 top-0 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-electric/40 bg-surface font-display text-xs font-bold text-white shadow-glow sm:left-1/2"
            >
              {step.step}
            </motion.span>

            {/* Card */}
            <div className={onLeft ? "sm:pr-[calc(50%+3rem)]" : "sm:pl-[calc(50%+3rem)]"}>
              <motion.div
                initial={{ opacity: 0, y: 28, x: onLeft ? -16 : 16 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="gradient-border rounded-2xl border border-white/10 bg-surface/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:p-7"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                  {step.description}
                </p>
              </motion.div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
