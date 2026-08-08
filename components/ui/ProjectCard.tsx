"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectCategory } from "@/types";
import { EASE } from "@/lib/animations";
import { portfolioThumbBlur } from "@/lib/portfolio-data";

const categoryStyles: Record<ProjectCategory, string> = {
  Web: "bg-electric/15 text-electric-bright ring-electric/30",
  Mobile: "bg-violet/15 text-violet-bright ring-violet/30",
  Cloud: "bg-cyan-400/15 text-cyan-300 ring-cyan-400/30",
  AI: "bg-fuchsia/15 text-fuchsia ring-fuchsia/30",
  "UI/UX": "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
};

interface ProjectCardProps {
  project: Project;
  /** Index in the grid  drives the stagger delay so cards cascade in. */
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const primaryCategory = project.categories[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07, ease: EASE }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface/70 transition-all duration-300 hover:border-white/20 hover:shadow-card"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={`${project.title}  project thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL={portfolioThumbBlur}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"
          />

          {/* Category badge  top-left pill */}
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ring-1 backdrop-blur ${categoryStyles[primaryCategory]}`}
          >
            {primaryCategory}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-100 transition-all duration-500 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <h3 className="font-display text-xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs text-ink-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar  always-visible CTA on mobile, hover reveal on desktop */}
        <div className="flex items-center justify-center border-t border-white/[0.08] px-5 py-4 sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-10 sm:border-t-0 sm:bg-gradient-to-t sm:from-base/95 sm:to-transparent sm:justify-start sm:pl-5 sm:pb-5">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-bright transition-colors group-hover:text-white">
            View Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
