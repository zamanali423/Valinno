import type { LucideIcon } from "lucide-react";

export type ProjectCategory = "Web" | "Mobile" | "Cloud" | "Design";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string; // short one-line bio — replace with real bios when ready
  initials: string;
}

export interface Project {
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  author: string; // e.g. "Client Name" — clearly a placeholder until real quotes are provided
  role: string;
  company: string;
}

export interface ProcessStep {
  step: string; // short label, e.g. "01"
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}
