import type { LucideIcon } from "lucide-react";

export type ProjectCategory = "Web" | "Mobile" | "Cloud" | "AI" | "UI/UX";

export interface ProjectResult {
  value: string; // e.g. "40%"  placeholder until client-approved numbers land
  label: string; // e.g. "Increase in user engagement"
}


export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string; // short label, e.g. "01"
  title: string;
  description: string;
}

export interface ServiceWhyPoint {
  title: string;
  description: string;
}

export interface ServiceCaseStudy {
  title: string;
  description: string;
  tags: string[];
}

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  overview: string[]; // 2–3 long-form paragraphs for the detail page
  features: ServiceFeature[]; // “What’s Included” icon grid on the detail page
  processSteps: ServiceProcessStep[]; // tailored process for this service
  techStack: string[];
  whyChoose: ServiceWhyPoint[]; // “Why Choose Velinno for X” benefits
  relatedServices: string[]; // slugs  cross-linking on the detail page
  caseStudies: ServiceCaseStudy[]; // placeholder case studies
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string; // short one-line bio  replace with real bios when ready
  initials: string;
  /** Optional photo path (e.g. /images/team/shahid.jpg). A styled initials tile is shown until one is added. */
  photo?: string;
  /** Optional social profile URLs (placeholders until real profiles are added). */
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  industry: string; // e.g. "FinTech"
  categories: ProjectCategory[]; // filter tags  matches service types
  description: string; // 1–2 sentence card summary
  thumbnail: string; // /images/portfolio/<slug>.svg  swap the file to replace the visual
  techStack: string[];
  duration: string; // e.g. "12 weeks"
  year: string;
  results: ProjectResult[]; // placeholder stats  replace with client-approved metrics
  overview: string[]; // 2–3 long-form paragraphs for the detail page
  challenge: string;
  solution: string;
  featured?: boolean; // shown on the home-page preview grid
}

export interface Testimonial {
  clientName: string; // e.g. "Client Name"  clearly a placeholder until real quotes are provided
  clientRole: string; // e.g. "Founder"
  companyName: string;
  quote: string;
  /** Optional 1–5 star rating; omit to hide the stars. */
  rating?: number;
  /** Optional photo path (e.g. /images/testimonials/ali.jpg). An initials avatar is shown until one is added. */
  clientPhoto?: string;
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
