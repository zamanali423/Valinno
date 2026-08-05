"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const categoryStyles: Record<Project["category"], string> = {
  Web: "bg-electric/15 text-electric-bright ring-electric/30",
  Mobile: "bg-violet/15 text-violet-bright ring-violet/30",
  Cloud: "bg-cyan-400/15 text-cyan-300 ring-cyan-400/30",
  Design: "bg-fuchsia/15 text-fuchsia ring-fuchsia/30",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/70"
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — placeholder project image`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"
        />

        {/* Category tag */}
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ring-1 backdrop-blur",
            categoryStyles[project.category]
          )}
        >
          {project.category}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-100 transition-all duration-500 sm:opacity-0 sm:translate-y-3 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar — CTA on mobile (overlay already shows the title), hover reveal on desktop */}
      <div className="flex items-center justify-center border-t border-white/[0.08] px-5 py-4 sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-10 sm:border-t-0 sm:bg-gradient-to-t sm:from-base/95 sm:to-transparent sm:pb-5 sm:justify-start sm:pl-5">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-bright transition-colors group-hover:text-white">
          View Case Study
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </motion.article>
  );
}
