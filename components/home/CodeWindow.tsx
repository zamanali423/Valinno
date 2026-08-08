"use client";

import { motion } from "framer-motion";
import { scaleIn, EASE } from "@/lib/animations";
import { services, isAiService } from "@/lib/services-data";
import type { Service } from "@/types";

/**
 * Hand-picked lineup for the hero window  the services Velinno leads with.
 * AI first (the flagship layer), then the core full-stack build. Each slug
 * matches a real /services/[slug] route.
 */
const heroServiceSlugs = [
  "ai-automation",
  "ai-chatbots",
  "web-development",
  "mobile-app-development",
  "cloud-solutions-devops",
  "ai-powered-applications", // flagship custom-AI builds
];

const heroServices: Service[] = heroServiceSlugs
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is Service => Boolean(s));

// The remaining services collapse into a muted comment at the end of the row.
const hiddenCount = services.length - heroServices.length;

type CodeLine =
  | { type: "code"; text: string; className: string; delay: number }
  | { type: "services-row"; delay: number };

// Services render as ONE wrapping row: `services: [ "a", "b", … ], // … +N more`.
const servicesRowDelay = 0.88;
// Tail delays cascade off the last slug in the row  tight, no dead air.
const tailStart = servicesRowDelay + heroServices.length * 0.06 + 0.06;

const lines: CodeLine[] = [
  { type: "code", text: "import { Velinno } from \"@studio/agency\"", className: "text-electric-bright", delay: 0.45 },
  { type: "code", text: "", className: "", delay: 0.55 },
  { type: "code", text: "const product = new Velinno({", className: "text-ink-muted", delay: 0.65 },
  { type: "code", text: "  client:   { type: \"ambitious\", scale: \"startup → enterprise\" },", className: "text-ink", delay: 0.78 },
  { type: "services-row", delay: servicesRowDelay },
  // AI stack block  the flagship layer on top of the full-stack core.
  { type: "code", text: "  ai: {", className: "text-electric-bright", delay: tailStart + 0.06 },
  { type: "code", text: "    models:     [\"openai\", \"anthropic\", \"fine-tuned\"],", className: "text-electric-bright", delay: tailStart + 0.12 },
  { type: "code", text: "    rag:        { enabled: true, search: \"vector\" },", className: "text-electric-bright", delay: tailStart + 0.18 },
  { type: "code", text: "    guardrails: true,", className: "text-electric-bright", delay: tailStart + 0.24 },
  { type: "code", text: "  },", className: "text-electric-bright", delay: tailStart + 0.3 },
  { type: "code", text: "  quality:  { performance: 100, security: \"hardened\" },", className: "text-ink", delay: tailStart + 0.38 },
  { type: "code", text: "  timeline: { onBudget: true, onTime: true },", className: "text-ink", delay: tailStart + 0.46 },
  { type: "code", text: "});", className: "text-ink-muted", delay: tailStart + 0.54 },
  { type: "code", text: "", className: "", delay: tailStart + 0.6 },
  { type: "code", text: "await solution.ship();", className: "text-emerald-400", delay: tailStart + 0.68 },
];

const cursorLine = String(lines.length + 1).padStart(2, "0");

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
          <span className="text-xs font-medium text-ink-faint">velinno  solutions.tsx</span>
          <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            deploy ready
          </span>
        </div>

        {/* Code lines */}
        <div className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 sm:text-[13.5px]">
          {lines.map((line, i) => {
            // The service catalog renders as one wrapping row (see CodeLine above).
            if (line.type === "services-row") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: line.delay, duration: 0.35, ease: EASE }}
                  className="flex flex-wrap items-baseline"
                >
                  <span className="mr-4 select-none text-white/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink">  services: [</span>
                  {heroServices.map((service, j) => (
                    <motion.span
                      key={service.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: line.delay + 0.04 + j * 0.06,
                        duration: 0.35,
                        ease: EASE,
                      }}
                      className={
                        isAiService(service.slug) ? "text-electric-bright" : "text-ink"
                      }
                    >
                      &quot;{service.slug}&quot;
                      {j < heroServices.length - 1 ? ", " : ""}
                    </motion.span>
                  ))}
                  <span className="text-ink">],</span>
                  <span className="text-ink-muted">{` // … +${hiddenCount} more`}</span>
                </motion.div>
              );
            }

            if (line.text === "") return <div key={i} className="h-7" />;

            return (
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
            );
          })}
          {/* Blinking cursor */}
          <div className="flex items-center">
            <span className="mr-4 select-none text-white/20">{cursorLine}</span>
            <span className="inline-block h-4 w-2 animate-blink bg-electric" />
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: tailStart + 1.18, duration: 0.5, ease: EASE }}
        className="absolute -left-4 -top-5 animate-float rounded-xl border border-white/10 bg-surface/90 px-4 py-2.5 backdrop-blur-lg sm:-left-8"
      >
        <p className="text-[10px] uppercase tracking-widest text-ink-faint">Performance</p>
        <p className="font-display text-lg font-semibold text-white">100<span className="text-electric-bright">/100</span></p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: tailStart + 1.33, duration: 0.5, ease: EASE }}
        className="absolute -bottom-5 -right-3 animate-float-slow rounded-xl border border-white/10 bg-surface/90 px-4 py-2.5 backdrop-blur-lg sm:-right-6"
      >
        <p className="text-[10px] uppercase tracking-widest text-ink-faint">Uptime</p>
        <p className="font-display text-lg font-semibold text-white">99.9<span className="text-emerald-400">%</span></p>
      </motion.div>
    </motion.div>
  );
}
