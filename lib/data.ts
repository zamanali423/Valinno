import {
  ShieldCheck,
  Gauge,
  Headset,
  Layers,
  Lightbulb,
  Handshake,
  BrainCircuit,
} from "lucide-react";
import type {
  TeamMember,
  ProcessStep,
  Stat,
  WhyUsItem,
} from "@/types";

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
// Service content now lives in `lib/services-data.ts` (single source of truth
// for the `/services/[slug]` detail pages). Import `services` from there.

/* ------------------------------------------------------------------ */
/* Team (real members  do not change names or roles)                  */
/* ------------------------------------------------------------------ */

export const team: TeamMember[] = [
  {
    name: "Muhammad Shahid",
    role: "Founder",
    bio: "Leads product vision and company strategy. Replace with a real one-line bio",
    initials: "MS",
  },
  {
    name: "Muhammad Abid",
    role: "Co-Founder",
    bio: "Drives business growth and partnerships. Replace with a real one-line bio",
    initials: "MA",
  },
  {
    name: "Zaman Ali",
    role: "CEO",
    bio: "Leads company strategy and executive direction. Replace with a real one-line bio",
    initials: "ZA",
  },
  {
    name: "Muhammad Asim Mirza",
    role: "Director of Operations (OPS)",
    bio: "Oversees delivery, quality and day-to-day operations. Replace with a real one-line bio",
    initials: "AM",
  },
];

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */
// Portfolio projects now live in `lib/portfolio-data.ts` (single source of
// truth for the home preview, the filterable /portfolio grid and the
// /portfolio/[slug] case-study pages). Import `projects` from there.

/* ------------------------------------------------------------------ */
/* Testimonials                                                       */
/* ------------------------------------------------------------------ */
// Testimonial content now lives in `lib/testimonials-data.ts` (typed
// Testimonial[] with clientName/role/company, optional rating and photo).
// Import `testimonials` from there  `lib/data.ts` no longer exports them.

/* ------------------------------------------------------------------ */
/* Process  Discover → Define → Design → Develop → Deploy → Deliver   */
/* ------------------------------------------------------------------ */

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We start with your goals, users and constraints. Workshops and discovery sessions turn your idea into a clear picture of what success looks like.",
  },
  {
    step: "02",
    title: "Define",
    description:
      "We shape the scope feature list, technical approach, timeline and budget. You get a roadmap you can actually plan around.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "UX flows, wireframes and high-fidelity UI bring the product to life before a line of production code is written.",
  },
  {
    step: "04",
    title: "Develop",
    description:
      "Agile sprints with weekly demos. Code is reviewed, tested and deployed to staging so you can follow progress in real time.",
  },
  {
    step: "05",
    title: "Deploy",
    description:
      "We ship to production with CI/CD, monitoring and rollback plans a smooth, low-risk launch backed by our engineering team.",
  },
  {
    step: "06",
    title: "Deliver",
    description:
      "Handover, documentation and training then ongoing support and iteration to keep the product improving long after launch.",
  },
];

/* ------------------------------------------------------------------ */
/* Stats  replace with verified company numbers before launch         */
/* ------------------------------------------------------------------ */

export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Clients Served" },
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "Team Members" },
];

/* ------------------------------------------------------------------ */
/* Why choose us                                                       */
/* ------------------------------------------------------------------ */

export const whyUs: WhyUsItem[] = [
  {
    icon: ShieldCheck,
    title: "End-to-End Delivery",
    description:
      "Strategy, design, engineering and support under one roof one team accountable for the full lifecycle of your product.",
  },
  {
    icon: Gauge,
    title: "Performance Obsessed",
    description:
      "We build fast by default every project ships with performance budgets, Core Web Vitals targets and measurable outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Modern Technology",
    description:
      "We pick battle-tested modern stacks and stay sharp on what's next, so you never inherit yesterday's architecture.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description:
      "From MVP to enterprise, our systems are designed to grow with your business without a rewrite at every milestone.",
  },
  {
    icon: Headset,
    title: "Transparent Communication",
    description:
      "Weekly demos, honest timelines and a direct line to the people building your product. No black boxes, no surprises.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description:
      "We measure success by your results, not our deliverables. Most of our clients stay with us well beyond the first launch.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Driven Innovation",
    description:
      "We integrate automation, chatbots and intelligent workflows into every solution we build, so your product doesn't just work  it works smarter.",
  },
];

/* ------------------------------------------------------------------ */
/* Client marquee  replace with real client/brand names when available */
/* ------------------------------------------------------------------ */

export const clientLogos: string[] = [
  "Your Company",
  "Your Brand",
  "Your Startup",
  "Your Enterprise",
  "Your Partner",
  "Your Client",
];
