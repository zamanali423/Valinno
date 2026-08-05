"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const filters: ("All" | ProjectCategory)[] = ["All", "Web", "Mobile", "Cloud", "Design"];

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="container-px">
      {/* Filter buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5" role="group" aria-label="Filter projects by category">
        {filters.map((filter) => {
          const isActive = filter === active;
          const count = filter === "All" ? projects.length : projects.filter((p) => p.category === filter).length;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
                isActive ? "text-white" : "text-ink-muted hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="portfolio-filter"
                  className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {filter}
                <span className={cn("ml-1.5 text-xs", isActive ? "text-white/70" : "text-ink-faint")}>
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-10 text-center text-xs text-ink-faint">
        Placeholder projects swap in real case studies, images and metrics in{" "}
        <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-electric-bright">lib/data.ts</code>.
      </p>
    </div>
  );
}
