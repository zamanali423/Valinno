"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem, EASE } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

/** Scroll-triggered reveal wrapper — fades + slides content in when it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  duration = 0.65,
  once = true,
  amount = 0.25,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  amount?: number;
}

/** Parent that staggers its StaggerItem children on scroll into view. */
export function StaggerGroup({ children, className, amount = 0.2 }: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Child of StaggerGroup. */
export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <motion.div className={cn(className)} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
