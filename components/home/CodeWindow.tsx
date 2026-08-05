"use client";

import { motion } from "framer-motion";
import { scaleIn, EASE } from "@/lib/animations";

const lines: { text: string; className: string; delay: number }[] = [
  { text: "import { Velinno } from \"@studio/agency\"", className: "text-electric-bright", delay: 0.45 },
  { text: "", className: "", delay: 0.55 },
  { text: "const product = new Velinno({", className: "text-ink-muted", delay: 0.65 },
  { text: "  client:   { type: \"ambitious\", scale: \"startup → enterprise\" },", className: "text-ink", delay: 0.78 },
  { text: "  services: [\"web\", \"mobile\", \"cloud\", \"design\"],", className: "text-ink", delay: 0.9 },
  { text: "  quality:  { performance: 100, security: \"hardened\" },", className: "text-ink", delay: 1.02 },
  { text: "  timeline: { onBudget: true, onTime: true },", className: "text-ink", delay: 1.14 },
  { text: "});", className: "text-ink-muted", delay: 1.26 },
  { text: "", className: "", delay: 1.34 },
  { text: "await product.ship(); // 🚀", className: "text-emerald-400", delay: 1.44 },
];

/** Decorated code-editor window used in the hero illustration. */
export default function CodeWindow() {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      className="relative"
    >
      {/* Glow behind the window */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-3xl bg-brand-gradient opacity-25 blur-2xl"
      />

      <div className="gradient-border relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a101f]/95 shadow-card backdrop-blur-xl">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs font-medium text-ink-faint">velinno — product.tsx</span>
          <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            deploy ready
          </span>
        </div>

        {/* Code lines */}
        <div className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 sm:text-[13.5px]">
          {lines.map((line, i) =>
            line.text === "" ? (
              <div key={i} className="h-7" />
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.35, ease: EASE }}
                className="whitespace-pre"
              >
                <span className="mr-4 select-none text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={line.className}>{line.text}</span>
              </motion.div>
            )
          )}
          {/* Blinking cursor */}
          <div className="flex items-center">
            <span className="mr-4 select-none text-white/20">11</span>
            <span className="inline-block h-4 w-2 animate-blink bg-electric" />
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.5, ease: EASE }}
        className="absolute -left-4 -top-5 animate-float rounded-xl border border-white/10 bg-surface/90 px-4 py-2.5 backdrop-blur-lg sm:-left-8"
      >
        <p className="text-[10px] uppercase tracking-widest text-ink-faint">Performance</p>
        <p className="font-display text-lg font-semibold text-white">100<span className="text-electric-bright">/100</span></p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.5, ease: EASE }}
        className="absolute -bottom-5 -right-3 animate-float-slow rounded-xl border border-white/10 bg-surface/90 px-4 py-2.5 backdrop-blur-lg sm:-right-6"
      >
        <p className="text-[10px] uppercase tracking-widest text-ink-faint">Uptime</p>
        <p className="font-display text-lg font-semibold text-white">99.9<span className="text-emerald-400">%</span></p>
      </motion.div>
    </motion.div>
  );
}
