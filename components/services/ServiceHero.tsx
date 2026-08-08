"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { getServiceIcon } from "@/lib/service-icons";
import { EASE } from "@/lib/animations";
import type { Service } from "@/types";

/**
 * Animated hero for a service detail page  breadcrumb, gradient icon tile,
 * title, tagline and a consultation CTA over the same mesh treatment as the
 * homepage hero.
 */
export default function ServiceHero({ service }: { service: Service }) {
  const Icon = getServiceIcon(service.slug);

  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-36">
      {/* Animated mesh background  consistent with the homepage hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-24 left-[10%] h-80 w-80 rounded-full bg-electric/25 blur-[110px]"
          animate={{ y: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[6%] top-16 h-80 w-80 rounded-full bg-violet/25 blur-[120px]"
          animate={{ y: [0, -40, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute -bottom-24 left-[45%] h-72 w-72 rounded-full bg-fuchsia/15 blur-[100px]"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </div>

      <div className="container-px">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-ink-muted backdrop-blur transition-all duration-300 hover:border-electric/40 hover:text-white"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to Services
          </Link>
        </motion.div>

        <div className="mt-10 max-w-3xl">
          {/* Icon tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            className="relative grid h-20 w-20 place-items-center rounded-3xl bg-brand-gradient shadow-glow"
          >
            <Icon className="h-10 w-10 text-white" aria-hidden="true" />
            <span className="absolute -right-1.5 -top-1.5 grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-surface/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-electric-bright" aria-hidden="true" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
            className="mt-7 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {service.title.split(" ").map((word, i, arr) => (
              <span key={`${word}-${i}`}>
                {i === arr.length - 1 ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}{" "}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {service.short}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Button href="/contact" withArrow>
              Get a Free Consultation
            </Button>
            <Button href="/portfolio" variant="secondary">
              See Our Work
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
