"use client";

import { motion } from "framer-motion";
import { fadeUp, EASE } from "@/lib/animations";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

/** Inner-page hero band with staggered entrance animation. */
export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40rem 24rem at 70% 0%, rgba(79,124,255,0.14), transparent 60%), radial-gradient(30rem 20rem at 20% 10%, rgba(139,92,246,0.1), transparent 60%)",
        }}
      />

      <div className="container-px">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6, ease: EASE }}>
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
