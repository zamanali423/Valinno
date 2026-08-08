import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Zap,
  ShieldCheck,
  Layers,
  Gauge,
  Sparkles,
  FileText,
  BadgeCheck,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/motion";
import { services, getServiceBySlug } from "@/lib/services-data";
import type { Service } from "@/types";

// Icons cycled across the “What’s Included” feature grid and “Why Choose” cards.
const featureIcons = [CheckCircle2, Zap, ShieldCheck, Layers, Gauge, Sparkles];
const whyIcons = [BadgeCheck, Users, Clock, TrendingUp];

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.short,
    openGraph: {
      title: `${service.title}  Velinno`,
      description: service.short,
      images: ["/og.svg"],
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = service.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));

  return (
    <>
      <ServiceHero service={service} />

      {/* Overview */}
      <section className="section pt-6 sm:pt-8">
        <div className="container-px grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Overview"
            title={
              <>
                What This <span className="text-gradient">Service Covers</span>
              </>
            }
            className="lg:sticky lg:top-32"
          />
          <div className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            {service.overview.map((paragraph, i) => (
              <Reveal key={i} y={20} delay={i * 0.08}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
            <Reveal y={20} delay={0.2}>
              <p className="text-sm text-ink-faint">
                Prefer to talk it through?{" "}
                <a
                  href="/contact"
                  className="font-semibold text-electric-bright transition-colors hover:text-white"
                >
                  Get a free consultation
                </a>{" "}
                 we reply within one business day.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section pt-4 sm:pt-6">
        <div className="container-px">
          <Reveal y={20}>
            <div className="rounded-3xl border border-white/10 bg-surface/70 p-8 backdrop-blur-sm sm:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <span className="eyebrow">Tech & tools</span>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    The Stack Behind <span className="text-gradient">This Service</span>
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    Battle-tested technologies we reach for when delivering {service.title} 
                    chosen for your goals, not our habits.
                  </p>
                </div>
                <div className="flex max-w-xl flex-wrap gap-2.5">
                  {service.techStack.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-ink transition-all duration-300 hover:border-electric/40 hover:text-white"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What’s included */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="What’s included"
            title={
              <>
                Everything You Need to <span className="text-gradient">Succeed</span>
              </>
            }
            subtitle={`A focused set of capabilities under the ${service.title} umbrella  scoped, planned and delivered by one accountable team.`}
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {service.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <StaggerItem key={feature.title} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/30 hover:shadow-card">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-electric/25 bg-electric/10 text-electric-bright transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Our process */}
      <section className="section bg-surface/30">
        <div className="container-px">
          <SectionHeading
            eyebrow="Our process"
            title={
              <>
                How We <span className="text-gradient">Deliver</span>
              </>
            }
            subtitle="A tailored delivery path for this service  clear stages, weekly visibility and no surprises."
          />
          <div className="mt-16 lg:mt-20">
            <ServiceProcess steps={service.processSteps} />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Why Velinno"
            title={
              <>
                Why Choose Velinno for{" "}
                <span className="text-gradient">{service.title}</span>
              </>
            }
            subtitle="More than capability  a partner that treats your outcomes as the deliverable."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {service.whyChoose.map((point, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <StaggerItem key={point.title} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/30 hover:shadow-card">
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-violet/15 text-violet-bright ring-1 ring-violet/30">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-white">
                      {point.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                      {point.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Case studies */}
      <section className="section bg-surface/30">
        <div className="container-px">
          <SectionHeading
            eyebrow="Case studies"
            title={
              <>
                Related Work, <span className="text-gradient">Coming Soon</span>
              </>
            }
            subtitle="Real engagements are being written up  here’s a preview of what we’ll publish."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16">
            {service.caseStudies.map((study) => (
              <StaggerItem key={study.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/20">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-electric-bright">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                      In progress
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-white">
                    {study.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                    {study.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="section">
          <div className="container-px">
            <SectionHeading
              eyebrow="Keep exploring"
              title={
                <>
                  Related <span className="text-gradient">Services</span>
                </>
              }
              subtitle="Teams often pair this service with the ones below  they’re built to work together."
            />
            <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} compact />
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
