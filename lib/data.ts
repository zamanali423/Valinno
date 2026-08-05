import {
  ShieldCheck,
  Gauge,
  Headset,
  Layers,
  Lightbulb,
  Handshake,
} from "lucide-react";
import type {
  Service,
  TeamMember,
  Project,
  Testimonial,
  ProcessStep,
  Stat,
  WhyUsItem,
} from "@/types";

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short:
      "High-performance websites and web applications built with modern stacks like Next.js, React and Node.js, fast, secure and scalable.",
    description:
      "From marketing websites to complex SaaS platforms, we engineer web products that load fast, rank well and scale without drama. Our team builds on modern JavaScript and server-rendered frameworks, with performance budgets, accessibility and security baked in from day one.",
    includes: [
      "Custom website & web application development",
      "E-commerce and payment integrations",
      "CMS build-outs and content tooling",
      "API design and third-party integrations",
      "Performance optimisation and Core Web Vitals",
      "Ongoing maintenance and support",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    short:
      "Native-quality iOS and Android apps from a single codebase or fully native when your product demands it.",
    description:
      "We design and build mobile products your users will actually keep on their home screens. Whether it's a customer-facing app, an internal field tool, or an MVP you need in the market in weeks, we deliver polished, reliable apps across iOS and Android.",
    includes: [
      "iOS and Android app development (native & cross-platform)",
      "UI/UX design for mobile interfaces",
      "Push notifications and offline support",
      "App Store & Google Play submission",
      "Backend APIs and real-time features",
      "Post-launch analytics and iteration",
    ],
  },
  {
    slug: "cloud-solutions-devops",
    title: "Cloud Solutions & DevOps",
    short:
      "Infrastructure your business can rely on  AWS, Azure and GCP architecture, CI/CD pipelines and 24/7 reliability.",
    description:
      "Cloud done right is invisible: deployments that just work, infrastructure that scales automatically, and costs you can predict. We architect, migrate and operate cloud infrastructure so your team ships faster and your platform stays up.",
    includes: [
      "Cloud architecture design and migration",
      "CI/CD pipeline setup (GitHub Actions, GitLab CI)",
      "Containerisation with Docker and Kubernetes",
      "Monitoring, alerting and observability",
      "Cost optimisation and security hardening",
      "Managed DevOps and SRE-style support",
    ],
  },
  {
    slug: "social-media",
    title: "Social Media",
    short:
      "Strategy, content and management that turn social channels into a real growth channel for your brand.",
    description:
      "Your product deserves an audience that actually sees it. We build social strategies, content calendars and campaigns across LinkedIn, Instagram and beyond  and we measure everything, so you always know what's working.",
    includes: [
      "Social media strategy and positioning",
      "Content creation and design",
      "Community management and engagement",
      "Paid social campaign management",
      "Monthly reporting and analytics",
      "Brand voice and messaging guidelines",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    short:
      "Workflows that run themselves — AI-powered automation that cuts manual work, eliminates errors and frees your team for work that actually matters.",
    description:
      "Your team shouldn't be spending hours on repetitive work a machine can do in seconds. We design and deploy AI-powered automation across your operations — document processing, data entry, approvals, reporting and customer follow-ups — connected directly to the tools you already use every day.",
    includes: [
      "Business process audit and automation roadmap",
      "Document and data extraction (OCR + AI)",
      "Workflow automation across your existing tools",
      "Intelligent routing, approvals and notifications",
      "Automated reporting and alerting",
      "ROI measurement and continuous optimisation",
    ],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    short:
      "Conversational AI that answers, qualifies and converts — 24/7 chatbots trained on your business, not generic scripts.",
    description:
      "A chatbot that feels like talking to your best team member. We build AI chatbots trained on your knowledge base, tone and processes — ready to answer questions, qualify leads and hand off to a human the moment it matters, on your website, WhatsApp, Instagram or wherever your customers already are.",
    includes: [
      "Custom AI chatbot development (web & messaging)",
      "Training on your documents, FAQs and data",
      "Lead qualification and appointment booking",
      "Human handoff and escalation workflows",
      "Analytics, transcripts and continuous learning",
      "Multilingual conversation support",
    ],
  },
  {
    slug: "it-consulting-strategy",
    title: "IT Consulting & Strategy",
    short:
      "Clear technical direction for ambitious teams architecture reviews, roadmaps and technology selection.",
    description:
      "Before you build, you need to know what to build and how. We help leadership teams make confident technology decisions  from technical due diligence and architecture reviews to product roadmaps and vendor selection.",
    includes: [
      "Technical due diligence and audits",
      "Architecture and technology stack selection",
      "Digital transformation strategy",
      "Product roadmapping and prioritisation",
      "Security and compliance assessments",
      "Fractional CTO-style guidance",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short:
      "Interfaces people love to use research-driven UX, crisp UI, and design systems that scale with your product.",
    description:
      "Great software starts with great design. We pair research and strategy with pixel-perfect execution, producing interfaces that convert, satisfy and stay consistent  from the first wireframe to the final design system.",
    includes: [
      "UX research, user flows and wireframes",
      "Interactive prototypes and usability testing",
      "High-fidelity UI design",
      "Design systems and component libraries",
      "Brand identity and visual design",
      "Design-to-development handoff",
    ],
  },

  {
    slug: "generative-ai-content",
    title: "Generative AI & Content Creation",
    short:
      "Production-grade AI content — copy, images and video that carry your brand voice, created in a fraction of the time and cost.",
    description:
      "Generative AI is only as good as the system around it. We build production-grade content pipelines — brand-trained copy generation, on-brand image creation and repurposing engines that turn one asset into dozens — with human-in-the-loop review so everything that ships stays on-message and on-brand.",
    includes: [
      "Brand-trained copywriting workflows",
      "AI image and video generation pipelines",
      "Content repurposing and localisation",
      "Automated product and catalogue content",
      "Human review and approval workflows",
      "Content performance tracking",
    ],
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    short:
      "AI agents that don't just answer — they act. Autonomous systems that plan, execute and verify tasks end-to-end, always under your control.",
    description:
      "The next step beyond chatbots. We design agentic AI systems that break complex tasks into steps, use your tools and data, and execute multi-stage work autonomously — from research and drafting to customer operations and system administration — with guardrails, permissions and human oversight built in at every stage.",
    includes: [
      "Agent architecture and workflow design",
      "Tool and API integration for autonomous action",
      "Memory, context and knowledge grounding",
      "Guardrails, permissions and audit trails",
      "Multi-agent orchestration",
      "Monitoring, evaluation and safety review",
    ],
  },
  {
    slug: "erp-systems",
    title: "ERP Systems",
    short:
      "One source of truth for your whole business — ERP selection, implementation, integration and customisation that fits how you actually work.",
    description:
      "Finance, inventory, HR, procurement and sales scattered across spreadsheets and disconnected tools? We help you consolidate onto an ERP that fits — from platform selection and data migration to implementation, integration and custom development — so every department works from the same real-time numbers.",
    includes: [
      "ERP platform selection and fit analysis",
      "Implementation, configuration and data migration",
      "Integration with existing systems and APIs",
      "Custom modules and workflow development",
      "Staff training and change management",
      "Ongoing support and optimisation",
    ],
  },
  {
    slug: "csm-systems",
    title: "CSM Systems",
    short:
      "Customer success at scale — CSM platforms that track account health, automate outreach and turn customers into advocates.",
    description:
      "Customer Success Management, done properly. We implement and customise customer success platforms that give you a single view of every account — health scores, onboarding, renewals, churn risk and expansion opportunities — with automated playbooks that trigger the right action at the right moment.",
    includes: [
      "Customer success platform selection and setup",
      "Health scoring and churn-risk modelling",
      "Onboarding and lifecycle automation",
      "Renewal and expansion workflow management",
      "Integration with CRM and support tools",
      "Leadership reporting dashboards",
    ],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    short:
      "Your sales engine, organised — CRM implementation, customisation and integration that your team will actually use.",
    description:
      "A CRM only works if your team lives in it. We implement and tailor CRM platforms — pipeline management, lead scoring, automation and reporting — and make them genuinely easy to use, so data stays clean, deals move faster and managers see the truth in real time.",
    includes: [
      "CRM platform selection and configuration",
      "Sales pipeline and lead scoring setup",
      "Email and workflow automation",
      "Data migration and cleanup",
      "CRM–marketing and support integrations",
      "Team training and adoption support",
    ],
  },
];

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
/* Portfolio  placeholder projects. Replace images, titles and copy.  */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    category: "Web",
    image: "/images/portfolio/placeholder-1.svg",
    description:
      "Placeholder case study replace with a real e-commerce web project, results and metrics.",
    tags: ["Next.js", "Headless CMS", "Payments"],
  },
  {
    title: "Mobile Banking App",
    category: "Mobile",
    image: "/images/portfolio/placeholder-2.svg",
    description:
      "Placeholder case study replace with a real mobile app project, results and metrics.",
    tags: ["iOS", "Android", "Fintech"],
  },
  {
    title: "Cloud Migration & DevOps",
    category: "Cloud",
    image: "/images/portfolio/placeholder-3.svg",
    description:
      "Placeholder case study replace with a real cloud/DevOps engagement, results and metrics.",
    tags: ["AWS", "Kubernetes", "CI/CD"],
  },
  {
    title: "Brand & Product Design",
    category: "Design",
    image: "/images/portfolio/placeholder-4.svg",
    description:
      "Placeholder case study replace with a real design project, results and metrics.",
    tags: ["Brand Identity", "UI/UX", "Design System"],
  },
  {
    title: "SaaS Dashboard",
    category: "Web",
    image: "/images/portfolio/placeholder-5.svg",
    description:
      "Placeholder case study replace with a real SaaS product, results and metrics.",
    tags: ["React", "Real-time", "Analytics"],
  },
  {
    title: "Field Services App",
    category: "Mobile",
    image: "/images/portfolio/placeholder-6.svg",
    description:
      "Placeholder case study replace with a real field operations app, results and metrics.",
    tags: ["Flutter", "Offline-first", "Maps"],
  },
  {
    title: "DevOps Automation",
    category: "Cloud",
    image: "/images/portfolio/placeholder-7.svg",
    description:
      "Placeholder case study replace with a real automation engagement, results and metrics.",
    tags: ["Terraform", "Observability", "SRE"],
  },
  {
    title: "Product Design & Prototype",
    category: "Design",
    image: "/images/portfolio/placeholder-8.svg",
    description:
      "Placeholder case study replace with a real design engagement, results and metrics.",
    tags: ["Prototyping", "User Research", "UI Kit"],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials  placeholders, clearly marked for replacement         */
/* ------------------------------------------------------------------ */

export const testimonials: Testimonial[] = [
  {
    quote:
      "Replace this quote with a real client testimonial. Aim for 2–3 sentences describing the challenge, the outcome and the working experience with Velinno.",
    author: "Client Name",
    role: "Founder",
    company: "Company Name Replace with real testimonial",
  },
  {
    quote:
      "Replace this quote with a second real client testimonial. Include concrete results where possible, such as launch timelines, performance gains or growth metrics.",
    author: "Client Name",
    role: "Product Manager",
    company: "Company Name  Replace with real testimonial",
  },
  {
    quote:
      "Replace this quote with a third real client testimonial. A short, specific quote often reads more authentically than a long one.",
    author: "Client Name",
    role: "CEO",
    company: "Company Name Replace with real testimonial",
  },
  {
    quote:
      "Replace this quote with a fourth real client testimonial. You can remove or add cards in lib/data.ts.",
    author: "Client Name",
    role: "Operations Director",
    company: "Company Name Replace with real testimonial",
  },
];

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
