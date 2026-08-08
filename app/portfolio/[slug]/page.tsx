import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Target, Lightbulb, TrendingUp, CalendarDays, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion";
import { projects, getProjectBySlug, portfolioThumbBlur } from "@/lib/portfolio-data";
import type { ProjectCategory } from "@/types";

const categoryStyles: Record<ProjectCategory, string> = {
  Web: "bg-electric/15 text-electric-bright ring-electric/30",
  Mobile: "bg-violet/15 text-violet-bright ring-violet/30",
  Cloud: "bg-cyan-400/15 text-cyan-300 ring-cyan-400/30",
  AI: "bg-fuchsia/15 text-fuchsia ring-fuchsia/30",
  "UI/UX": "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
};

interface PortfolioProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PortfolioProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Case Study Not Found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title}  Velinno`,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

export default function PortfolioProjectPage({ params }: PortfolioProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(40rem 24rem at 70% 0%, rgba(79,124,255,0.14), transparent 60%), radial-gradient(30rem 20rem at 20% 10%, rgba(139,92,246,0.1), transparent 60%)",
          }}
        />
        <div className="container-px">
          <Reveal y={12}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-ink-muted backdrop-blur transition-all duration-300 hover:border-electric/40 hover:text-white"
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              Back to Portfolio
            </Link>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Copy */}
            <div>
              <Reveal y={20}>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${categoryStyles[category]}`}
                    >
                      {category}
                    </span>
                  ))}
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-ink-muted">
                    {project.industry}
                  </span>
                </div>
              </Reveal>

              <Reveal y={26} delay={0.08}>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {project.title.split("  ").map((part, i, arr) => (
                    <span key={`${part}-${i}`} className="block">
                      {i === arr.length - 1 ? (
                        <span className="text-gradient">{part}</span>
                      ) : (
                        part
                      )}
                    </span>
                  ))}
                </h1>
              </Reveal>

              <Reveal y={20} delay={0.18}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  {project.description}
                </p>
              </Reveal>

              <Reveal y={20} delay={0.28}>
                <div className="mt-7 flex flex-wrap gap-6 text-sm text-ink-muted">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-electric-bright" aria-hidden="true" />
                    {project.year}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-electric-bright" aria-hidden="true" />
                    {project.duration}
                  </span>
                </div>
              </Reveal>

              <Reveal y={20} delay={0.38}>
                <div className="mt-9">
                  <Button href="/contact" withArrow>
                    Start a Project Like This
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Hero image */}
            <Reveal y={30} delay={0.15} className="lg:sticky lg:top-28">
              <div className="gradient-border relative overflow-hidden rounded-3xl border border-white/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title}  project thumbnail`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    placeholder="blur"
                    blurDataURL={portfolioThumbBlur}
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section pt-6 sm:pt-8">
        <div className="container-px grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Overview"
            title={
              <>
                The <span className="text-gradient">Project</span>
              </>
            }
            className="lg:sticky lg:top-32"
          />
          <div className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            {project.overview.map((paragraph, i) => (
              <Reveal key={i} y={20} delay={i * 0.08}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / Solution / Results */}
      <section className="section bg-surface/30">
        <div className="container-px">
          <SectionHeading
            eyebrow="The breakdown"
            title={
              <>
                Challenge, Solution <span className="text-gradient">& Results</span>
              </>
            }
            subtitle="How we approached the problem, what we built and the outcomes we're tracking."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            <StaggerItem className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm transition-all duration-300 hover:border-rose-400/30 hover:shadow-card">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-rose-400/10 text-rose-400 ring-1 ring-rose-400/30">
                  <Target className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                  The Challenge
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{project.challenge}</p>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm transition-all duration-300 hover:border-electric/30 hover:shadow-card">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-electric/10 text-electric-bright ring-1 ring-electric/30">
                  <Lightbulb className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                  Our Solution
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{project.solution}</p>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full sm:col-span-2 lg:col-span-1">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30 hover:shadow-card">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/30">
                  <TrendingUp className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                  Results
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.results.map((result) => (
                    <li key={result.label} className="flex items-baseline gap-2 text-sm text-ink-muted">
                      <span className="font-display text-base font-bold text-emerald-300">
                        {result.value}
                      </span>
                      <span className="leading-snug">{result.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section">
        <div className="container-px">
          <Reveal y={20}>
            <div className="rounded-3xl border border-white/10 bg-surface/70 p-8 backdrop-blur-sm sm:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <span className="eyebrow">Tech stack</span>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Built With <span className="text-gradient">Modern Tools</span>
                  </h2>
                </div>
                <div className="flex max-w-xl flex-wrap gap-2.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-ink transition-all duration-300 hover:border-electric/40 hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
