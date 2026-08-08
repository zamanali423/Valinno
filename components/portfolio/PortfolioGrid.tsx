"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/portfolio-data";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const filters: ("All" | ProjectCategory)[] = ["All", "Web", "Mobile", "Cloud", "AI", "UI/UX"];

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible =
    active === "All" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <div className="container-px">
      {/* Filter buttons */}
      <div
        className="flex flex-wrap items-center justify-center gap-2.5"
        role="group"
        aria-label="Filter projects by category"
      >
        {filters.map((filter) => {
          const isActive = filter === active;
          const count =
            filter === "All"
              ? projects.length
              : projects.filter((p) => p.categories.includes(filter)).length;
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
                <span
                  className={cn(
                    "ml-1.5 text-xs",
                    isActive ? "text-white/70" : "text-ink-faint"
                  )}
                >
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
          {visible.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
