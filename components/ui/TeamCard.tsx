"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { TeamMember } from "@/types";
import { StaggerItem } from "./motion";

/** Inline LinkedIn brand mark (lucide dropped brand icons). */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

/** Inline X (Twitter) brand mark. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
    </svg>
  );
}

/**
 * Team member card. Portrait (4:5) photo container with object-cover top so
 * faces stay framed regardless of source aspect ratio. Until a real photo is
 * added, a styled gradient portrait with the member's initials is shown
 * (add `photo` in lib/data.ts  no component changes needed).
 */
export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <StaggerItem className="h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="gradient-border group relative h-full"
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/20 group-hover:shadow-card">
          {/* Portrait image (4:5) */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              /* Styled initials portrait placeholder */
              <div className="absolute inset-0 bg-brand-gradient">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-grid opacity-20"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl font-semibold tracking-wide text-white/95 drop-shadow-lg">
                    {member.initials}
                  </span>
                </div>
              </div>
            )}

            {/* Bottom gradient + info overlay (socials slide up on hover) */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05070e] via-[#05070e]/85 to-transparent px-5 pb-5 pt-16">
              <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-electric-bright">
                {member.role}
              </p>

              <div className="mt-3 flex items-center gap-2.5 sm:translate-y-2 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                <a
                  href={member.socials?.linkedin ?? "#"}
                  aria-label={`${member.name} on LinkedIn`}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-all duration-300 hover:border-electric/50 hover:bg-electric/20 hover:text-white"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={member.socials?.twitter ?? "#"}
                  aria-label={`${member.name} on X (Twitter)`}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-all duration-300 hover:border-electric/50 hover:bg-electric/20 hover:text-white"
                >
                  <XIcon className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="flex-1 p-5 text-sm leading-relaxed text-ink-muted">{member.bio}</p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}
