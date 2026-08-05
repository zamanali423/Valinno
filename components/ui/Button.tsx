"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
}

type ButtonAsLink = BaseProps & { href: string; onClick?: () => void };
type ButtonAsButton = BaseProps & { onClick?: () => void; type?: "button" | "submit" };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseStyles =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-glow hover:shadow-glow-violet hover:brightness-110 focus-visible:outline-electric",
  secondary:
    "border border-white/15 bg-white/[0.04] text-white backdrop-blur hover:border-electric/50 hover:bg-white/[0.08] hover:shadow-glow",
  ghost: "text-ink-muted hover:text-white",
};

function Arrow() {
  return (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    />
  );
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", className, children, withArrow } = props;
  const classes = cn(baseStyles, variants[variant], className);

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 22 },
  };

  if ("href" in props) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link href={props.href} onClick={props.onClick} className={classes}>
          {children}
          {withArrow && <Arrow />}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
      {withArrow && <Arrow />}
    </motion.button>
  );
}
