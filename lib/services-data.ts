import type {
  Service,
  ServiceFeature,
  ServiceProcessStep,
  ServiceWhyPoint,
  ServiceCaseStudy,
} from "@/types";

/**
 * Central content source for every service detail page.
 *
 * Each entry drives `/services/[slug]` end-to-end: hero, overview, feature grid,
 * tailored process, tech stack, "why choose us", related services and case studies.
 * Edit copy here  never in components.
 *
 * Icons are resolved by slug in `lib/service-icons.ts` (kept separate so
 * LucideIcon components never cross the server → client boundary as props).
 */

const f = (title: string, description: string): ServiceFeature => ({ title, description });
const p = (step: string, title: string, description: string): ServiceProcessStep => ({
  step,
  title,
  description,
});
const w = (title: string, description: string): ServiceWhyPoint => ({ title, description });
const cs = (title: string, description: string, tags: string[]): ServiceCaseStudy => ({
  title,
  description,
  tags,
});

export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  /* AI-first flagship                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "ai-powered-applications",
    title: "AI-Powered Application Development",
    short:
      "Custom AI applications built end-to-end  from product strategy and model design to production features your users actually feel.",
    description:
      "We design, build and ship AI-powered applications end-to-end: product thinking, data foundations, model design and the production engineering to run them at scale. From intelligent features inside existing products to new AI-native platforms, we turn AI capability into real product outcomes.",
    includes: [
      "AI product strategy and opportunity mapping",
      "Custom web and mobile application development",
      "Model design, training and fine-tuning",
      "RAG, vector search and knowledge grounding",
      "Guardrails, evaluation and safety review",
      "Production infrastructure and MLOps",
    ],
    overview: [
      "AI changes what software can do, but only when it is built as a product, not a demo. We help you identify where AI genuinely moves your metrics, then design and engineer applications around those opportunities  with the data foundations, model choices and interfaces aligned to real user workflows.",
      "We ship production-grade, not proof-of-concept: retrieval-augmented features grounded in your knowledge, models evaluated against business metrics, guardrails that keep outputs safe, and MLOps that keeps the system reliable long after launch. The result is software that learns, adapts and compounds in value.",
    ],
    features: [
      f("AI product strategy", "We map where AI creates real value in your business and design the product around those opportunities."),
      f("End-to-end engineering", "Custom applications built with AI at the core, not bolted on  from data pipeline to polished interface."),
      f("Models that fit the problem", "Pre-trained, fine-tuned or custom models chosen for your data, constraints and accuracy targets."),
      f("Grounded, not hallucinated", "RAG and vector search keep outputs anchored to your knowledge base, with sources and confidence visible."),
      f("Guardrails by default", "Evaluation sets, safety filters, human-in-the-loop checkpoints and audit trails on every deployment."),
      f("MLOps for the long run", "Monitoring, retraining loops and cost control so the application stays accurate and affordable."),
    ],
    processSteps: [
      p("01", "Discover & Scope", "Workshops to map AI opportunities, data readiness and the metrics that will define success."),
      p("02", "Design", "Product design, model selection and data architecture agreed before any heavy build."),
      p("03", "Build & Train", "Application and model development in parallel, with evaluation harnesses from day one."),
      p("04", "Evaluate & Refine", "Test sets, edge cases and real-traffic evaluation until accuracy and UX both clear the bar."),
      p("05", "Deploy & Optimise", "Production launch with monitoring, feedback loops and continuous model improvement."),
    ],
    techStack: [
      "OpenAI & Anthropic APIs",
      "Python / Node.js",
      "RAG & vector databases",
      "Next.js / React",
      "AWS / Azure / GCP",
      "MLOps & evaluation tooling",
    ],
    whyChoose: [
      w("Product thinking first", "We start from business outcomes, not model availability  AI earns its place in the product."),
      w("Full-stack AI delivery", "Strategy, data, models, application and operations under one roof  no hand-offs between vendors."),
      w("Grounded and safe", "RAG, guardrails and evaluation are architecture, not afterthoughts."),
      w("Built to evolve", "Monitoring and retraining loops mean the application gets smarter, not stale, after launch."),
    ],
    relatedServices: ["ai-automation", "ai-chatbots", "agentic-ai", "web-development"],
    caseStudies: [
      cs("AI-native analytics platform for a SaaS company", "Placeholder case study  full write-up with metrics is being finalised.", ["AI", "SaaS", "Analytics"]),
      cs("Intelligent document assistant for a professional services firm", "Placeholder case study  full write-up with metrics is being finalised.", ["RAG", "Document AI", "Enterprise"]),
    ],
  },

  {
    slug: "ai-automation",
    title: "AI Automation",
    short:
      "Workflows that run themselves  AI-powered automation that cuts manual work, eliminates errors and frees your team for work that actually matters.",
    description:
      "Your team shouldn't be spending hours on repetitive work a machine can do in seconds. We design and deploy AI-powered automation across your operations  document processing, data entry, approvals, reporting and customer follow-ups  connected directly to the tools you already use every day.",
    includes: [
      "Business process audit and automation roadmap",
      "Document and data extraction (OCR + AI)",
      "Workflow automation across your existing tools",
      "Intelligent routing, approvals and notifications",
      "Automated reporting and alerting",
      "ROI measurement and continuous optimisation",
    ],
    overview: [
      "Every business runs on repetitive, rule-based work  and most of it can be automated today without a big-bang transformation. We start with a structured audit of your operations, map where time and errors actually leak, and prioritise automation opportunities by effort, impact and risk. The result is a pragmatic roadmap, not a slide deck.",
      "From there we build. Document and data extraction powered by AI, multi-step workflows that run across the tools you already pay for, and intelligent routing that escalates the edge cases to a human only when it genuinely matters. Every deployment ships with monitoring and clear ROI measurement, so you always know what the automation is saving.",
    ],
    features: [
      f(
        "Process audit & roadmap",
        "We find the repetitive, error-prone work in your operations and rank automation opportunities by ROI, risk and effort."
      ),
      f(
        "OCR & intelligent extraction",
        "AI reads invoices, contracts, forms and emails, and pushes structured data into your systems  no manual re-keying."
      ),
      f(
        "Cross-tool workflows",
        "Automation wired into the tools you already use: email, spreadsheets, CRMs, ERPs, Slack, WhatsApp and your internal systems."
      ),
      f(
        "Smart routing & approvals",
        "Simple cases flow straight through; exceptions are routed to the right person with full context attached."
      ),
      f(
        "Reports & alerts that run themselves",
        "Daily, weekly and event-driven reporting delivered on schedule, with anomaly alerts before problems compound."
      ),
      f(
        "Measured ROI",
        "Every workflow ships with baseline-vs-after tracking, so you can see the hours and money returned month over month."
      ),
    ],
    processSteps: [
      p("01", "Audit & Discover", "Workshops and process mapping to surface repetitive work, bottlenecks and automation-ready candidates."),
      p("02", "Blueprint", "We design the target workflows, data flows and exception paths  and agree success metrics before any code."),
      p("03", "Build & Connect", "Workflows are built and wired into your existing tools with secure, auditable integrations."),
      p("04", "Train & Refine", "AI models are trained on your documents and data, then tuned on real traffic until accuracy is production-grade."),
      p("05", "Deploy & Optimise", "Launch with monitoring and dashboards, then a continuous loop of measurement, tuning and expansion."),
    ],
    techStack: [
      "OpenAI & Anthropic APIs",
      "Python / Node.js",
      "OCR engines",
      "n8n / Zapier",
      "REST & webhook integrations",
      "Retrieval-augmented pipelines",
    ],
    whyChoose: [
      w(
        "Built for your reality",
        "We automate around the tools and processes you already run  no forced platform migration to see results."
      ),
      w(
        "Human in the loop",
        "Guardrails, approval gates and audit trails keep you in control. Automation handles the volume; you handle the judgment."
      ),
      w(
        "ROI, not hype",
        "Every engagement ships with measurable baselines and dashboards, so automation is a line item you can defend."
      ),
      w(
        "Senior, accountable team",
        "The engineers who scope your automation are the ones who build and support it  no hand-offs between vendors."
      ),
    ],
    relatedServices: ["ai-chatbots", "agentic-ai", "it-consulting-strategy"],
    caseStudies: [
      cs(
        "Document processing for a UAE logistics operator",
        "Placeholder case study  full write-up with metrics is being finalised.",
        ["OCR", "Workflow Automation", "Logistics"]
      ),
      cs(
        "Finance approvals automation for an SME",
        "Placeholder case study  full write-up with metrics is being finalised.",
        ["Approvals", "ERP Integration", "Finance"]
      ),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Web & mobile                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: "web-development",
    title: "Web Development",
    short:
      "High-performance websites and web applications built with modern stacks like Next.js, React and Node.js  fast, secure and scalable.",
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
    overview: [
      "Your website or web application is often the first impression customers get of your business  and the last one if it's slow, clunky or breaks. We build web products on modern, server-rendered stacks that deliver speed as a default, not an afterthought. From marketing sites to full SaaS platforms, everything ships with performance budgets, accessibility and security baked into the engineering process.",
      "We stay close to the product after launch too. Analytics-driven iteration, Core Web Vitals monitoring and a direct line to the engineers who built it mean your platform keeps improving instead of drifting into maintenance mode.",
    ],
    features: [
      f("Modern frameworks", "Next.js, React and Node.js  server-rendered, SEO-friendly and built to scale."),
      f("Commerce ready", "E-commerce, payment gateways and subscription billing integrated cleanly and securely."),
      f("Content tooling", "CMS builds that your team will actually enjoy using, tailored to your publishing workflow."),
      f("API design", "Clean, well-documented APIs and third-party integrations that play nicely with your stack."),
      f("Performance-first", "Core Web Vitals budgets from day one, with optimisation passes before launch and after."),
      f("Long-term support", "Maintenance, monitoring and feature iteration long after the launch sprint."),
    ],
    processSteps: [
      p("01", "Discover", "Goals, users, content model and success metrics  we define what the product must achieve before a line of code."),
      p("02", "Design & Prototype", "Wireframes and high-fidelity UI bring the experience to life, reviewed in real browsers."),
      p("03", "Build", "Agile sprints with weekly demos, automated tests and staging environments you can click through."),
      p("04", "Optimise & Harden", "Performance passes, accessibility checks, security review and cross-browser testing."),
      p("05", "Launch & Iterate", "Deployment with monitoring and rollback plans, then data-driven iteration and support."),
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Vercel / AWS"],
    whyChoose: [
      w("Speed is engineered, not tested in", "Performance budgets are set before build and enforced throughout  not retrofitted at the end."),
      w("Security from day one", "Authentication, authorisation, validation and dependency hygiene are part of the architecture, not patches."),
      w("Design and code in one room", "Our designers and engineers collaborate daily, so the shipped UI matches the designed UI."),
      w("Transparent sprints", "Weekly demos, honest timelines and a direct line to the people building your product."),
    ],
    relatedServices: ["mobile-app-development", "ui-ux-design", "cloud-solutions-devops"],
    caseStudies: [
      cs("SaaS platform for a regional startup", "Placeholder case study  full write-up with metrics is being finalised.", ["Next.js", "SaaS", "Payments"]),
      cs("E-commerce rebuild for a retail brand", "Placeholder case study  full write-up with metrics is being finalised.", ["E-commerce", "Headless CMS", "SEO"]),
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    short:
      "Native-quality iOS and Android apps from a single codebase  or fully native when your product demands it.",
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
    overview: [
      "A great mobile app is a habit, not a download. We design and build apps that earn a place on the home screen  fast to open, reliable offline, delightful to use. Whether you need native iOS and Android or a single cross-platform codebase, we pick the approach that fits your product, budget and timeline rather than forcing a default.",
      "From MVP in weeks to enterprise-grade apps with real-time features, we handle the full journey: product thinking, mobile UX, backend APIs, store submission and post-launch iteration driven by real usage data.",
    ],
    features: [
      f("Native & cross-platform", "Swift, Kotlin or React Native/Flutter  the right tool for your product, not a one-size default."),
      f("Mobile-first UX", "Interfaces designed for thumbs, glances and interrupted sessions  not desktop patterns shrunk down."),
      f("Offline & push", "Offline-first data handling and reliable push notifications that keep users engaged."),
      f("Store submission", "App Store and Google Play assets, review-guideline compliance and smooth approvals."),
      f("Real-time backend", "APIs, websockets and sync architecture built for mobile network realities."),
      f("Post-launch iteration", "Analytics instrumentation from day one, so version 2.0 is driven by evidence."),
    ],
    processSteps: [
      p("01", "Discover", "User research, platform strategy and feature scoping for your target market and devices."),
      p("02", "Design", "Mobile-first UX flows and polished UI, prototyped and tested before development."),
      p("03", "Build", "Sprints with working builds on your device from week one  you feel progress, not just read about it."),
      p("04", "Test & Polish", "Device-matrix testing, performance profiling, beta releases and App Store readiness."),
      p("05", "Launch & Iterate", "Submission, release, analytics review and a roadmap of improvements backed by usage data."),
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js APIs"],
    whyChoose: [
      w("The right architecture, chosen honestly", "We recommend native, cross-platform or hybrid based on your product  not our tooling preferences."),
      w("One team, full journey", "Strategy, design, engineering and store submission under one roof, so nothing slips between vendors."),
      w("Reliability that survives real networks", "Offline support, sync logic and caching are first-class citizens, not afterthoughts."),
      w("Shipped, not abandoned", "We stay for the launch and the first iterations, with analytics wired in from the start."),
    ],
    relatedServices: ["web-development", "ui-ux-design", "cloud-solutions-devops"],
    caseStudies: [
      cs("Field-services app for an operations team", "Placeholder case study  full write-up with metrics is being finalised.", ["Flutter", "Offline-first", "Maps"]),
      cs("Customer mobile banking experience", "Placeholder case study  full write-up with metrics is being finalised.", ["iOS", "Android", "Fintech"]),
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
    overview: [
      "Infrastructure should be the least interesting part of your business  reliably, invisibly there. We design cloud architectures, migrate legacy workloads, and build the CI/CD pipelines and observability that let your team deploy with confidence dozens of times a day.",
      "Beyond the build-out, we operate: monitoring, alerting, cost optimisation and security hardening as an ongoing managed service. You get SRE-grade discipline without needing to hire an SRE team.",
    ],
    features: [
      f("Architecture & migration", "Greenfield designs and lift-and-shift, re-platform or rebuild migrations across AWS, Azure and GCP."),
      f("CI/CD pipelines", "Automated build, test and deploy pipelines so shipping is boring, safe and reversible."),
      f("Containers & orchestration", "Docker and Kubernetes setups with sensible defaults for scaling, rolling updates and rollbacks."),
      f("Observability", "Metrics, logs, traces and alerting that tell you what's broken before your customers do."),
      f("Cost control", "Right-sizing, savings plans and waste detection that keep cloud bills predictable."),
      f("Managed operations", "Ongoing DevOps and SRE-style support with incident response and continuous hardening."),
    ],
    processSteps: [
      p("01", "Assess", "Infrastructure audit: workloads, dependencies, security posture and current costs."),
      p("02", "Architect", "Target-state architecture with scaling, resilience, security and cost models agreed upfront."),
      p("03", "Migrate", "Phased, reversible migration with cutover plans and rollback paths at every step."),
      p("04", "Automate", "CI/CD, infrastructure-as-code and environment parity so teams deploy safely and often."),
      p("05", "Operate", "Monitoring, alerting, optimisation and ongoing support after go-live."),
    ],
    techStack: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    whyChoose: [
      w("Invisible by design", "We build infrastructure that requires no ops heroics  deployments, scaling and recovery just work."),
      w("Costs you can predict", "Architecture and optimisation choices are made with the invoice in mind, not just the uptime graph."),
      w("Security hardening included", "Least-privilege access, encryption, patch hygiene and compliance checks are part of every setup."),
      w("We stay on-call", "Managed operations mean a real team watches your alerts and responds  not a dashboard you ignore."),
    ],
    relatedServices: ["web-development", "it-consulting-strategy", "ai-automation"],
    caseStudies: [
      cs("Cloud migration for a legacy platform", "Placeholder case study  full write-up with metrics is being finalised.", ["AWS", "Migration", "Cost Optimisation"]),
      cs("Kubernetes platform for a SaaS team", "Placeholder case study  full write-up with metrics is being finalised.", ["Kubernetes", "CI/CD", "Observability"]),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Experience & growth                                                */
  /* ------------------------------------------------------------------ */
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
    overview: [
      "Social media only becomes a growth channel when it's run with the same rigour as your product roadmap. We build positioning, content systems and campaigns that give your brand a consistent voice across LinkedIn, Instagram and emerging platforms  then measure engagement against business outcomes, not vanity metrics.",
      "With AI-assisted content workflows and a sharp eye on analytics, we keep the pipeline full and the strategy honest: what gets posted, why, and what it returns.",
    ],
    features: [
      f("Strategy & positioning", "Channel selection, audience definition and a content strategy tied to real business goals."),
      f("Content systems", "AI-assisted production pipelines that keep your calendar full without burning your team out."),
      f("Community management", "Responsive engagement, moderation and conversation design that build genuine followings."),
      f("Paid campaigns", "Budgeted, tested and optimised paid social across the platforms where your buyers actually are."),
      f("Honest reporting", "Monthly analytics against leads, traffic and engagement  no spreadsheet theatre."),
      f("Brand voice", "Messaging guidelines that keep every post, comment and campaign unmistakably you."),
    ],
    processSteps: [
      p("01", "Strategy", "Audience, channels, positioning and success metrics agreed before a single post is planned."),
      p("02", "Brand & Voice", "Messaging guidelines, visual identity and content pillars that make you recognisable."),
      p("03", "Create", "AI-assisted content production and design, batched to a sustainable cadence."),
      p("04", "Publish & Engage", "Scheduling, community management and paid amplification run by one accountable team."),
      p("05", "Measure & Refine", "Monthly reporting, A/B learning and strategy adjustments driven by real performance data."),
    ],
    techStack: ["LinkedIn", "Instagram", "Meta Ads Manager", "Canva / Adobe", "Sprout Social", "Analytics dashboards"],
    whyChoose: [
      w("Outcomes, not likes", "We report against leads, site traffic and sales influence  the numbers that actually matter."),
      w("AI-assisted production", "Brand-trained content workflows keep output high and costs sane without sounding robotic."),
      w("One accountable team", "Strategy, content, community and paid all handled together, so nothing is inconsistent."),
      w("Built to scale", "Systems and templates that scale from a solo founder to a full marketing team."),
    ],
    relatedServices: ["generative-ai-content", "ui-ux-design", "web-development"],
    caseStudies: [
      cs("LinkedIn growth for a B2B services firm", "Placeholder case study  full write-up with metrics is being finalised.", ["LinkedIn", "Content", "B2B"]),
      cs("Paid social launch for a retail brand", "Placeholder case study  full write-up with metrics is being finalised.", ["Meta Ads", "E-commerce", "Paid Social"]),
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short:
      "Interfaces people love to use  research-driven UX, crisp UI, and design systems that scale with your product.",
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
    overview: [
      "The best products feel obvious  and that only happens with deliberate design. We combine user research, interaction design and visual craft to build interfaces people understand in seconds and enjoy using daily. Every decision, from information architecture to button copy, is traceable to a user need or a business goal.",
      "We don't stop at mockups. Design systems, component libraries and developer-friendly handoff mean what we design is exactly what ships  and stays consistent as your product grows.",
    ],
    features: [
      f("Research-driven UX", "User research, flows and wireframes grounded in evidence, not opinions."),
      f("Rapid prototyping", "Clickable prototypes and usability testing that validate ideas before code."),
      f("High-fidelity UI", "Pixel-perfect visual design with hierarchy, contrast and accessibility built in."),
      f("Design systems", "Component libraries and tokens that keep every screen consistent and scalable."),
      f("Brand identity", "Logos, colour, typography and visual language that make you unmistakable."),
      f("Clean handoff", "Documented specs and developer-ready assets that eliminate design-to-code drift."),
    ],
    processSteps: [
      p("01", "Research", "User interviews, analytics review and competitor analysis to define who you're designing for."),
      p("02", "Define & Wireframe", "Flows, information architecture and wireframes that map the journey end to end."),
      p("03", "Prototype & Test", "Interactive prototypes tested with real users; insights folded back into the design."),
      p("04", "Design", "High-fidelity UI, visual polish and a design system ready for development."),
      p("05", "Handoff & Support", "Documented specs, developer collaboration and QA to ensure pixel-perfect delivery."),
    ],
    techStack: ["Figma", "FigJam", "Adobe CC", "Framer", "UsabilityHub / Maze", "Design tokens"],
    whyChoose: [
      w("Design that converts", "We design for user goals and business metrics  not just award-worthy screens."),
      w("Tested, not assumed", "Prototypes are tested with real users, so we improve the design before you pay for development."),
      w("Ship-ready systems", "Token-based design systems and clean handoffs mean developers can build what we drew."),
      w("Accessibility by default", "Contrast, keyboard flow and screen-reader support are part of the design spec."),
    ],
    relatedServices: ["web-development", "mobile-app-development", "social-media"],
    caseStudies: [
      cs("Design system for a fintech product", "Placeholder case study  full write-up with metrics is being finalised.", ["Design System", "Figma", "Fintech"]),
      cs("UX overhaul for a B2B SaaS dashboard", "Placeholder case study  full write-up with metrics is being finalised.", ["UX Research", "SaaS", "Prototyping"]),
    ],
  },
  {
    slug: "it-consulting-strategy",
    title: "IT Consulting & Strategy",
    short:
      "Clear technical direction for ambitious teams  architecture reviews, roadmaps and technology selection.",
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
    overview: [
      "Technology decisions are business decisions, and the cost of getting them wrong compounds for years. We give leadership teams the clarity to choose well: technical due diligence before an acquisition or investment, architecture reviews that separate real risk from noise, and vendor selection grounded in your actual constraints.",
      "We also sit beside you as fractional CTO-style advisors  joining roadmap reviews, translating between business and engineering, and making sure the technical strategy you set is the one that actually gets executed.",
    ],
    features: [
      f("Due diligence & audits", "Technical and security assessments that surface real risk for investors, buyers and boards."),
      f("Stack selection", "Technology choices made for your team, budget and time-to-market  not the trendiest option."),
      f("Transformation strategy", "Pragmatic digital transformation roadmaps that sequence change by business value."),
      f("Product roadmapping", "Prioritised, honest roadmaps that connect features to outcomes and capacity."),
      f("Security & compliance", "Assessments against ISO, GDPR and industry requirements with remediation plans."),
      f("Fractional CTO", "Ongoing senior guidance for teams not yet ready  or not wanting  a full-time CTO."),
    ],
    processSteps: [
      p("01", "Understand", "Interviews, codebase and process review to understand where you are and where you want to be."),
      p("02", "Assess", "Architecture, security, team and tooling assessed against your goals and constraints."),
      p("03", "Recommend", "Clear, written recommendations with options, trade-offs and costs  no jargon for its own sake."),
      p("04", "Plan", "A sequenced roadmap with milestones, owners and measurable outcomes."),
      p("05", "Advise", "Ongoing advisory  roadmap reviews, decision support and execution guidance as you build."),
    ],
    techStack: ["Architecture reviews", "ISO 27001 / GDPR", "Cloud architecture", "Product roadmaps", "Security assessments"],
    whyChoose: [
      w("Vendor-neutral advice", "We're not selling you a platform, a cloud or a tool  our recommendations stand on their own merits."),
      w("Business fluency", "We translate between stakeholders and engineers so decisions stick and teams move."),
      w("Honest about trade-offs", "We tell you what to build, what to buy, what to defer and  sometimes  what to stop."),
      w("Execution support", "Advice is only useful when acted on; we stay to help you implement it."),
    ],
    relatedServices: ["web-development", "cloud-solutions-devops", "ai-automation"],
    caseStudies: [
      cs("Technical due diligence for an acquisition", "Placeholder case study  full write-up with findings summary is being finalised.", ["Due Diligence", "Architecture", "Risk"]),
      cs("Digital transformation roadmap for an enterprise", "Placeholder case study  full write-up with roadmap summary is being finalised.", ["Strategy", "Roadmap", "Enterprise"]),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* AI assistants & content                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    short:
      "Conversational AI that answers, qualifies and converts  24/7 chatbots trained on your business, not generic scripts.",
    description:
      "A chatbot that feels like talking to your best team member. We build AI chatbots trained on your knowledge base, tone and processes  ready to answer questions, qualify leads and hand off to a human the moment it matters, on your website, WhatsApp, Instagram or wherever your customers already are.",
    includes: [
      "Custom AI chatbot development (web & messaging)",
      "Training on your documents, FAQs and data",
      "Lead qualification and appointment booking",
      "Human handoff and escalation workflows",
      "Analytics, transcripts and continuous learning",
      "Multilingual conversation support",
    ],
    overview: [
      "Customers expect answers at midnight, on weekends and across every channel they already use. We build AI chatbots trained on your actual business  your docs, FAQs, policies and tone  so they answer accurately, qualify leads and book appointments without ever sounding like a script.",
      "When the conversation needs a human, the bot knows: seamless handoff with full context, so your team picks up where the bot left off. Every interaction is logged and analysed, and the bot keeps getting better as it learns from real traffic.",
    ],
    features: [
      f("Trained on your business", "Chatbots grounded in your documents, FAQs and processes  not generic internet answers."),
      f("Every channel", "Website, WhatsApp, Instagram and Messenger  meet customers where they already are."),
      f("Lead qualification", "Built-in qualification flows that capture intent, score leads and book meetings."),
      f("Human handoff", "Context-rich escalation to your team the moment it matters  no lost conversations."),
      f("Multilingual", "Conversations in the languages your customers actually speak."),
      f("Learning loop", "Analytics, transcripts and review workflows that continuously improve accuracy."),
    ],
    processSteps: [
      p("01", "Knowledge Mapping", "We inventory your documents, FAQs and processes to define what the bot must master."),
      p("02", "Conversation Design", "Dialogues, qualification flows and tone of voice designed around real user intents."),
      p("03", "Train & Build", "The model is trained and grounded on your data, then wired into your channels."),
      p("04", "Integrate & Handoff", "CRM, calendar and support-tool integrations, plus human-escalation workflows."),
      p("05", "Launch & Learn", "Monitor transcripts, tune responses and expand coverage based on real usage."),
    ],
    techStack: ["OpenAI / Anthropic APIs", "RAG & vector search", "WhatsApp Business API", "Node.js", "CRM integrations", "Analytics"],
    whyChoose: [
      w("Grounded, not generic", "Every answer is anchored to your data, with source references and graceful fallbacks."),
      w("Built to convert", "Qualification, booking and handoff are designed into the flow  not bolted on."),
      w("Your channels", "We deploy where your customers are: web, WhatsApp, Instagram and more."),
      w("Continuous improvement", "Transcript review and analytics turn real traffic into a steadily smarter bot."),
    ],
    relatedServices: ["ai-automation", "generative-ai-content", "crm-systems"],
    caseStudies: [
      cs("WhatsApp support bot for a services company", "Placeholder case study  full write-up with metrics is being finalised.", ["WhatsApp", "Support", "AI"]),
      cs("Lead-qualifying website chatbot for a B2B firm", "Placeholder case study  full write-up with metrics is being finalised.", ["Web", "Lead Gen", "AI"]),
    ],
  },
  {
    slug: "generative-ai-content",
    title: "Generative AI & Content Creation",
    short:
      "Production-grade AI content  copy, images and video that carry your brand voice, created in a fraction of the time and cost.",
    description:
      "Generative AI is only as good as the system around it. We build production-grade content pipelines  brand-trained copy generation, on-brand image creation and repurposing engines that turn one asset into dozens  with human-in-the-loop review so everything that ships stays on-message and on-brand.",
    includes: [
      "Brand-trained copywriting workflows",
      "AI image and video generation pipelines",
      "Content repurposing and localisation",
      "Automated product and catalogue content",
      "Human review and approval workflows",
      "Content performance tracking",
    ],
    overview: [
      "Generative AI can produce more content in an hour than a team can in a week  but only with the right system around it. We build brand-trained pipelines where AI drafts copy, images and video, and your team approves what ships. The result: high-volume content with your voice, your standards and a fraction of the cost.",
      "From repurposing one webinar into a dozen assets to localising catalogues for new markets, we design the workflow, the tools and the review gates so quality never dips as volume rises.",
    ],
    features: [
      f("Brand-trained copy", "Models tuned to your tone, terminology and messaging pillars  consistent across every asset."),
      f("Image & video pipelines", "On-brand visual generation with style guides enforced at the prompt and review level."),
      f("Repurposing engines", "Turn one asset into dozens  webinars to clips, articles to social, ads to emails."),
      f("Localisation at scale", "Translate and culturally adapt content for new markets without losing your voice."),
      f("Human review gates", "Approval workflows that keep a human in control of everything that ships."),
      f("Performance tracking", "Measure which content performs, and feed those learnings back into generation."),
    ],
    processSteps: [
      p("01", "Audit & Brand Training", "We study your voice, audience and best content to train generation on what works."),
      p("02", "Pipeline Design", "Workflows for copy, imagery and video with clear roles for AI and for humans."),
      p("03", "Build & Integrate", "Tools, templates and integrations wired into the platforms your team already uses."),
      p("04", "Review & Refine", "Approval gates, style checks and tuning loops until output needs minimal editing."),
      p("05", "Scale & Track", "Roll out across channels, measure performance and keep improving the system."),
    ],
    techStack: ["OpenAI / Anthropic", "Midjourney / DALL·E", "Runway / ElevenLabs", "n8n / Zapier", "CMS & social APIs", "Analytics"],
    whyChoose: [
      w("Voice is the differentiator", "We train on your brand, so AI content sounds like you  not like generic AI."),
      w("Quality gates built in", "Human review is part of the workflow, not an optional extra."),
      w("Volume without burnout", "Pipelines scale output while protecting your team's energy and standards."),
      w("Measured performance", "Content is tracked against performance, and learnings feed back into generation."),
    ],
    relatedServices: ["social-media", "ai-automation", "ai-chatbots"],
    caseStudies: [
      cs("Content repurposing engine for a media brand", "Placeholder case study  full write-up with metrics is being finalised.", ["Repurposing", "Video", "AI"]),
      cs("Localised catalogue content for a retailer", "Placeholder case study  full write-up with metrics is being finalised.", ["Localisation", "E-commerce", "AI"]),
    ],
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    short:
      "AI agents that don't just answer  they act. Autonomous systems that plan, execute and verify tasks end-to-end, always under your control.",
    description:
      "The next step beyond chatbots. We design agentic AI systems that break complex tasks into steps, use your tools and data, and execute multi-stage work autonomously  from research and drafting to customer operations and system administration  with guardrails, permissions and human oversight built in at every stage.",
    includes: [
      "Agent architecture and workflow design",
      "Tool and API integration for autonomous action",
      "Memory, context and knowledge grounding",
      "Guardrails, permissions and audit trails",
      "Multi-agent orchestration",
      "Monitoring, evaluation and safety review",
    ],
    overview: [
      "Agentic AI moves from answering to acting: systems that plan a task, use your tools and data, execute the steps and verify the result  then hand the outcome to a human for approval. The difference from a chatbot is agency; the difference from chaos is architecture.",
      "We design agents with explicit guardrails, scoped permissions and complete audit trails, orchestrated across multi-step workflows where one agent hands off to the next. You get the efficiency of autonomy with the control of oversight baked into the design.",
    ],
    features: [
      f("Agent architecture", "Clear roles, goals and hand-off design for single and multi-agent systems."),
      f("Tool use", "Agents that call your APIs, databases and SaaS tools to do real work, not just talk."),
      f("Memory & grounding", "Working memory and knowledge grounding that keep agents accurate and on-task."),
      f("Guardrails & permissions", "Scoped access, approval checkpoints and immutable audit trails."),
      f("Multi-agent orchestration", "Complex jobs decomposed across specialised agents with managed hand-offs."),
      f("Evaluation & safety", "Monitoring, evaluation sets and safety reviews that catch drift before it costs you."),
    ],
    processSteps: [
      p("01", "Opportunity Mapping", "We identify the multi-step workflows where autonomous agents deliver real value."),
      p("02", "Architecture", "Agent roles, tools, data access and human-oversight points designed explicitly."),
      p("03", "Build & Integrate", "Agents built and connected to your tools with scoped, auditable permissions."),
      p("04", "Test & Evaluate", "Evaluation sets, edge-case testing and safety reviews before any real workload."),
      p("05", "Deploy & Oversee", "Pilot rollout, monitoring and continuous evaluation as agents take on more."),
    ],
    techStack: ["OpenAI / Anthropic", "LangGraph / LangChain", "Vector databases", "Function calling", "Python / Node.js", "Evaluation tooling"],
    whyChoose: [
      w("Autonomy with oversight", "Agents act, but approvals, permissions and audit trails keep you in control."),
      w("Real tool use", "We connect agents to your actual systems  they do work, not just chat."),
      w("Safety by design", "Guardrails and evaluation are architecture, not add-ons."),
      w("Proven patterns", "We reuse battle-tested orchestration patterns instead of experimental hype."),
    ],
    relatedServices: ["ai-automation", "ai-chatbots", "erp-systems"],
    caseStudies: [
      cs("Research agent for a consultancy", "Placeholder case study  full write-up with metrics is being finalised.", ["Agents", "Research", "Automation"]),
      cs("Operations agent for a customer team", "Placeholder case study  full write-up with metrics is being finalised.", ["Agents", "Operations", "Workflow"]),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Business systems                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "erp-systems",
    title: "ERP Systems",
    short:
      "One source of truth for your whole business  ERP selection, implementation, integration and customisation that fits how you actually work.",
    description:
      "Finance, inventory, HR, procurement and sales scattered across spreadsheets and disconnected tools? We help you consolidate onto an ERP that fits  from platform selection and data migration to implementation, integration and custom development  so every department works from the same real-time numbers.",
    includes: [
      "ERP platform selection and fit analysis",
      "Implementation, configuration and data migration",
      "Integration with existing systems and APIs",
      "Custom modules and workflow development",
      "Staff training and change management",
      "Ongoing support and optimisation",
    ],
    overview: [
      "ERPs fail when they force the business to change more than the problem demands. We take a fit-first approach: analysing how you actually operate, shortlisting platforms that match, and implementing the one that fits  with clean data migration, integrations to your existing tools and custom modules where off-the-shelf falls short.",
      "The implementation isn't the end. Training, change management and ongoing support make sure your team actually adopts the system, and real-time numbers become the single version of the truth for every department.",
    ],
    features: [
      f("Fit-first selection", "Platform shortlisting based on how you operate, not the most heavily marketed suite."),
      f("Clean data migration", "Validated, deduplicated migration from spreadsheets and legacy systems without data loss."),
      f("Integration layer", "APIs and connectors that link the ERP to the rest of your stack."),
      f("Custom modules", "Development where off-the-shelf doesn't fit your unique workflows."),
      f("Training & change management", "Adoption programmes that get real users productive fast."),
      f("Ongoing optimisation", "Support, tuning and process improvement after go-live."),
    ],
    processSteps: [
      p("01", "Fit Analysis", "Process discovery and requirements definition across finance, inventory, HR and sales."),
      p("02", "Selection", "Vendor shortlisting, demos and fit scoring  a recommendation you can defend."),
      p("03", "Implementation", "Configuration, integration and custom development in phased, testable releases."),
      p("04", "Migration & Training", "Validated data migration and hands-on training before you switch over."),
      p("05", "Go-live & Support", "Cutover, stabilisation and ongoing optimisation with your team at the centre."),
    ],
    techStack: ["Odoo", "SAP", "Microsoft Dynamics", "NetSuite", "Zoho One", "REST APIs", "Data migration tooling"],
    whyChoose: [
      w("Fit beats hype", "We recommend the platform that fits your size, industry and way of working  not the biggest name."),
      w("Migration without tears", "Data quality, validation and rollback plans protect your business during the move."),
      w("Adoption is designed in", "Training and change management are part of the project, so the system gets used."),
      w("One accountable partner", "Selection, implementation, integration and support under one roof."),
    ],
    relatedServices: ["crm-systems", "csm-systems", "it-consulting-strategy"],
    caseStudies: [
      cs("ERP consolidation for a trading company", "Placeholder case study  full write-up with metrics is being finalised.", ["ERP", "Migration", "Finance"]),
      cs("Inventory system integration for a distributor", "Placeholder case study  full write-up with metrics is being finalised.", ["Inventory", "Integration", "ERP"]),
    ],
  },
  {
    slug: "csm-systems",
    title: "CSM Systems",
    short:
      "Customer success at scale  CSM platforms that track account health, automate outreach and turn customers into advocates.",
    description:
      "Customer Success Management, done properly. We implement and customise customer success platforms that give you a single view of every account  health scores, onboarding, renewals, churn risk and expansion opportunities  with automated playbooks that trigger the right action at the right moment.",
    includes: [
      "Customer success platform selection and setup",
      "Health scoring and churn-risk modelling",
      "Onboarding and lifecycle automation",
      "Renewal and expansion workflow management",
      "Integration with CRM and support tools",
      "Leadership reporting dashboards",
    ],
    overview: [
      "Growing revenue from existing customers is cheaper and more predictable than acquiring new ones  but only if you can see which accounts need attention before they churn. We implement customer success platforms with health scoring, lifecycle automation and renewal workflows that turn that insight into action.",
      "With integrations to your CRM and support tools, your success team gets one view of every account, automated playbooks that fire at the right moment, and leadership dashboards that show retention and expansion in real time.",
    ],
    features: [
      f("Platform selection", "The right customer success platform for your business model, size and maturity."),
      f("Health scoring", "Data-driven account health models that flag churn risk before it's too late."),
      f("Lifecycle automation", "Automated onboarding, check-ins and outreach timed to the customer journey."),
      f("Renewal workflows", "Structured renewal and expansion plays that protect and grow revenue."),
      f("CRM & support integration", "A single source of truth across success, sales and support tools."),
      f("Leadership dashboards", "Retention, risk and expansion visibility for the whole leadership team."),
    ],
    processSteps: [
      p("01", "Requirements", "We map your customer journey, success metrics and current tooling."),
      p("02", "Selection & Setup", "Platform chosen and configured around your actual lifecycle."),
      p("03", "Health & Automation", "Health scoring models and lifecycle playbooks built and calibrated."),
      p("04", "Integration", "Connected to your CRM, support and billing systems for a unified view."),
      p("05", "Rollout & Optimise", "Team enablement, dashboards and continuous refinement as data comes in."),
    ],
    techStack: ["Gainsight", "ChurnZero", "HubSpot", "Intercom", "Billing systems", "Data pipelines"],
    whyChoose: [
      w("Modelled on your journey", "Health scores and playbooks are built around how your customers actually onboard and renew."),
      w("Actionable, not just visible", "We automate the actions  outreach, alerts, hand-offs  not just the dashboard."),
      w("Integrated truth", "Success, sales and support working from the same real-time account data."),
      w("Retention as a discipline", "We build the system and the habits that make retention measurable and managed."),
    ],
    relatedServices: ["crm-systems", "erp-systems", "ai-automation"],
    caseStudies: [
      cs("Customer success rollout for a SaaS company", "Placeholder case study  full write-up with metrics is being finalised.", ["CSM", "Health Scoring", "SaaS"]),
      cs("Renewal automation for a subscription business", "Placeholder case study  full write-up with metrics is being finalised.", ["Renewals", "Automation", "Retention"]),
    ],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    short:
      "Your sales engine, organised  CRM implementation, customisation and integration that your team will actually use.",
    description:
      "A CRM only works if your team lives in it. We implement and tailor CRM platforms  pipeline management, lead scoring, automation and reporting  and make them genuinely easy to use, so data stays clean, deals move faster and managers see the truth in real time.",
    includes: [
      "CRM platform selection and configuration",
      "Sales pipeline and lead scoring setup",
      "Email and workflow automation",
      "Data migration and cleanup",
      "CRM–marketing and support integrations",
      "Team training and adoption support",
    ],
    overview: [
      "Most CRMs fail not because of the software but because nobody uses it. We implement and tailor CRM platforms around the way your sales team actually works  intuitive pipelines, automated follow-ups and reports that managers trust  then train and support until adoption is real.",
      "From selection and migration to integrations with marketing and support, we make the CRM the reliable nervous system of your sales operation: clean data, faster deals and a single source of truth.",
    ],
    features: [
      f("Right platform, right config", "Selection and configuration shaped around your sales process  not a stock template."),
      f("Pipeline & scoring", "Stages, lead scoring and routing that prioritise the deals worth chasing."),
      f("Automation", "Follow-ups, assignments and alerts that never let a lead go cold."),
      f("Clean migration", "Deduplicated, validated data migration so you start with a trustworthy history."),
      f("Integrations", "Marketing, support and automation tools connected for one view of the customer."),
      f("Adoption support", "Training, playbooks and ongoing help so the system becomes part of the routine."),
    ],
    processSteps: [
      p("01", "Sales Process Review", "We map your pipeline, stages, hand-offs and reporting needs."),
      p("02", "Platform Selection", "Shortlisting and configuration guided by your team's real workflows."),
      p("03", "Build & Automate", "Pipelines, scoring, automations and integrations configured and tested."),
      p("04", "Migrate & Clean", "Data migration with deduplication and validation before switchover."),
      p("05", "Train & Support", "Team enablement, adoption monitoring and ongoing optimisation."),
    ],
    techStack: ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM", "Make / Zapier", "Email & calendar integrations"],
    whyChoose: [
      w("Adoption-first design", "We configure around how your team sells, because an unused CRM is a failed project."),
      w("Clean start", "Data migration and deduplication mean the system begins trustworthy."),
      w("Automation that works", "Follow-ups and scoring are wired into the pipeline, not bolted on."),
      w("We stay until it sticks", "Training and adoption support continue until the team lives in the system."),
    ],
    relatedServices: ["erp-systems", "csm-systems", "ai-chatbots"],
    caseStudies: [
      cs("Sales pipeline rebuild for a B2B team", "Placeholder case study  full write-up with metrics is being finalised.", ["CRM", "Pipeline", "B2B"]),
      cs("CRM integration with marketing automation", "Placeholder case study  full write-up with metrics is being finalised.", ["CRM", "Marketing", "Integration"]),
    ],
  },
];

/** Lookup helper for the detail page and cross-linking. */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/* ------------------------------------------------------------------ */
/* AI flag  shared by ServiceCard, CodeWindow and any other consumer */
/* ------------------------------------------------------------------ */

/** Slugs of AI-focused services (badged / highlighted across the site). */
export const aiServiceSlugs = new Set([
  "ai-powered-applications",
  "ai-automation",
  "ai-chatbots",
  "generative-ai-content",
  "agentic-ai",
]);

/** True when the given service slug is one of the AI-focused services. */
export function isAiService(slug: string): boolean {
  return aiServiceSlugs.has(slug);
}
