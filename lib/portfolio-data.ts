import type { Project } from "@/types";

// Shared blur-up placeholder for next/image  matches the dark thumbnail background.
export const portfolioThumbBlur =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='10'%3E%3Crect width='16' height='10' fill='%230b1120'/%3E%3C/svg%3E";

// TODO: Replace with real project data, thumbnails, and client-approved results before launch.
// - `thumbnail`: drop a real screenshot at `/public/images/portfolio/<slug>.svg` (same filename,
//   no code changes)  keep it landscape, 16:10 or 4:3.
// - `results`, `challenge`, `solution`, `overview`: replace placeholder copy with client-approved
//   write-ups and verified metrics.
// - `featured: true` projects appear on the home-page preview grid (4 max).

export const projects: Project[] = [
  {
    slug: "fintrack",
    title: "FinTrack  AI-Powered Expense Management App",
    industry: "FinTech",
    categories: ["Mobile", "AI"],
    description:
      "A mobile expense tracker that reads receipts with AI, categorises spend automatically and gives users a real-time view of their money.",
    thumbnail: "/images/portfolio/fintrack.svg",
    techStack: ["React Native", "Node.js", "OpenAI API", "OCR", "PostgreSQL"],
    duration: "14 weeks",
    year: "2025",
    results: [
      { value: "40%", label: "Increase in user engagement" },
      { value: "12s", label: "Average time to first insight" },
      { value: "4.8★", label: "App Store rating" },
    ],
    overview: [
      "FinTrack started as a simple idea: personal finance should not require a spreadsheet and a weekend. The client wanted an app that removes the friction of tracking expenses  no manual categorisation, no forgotten receipts, no guesswork.",
      "We designed a mobile-first experience around a single, beautiful feed of spend. Every transaction is captured from bank sync or a photographed receipt, then run through an AI pipeline that extracts, classifies and enriches the data before it ever reaches the user's feed.",
      "The result is a product people actually open: an effortless way to see where money goes, with insights that feel personal rather than generic.",
    ],
    challenge:
      "Receipts come in every shape, size and language, and users expect instant accuracy. The core challenge was building an AI pipeline fast and reliable enough to feel magic  while keeping sensitive financial data fully private.",
    solution:
      "We built a hybrid OCR + LLM pipeline with a human-review fallback, ran it on encrypted image storage, and layered on smart rules from transaction history so the app learns each user's categorisation habits over time.",
    featured: true,
  },
  {
    slug: "medconnect",
    title: "MedConnect  Telehealth Booking Platform",
    industry: "Healthcare",
    categories: ["Web", "UI/UX"],
    description:
      "An end-to-end telehealth platform where patients book, attend and follow up on video consultations with verified specialists.",
    thumbnail: "/images/portfolio/medconnect.svg",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "WebRTC", "Stripe"],
    duration: "18 weeks",
    year: "2025",
    results: [
      { value: "3×", label: "Faster appointment booking" },
      { value: "27%", label: "Fewer no-shows" },
      { value: "99.9%", label: "Platform uptime" },
    ],
    overview: [
      "MedConnect set out to fix a frustrating, fragmented experience: finding a specialist, checking availability, booking and attending a consultation were four separate, manual steps.",
      "We delivered a single responsive platform  a searchable specialist directory, real-time availability, instant booking with payment, and embedded video consultations  designed to feel calm and trustworthy under medical-grade time pressure.",
      "Beyond the patient journey, we built clinician dashboards for calendar, notes and follow-ups, so the platform works for both sides of the consultation.",
    ],
    challenge:
      "Healthcare booking systems are judged on reliability and trust. The platform had to handle high-stakes transactions, strict availability logic and sensitive patient data  with zero tolerance for downtime or ambiguity.",
    solution:
      "A server-rendered Next.js platform with transactional integrity at its core: idempotent bookings, optimistic UI with server-confirmed state, WebRTC video with automatic fallback, and PCI-DSS-aligned payments.",
    featured: true,
  },
  {
    slug: "shopwave",
    title: "ShopWave  Headless E-commerce Storefront",
    industry: "E-commerce",
    categories: ["Web", "Cloud"],
    description:
      "A blazing-fast headless storefront serving thousands of products with personalisation, smart search and a checkout that converts.",
    thumbnail: "/images/portfolio/shopwave.svg",
    techStack: ["Next.js", "Headless CMS", "GraphQL", "AWS", "Algolia"],
    duration: "16 weeks",
    year: "2024",
    results: [
      { value: "52%", label: "Faster page loads" },
      { value: "+18%", label: "Conversion rate" },
      { value: "0.9s", label: "Median LCP" },
    ],
    overview: [
      "ShopWave's legacy e-commerce platform was slow, hard to edit and impossible to scale during flash sales. The brand needed a storefront that felt instant and a content layer marketers could actually use.",
      "We rebuilt it as a headless architecture: a Next.js storefront on the edge, a headless CMS for merchandising, and a search service tuned for typo-tolerant, faceted product discovery.",
      "The new checkout flow, performance budget and personalisation hooks turned a liability into the brand's strongest acquisition channel.",
    ],
    challenge:
      "Balancing rich merchandising with sub-second performance across thousands of SKUs, and keeping the storefront resilient through traffic spikes without letting cart or checkout fail.",
    solution:
      "Edge-rendered pages with aggressive caching, an API-first content model, lazy-loaded below-the-fold modules, and a checkout isolated from marketing traffic so sales events can never take it down.",
  },
  {
    slug: "ledgerly",
    title: "Ledgerly  AI Bookkeeping Automation Suite",
    industry: "FinTech",
    categories: ["AI", "Cloud"],
    description:
      "An AI bookkeeping engine that reconciles transactions, flags anomalies and generates month-end reports in minutes instead of days.",
    thumbnail: "/images/portfolio/ledgerly.svg",
    techStack: ["Python", "OpenAI API", "AWS Lambda", "QuickBooks API", "React"],
    duration: "20 weeks",
    year: "2025",
    results: [
      { value: "85%", label: "Manual entry eliminated" },
      { value: "6h→20m", label: "Month-end close time" },
      { value: "0", label: "Reconciliation errors in pilot" },
    ],
    overview: [
      "Bookkeepers were drowning in repetitive work: matching transactions, chasing receipts and manually preparing reports. Ledgerly aimed to let AI handle the grind while accountants handle judgment.",
      "We built an automation engine that pulls bank and platform data, matches it against source documents using fuzzy AI matching, and flags anomalies for human review  with a clear audit trail on every decision.",
      "The suite closes the month in minutes, produces board-ready reports automatically, and gives accountants back their weekends.",
    ],
    challenge:
      "Financial data tolerates no hallucination. The AI had to be highly accurate, explainable and constrained  with a human review path for anything below confidence thresholds, all inside a strict audit trail.",
    solution:
      "A deterministic reconciliation core with AI assist rather than AI authority: LLM-powered matching and categorisation gated by confidence scores, rollback-safe writes, and full provenance tracking on every journal entry.",
    featured: true,
  },
  {
    slug: "routepilot",
    title: "RoutePilot  AI Logistics Route Optimisation",
    industry: "Logistics",
    categories: ["AI", "Cloud"],
    description:
      "Route optimisation for delivery fleets that cuts mileage and fuel while keeping every promise window intact.",
    thumbnail: "/images/portfolio/routepilot.svg",
    techStack: ["Python", "OR-Tools", "Google Maps API", "Kubernetes", "React"],
    duration: "12 weeks",
    year: "2024",
    results: [
      { value: "22%", label: "Fewer kilometres driven" },
      { value: "31%", label: "Fuel cost reduction" },
      { value: "97%", label: "On-time delivery rate" },
    ],
    overview: [
      "A regional delivery operator was routing hundreds of daily stops by hand  experienced but inconsistent, and impossible to scale. RoutePilot brought algorithmic rigour to the dispatch desk.",
      "We built a routing engine that plans optimised multi-stop routes around traffic, time windows and vehicle capacity, then pushes them straight to drivers' phones with live re-optimisation as conditions change.",
      "The difference was visible from the first week: shorter routes, lower fuel spend and happier customers.",
    ],
    challenge:
      "Real-world routing is messy  traffic, time windows, driver breaks and last-minute orders all fight the plan. The solver had to be fast enough for live re-routing yet robust to messy input.",
    solution:
      "A constraint-based optimisation engine (with a greedy fallback), live GPS-driven re-planning, and a simple dispatcher UI that explains why a route changed so drivers trust it.",
  },
  {
    slug: "pulsehealth",
    title: "PulseHealth  Patient Engagement Portal",
    industry: "Healthcare",
    categories: ["UI/UX", "Mobile"],
    description:
      "A patient portal that turns appointment reminders, results and care plans into one calm, accessible mobile experience.",
    thumbnail: "/images/portfolio/pulsehealth.svg",
    techStack: ["Flutter", "Firebase", "HL7 FHIR", "Node.js"],
    duration: "15 weeks",
    year: "2025",
    results: [
      { value: "64%", label: "Reduction in missed appointments" },
      { value: "9.1", label: "Patient satisfaction score" },
      { value: "3×", label: "Portal activation rate" },
    ],
    overview: [
      "Hospitals send patients through a maze of paper, phone calls and disconnected apps. PulseHealth consolidated the patient journey into one thoughtfully designed mobile portal.",
      "We designed around real patient contexts  waiting rooms, low vision, anxious moments  and built a Flutter app that makes appointments, results and care plans genuinely easy to navigate.",
      "Clinicians gained a clearer channel too: secure messaging and follow-up tasks that reduce administrative phone traffic.",
    ],
    challenge:
      "Healthcare UX must be accessible to everyone  including older patients with low digital confidence  while integrating with hospital systems that were never designed for patients to touch.",
    solution:
      "Accessibility-first design validated with real patient groups, plain-language content patterns, and an FHIR-backed integration layer that maps hospital data into a patient-friendly model.",
    featured: true,
  },
  {
    slug: "orbita",
    title: "Orbita  SaaS Analytics Dashboard",
    industry: "SaaS",
    categories: ["Web", "Cloud"],
    description:
      "A real-time analytics platform that turns noisy product data into a dashboard teams actually look at every morning.",
    thumbnail: "/images/portfolio/orbita.svg",
    techStack: ["React", "TypeScript", "ClickHouse", "WebSockets", "Docker"],
    duration: "16 weeks",
    year: "2024",
    results: [
      { value: "10×", label: "Faster query response" },
      { value: "+35%", label: "Daily active dashboard users" },
      { value: "2.1s", label: "Median load-to-insight" },
    ],
    overview: [
      "The client's product generated rich event data, but their team was drowning in static reports nobody trusted. Orbita turned raw events into a living, real-time view of the business.",
      "We built a streaming analytics platform with sub-second queries, shareable dashboards and alerting that pings the right people at the right thresholds.",
      "The design goal was ruthless clarity: every chart earns its place, and every number can be traced back to its source query.",
    ],
    challenge:
      "Real-time dashboards are only as good as their queries. The hard part was making complex analytics instant, explainable and cheap to run at scale.",
    solution:
      "A columnar analytics engine behind a caching layer, streaming ingestion with backpressure handling, and a query builder that exposes power without forcing users to write SQL.",
  },
  {
    slug: "novafit",
    title: "NovaFit  Fitness & Wellness Companion",
    industry: "Consumer",
    categories: ["Mobile", "UI/UX"],
    description:
      "A wellness app that adapts workouts and habits to each user's week  because consistency beats intensity.",
    thumbnail: "/images/portfolio/novafit.svg",
    techStack: ["React Native", "Node.js", "HealthKit", "Google Fit", "PostgreSQL"],
    duration: "10 weeks",
    year: "2024",
    results: [
      { value: "58%", label: "4-week retention" },
      { value: "12k", label: "Active users in month one" },
      { value: "4.6★", label: "Average store rating" },
    ],
    overview: [
      "NovaFit was built on a simple insight: most fitness apps fail because they demand perfect weeks. Ours adapts  shorter sessions when life gets busy, adjusted plans when the user is tired, celebration where it matters.",
      "We designed a warm, encouraging mobile experience with adaptive programming that respects the user's real schedule and energy.",
      "The launch beat every internal target, with retention numbers that validated the 'consistency over intensity' thesis.",
    ],
    challenge:
      "Adaptive programming sounds simple but is genuinely hard: the app had to respond to user state without becoming unpredictable or gimmicky, and sync reliably with two platform health ecosystems.",
    solution:
      "A rule-based adaptation engine on top of a flexible workout model, health-platform sync with conflict resolution, and a tone-of-voice system designed to motivate without guilt-tripping.",
  },
];

/** Lookup helper for the detail page and cross-linking. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects shown on the home-page preview grid. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 4);
}
