"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/types";
import { StaggerItem } from "./motion";

/**
 * Team member card. Photos can be added later; until then a gradient
 * initials avatar is shown (swap the `initials` block for an <Image>).
 */
export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <StaggerItem className="h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="gradient-border group relative h-full"
      >
        <div className="relative flex h-full flex-col items-center rounded-2xl border border-white/10 bg-surface/70 px-6 pb-8 pt-10 text-center backdrop-blur-sm transition-colors duration-300 group-hover:border-white/20 group-hover:shadow-card">
          {/* Avatar */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-brand-gradient opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
            />
            <div className="relative grid h-24 w-24 place-items-center rounded-full bg-brand-gradient ring-4 ring-white/10 transition-transform duration-500 group-hover:scale-105">
              <span className="font-display text-3xl font-semibold tracking-wide text-white">
                {member.initials}
              </span>
            </div>
          </div>

          <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-white">
            {member.name}
          </h3>
          <p className="mt-1.5 text-sm font-semibold uppercase tracking-widest text-electric-bright">
            {member.role}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{member.bio}</p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}
