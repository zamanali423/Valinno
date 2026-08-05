"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import CodeWindow from "./CodeWindow";
import { siteConfig } from "@/lib/site";
import { EASE } from "@/lib/animations";

const headline = ["Full-Stack", "Software Solutions"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pt-44">
      {/* Animated mesh background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-electric/25 blur-[110px]"
          animate={{ y: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[4%] top-24 h-[26rem] w-[26rem] rounded-full bg-violet/25 blur-[120px]"
          animate={{ y: [0, -50, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute -bottom-24 left-[38%] h-80 w-80 rounded-full bg-fuchsia/15 blur-[100px]"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </div>

      <div className="container-px grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-electric-bright" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide text-ink-muted">
              UAE-based full-stack software studio
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
            {headline.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 + i * 0.12, ease: EASE }}
              >
                {i === 1 ? (
                  <>
                    Software <span className="text-gradient">Solutions</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
            <motion.span
              className="mt-3 block font-display text-xl font-medium text-ink-muted sm:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            >
              {siteConfig.subTagline}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0"
          >
            Velinno empowers startups and enterprises with next-generation web, mobile, and cloud solutions. We deliver cutting-edge digital products, robust platforms, and expert consulting to help your business grow, scale, and lead in the digital era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68, ease: EASE }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button href="/contact" withArrow>
              Get Started
            </Button>
            <Button href="/portfolio" variant="secondary">
              View Our Work
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-ink-faint lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              Security-first delivery
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400" aria-hidden="true" />
              5-star client relationships
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Dubai · UAE timezone
            </span>
          </motion.div>
        </div>

        {/* Illustration */}
        <div className="hidden justify-center lg:flex">
          <CodeWindow />
        </div>
      </div>
    </section>
  );
}
