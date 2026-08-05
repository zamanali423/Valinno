import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import StatsSection from "@/components/about/StatsSection";
import ProcessTimeline from "@/components/about/ProcessTimeline";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import TeamSection from "@/components/home/TeamSection";
import CTASection from "@/components/ui/CTASection";
import { Reveal } from "@/components/ui/motion";
import { Target, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Velinno is a UAE-based full-stack software development agency delivering web, mobile, cloud and design solutions for startups and enterprises.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Velinno"
        title={
          <>
            Innovating the <span className="text-gradient">Future of Technology</span>
          </>
        }
        description="A UAE-based full-stack software agency that helps startups, SMEs and enterprises turn ambitious ideas into dependable digital products."
      />

      {/* Who we are / Mission */}
      <section className="section pt-10 sm:pt-12">
        <div className="container-px grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal y={24}>
            <div>
              <span className="eyebrow">Who We Are</span>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                A Full-Stack Partner, <span className="text-gradient">Not Just a Vendor</span>
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                <p>
                  Velinno is a software development agency based in Dubai, United Arab Emirates.
                  We design, build and operate digital products for businesses that take growth
                  seriously from early-stage startups shipping their first MVP to established
                  enterprises modernising legacy systems.
                </p>
                <p>
                  Our team spans engineering, design and strategy. That means one accountable
                  group handles your entire journey: product thinking, user experience, software
                  architecture, cloud infrastructure and everything in between.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal y={24} delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-surface/70 p-8 backdrop-blur-sm sm:p-10">
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient shadow-glow">
                  <Target className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">
                  Our Mission
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  To give ambitious businesses the engineering muscle of a large technology
                  partner with the speed, care and transparency of a senior in-house team
                  and to ship software that genuinely moves the needle, not just code that
                  ticks boxes.
                </p>
              </div>
              <div className="border-t border-white/[0.08] pt-8">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet/15 text-violet-bright ring-1 ring-violet/30">
                  <Rocket className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">
                  How We Work
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  Agile sprints, weekly demos, honest timelines. You always know what&apos;s being
                  built, what&apos;s next and what it costs no surprises, no black boxes.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsSection />

      {/* Process */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Our Process"
            title={
              <>
                From Idea to Launch in <span className="text-gradient">Six Steps</span>
              </>
            }
            subtitle="A proven delivery framework clear at every stage, from the first discovery call to long after launch."
          />
          <div className="mt-16 lg:mt-20">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <TeamSection showLink={false} />

      <CTASection />
    </>
  );
}
