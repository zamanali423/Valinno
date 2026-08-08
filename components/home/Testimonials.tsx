"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/lib/testimonials-data";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  const paginate = useCallback((dir: number) => {
    setIndex(([current]) => [
      (current + dir + testimonials.length) % testimonials.length,
      dir,
    ]);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paginate, index]);

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const current = testimonials[index];

  return (
    <section id="testimonials" className="section scroll-mt-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              What Clients <span className="text-gradient">Say About Us</span>
            </>
          }
          subtitle="Real client quotes are on the way  until then, these clearly-marked placeholders are ready to be swapped with verified testimonials."
        />

        <div className="relative mx-auto mt-14 max-w-3xl lg:mt-16">
          {/* Glass frame */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-electric/15 via-violet/15 to-fuchsia/15 blur-2xl" aria-hidden="true" />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-2 backdrop-blur-xl">
            <div className="min-h-[20rem] sm:min-h-[17rem]" aria-live="polite">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TestimonialCard testimonial={current} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-electric/40 hover:bg-white/[0.08] hover:shadow-glow"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index
                      ? "w-8 bg-brand-gradient"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-electric/40 hover:bg-white/[0.08] hover:shadow-glow"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
