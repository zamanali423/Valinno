import Link from "next/link";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import Button from "./Button";
import { Reveal } from "./motion";
import { siteConfig } from "@/lib/site";

export default function CTASection() {
  return (
    <section className="section" aria-label="Start a project with Velinno">
      <div className="container-px">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl border border-white/10 bg-surface/70 px-6 py-16 text-center backdrop-blur-xl sm:px-12 sm:py-20">
            {/* Animated background glows */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 animate-pulse-soft"
              style={{
                background:
                  "radial-gradient(36rem 20rem at 20% 0%, rgba(79,124,255,0.22), transparent 60%), radial-gradient(36rem 20rem at 80% 100%, rgba(139,92,246,0.2), transparent 60%), radial-gradient(24rem 16rem at 60% 40%, rgba(192,91,255,0.14), transparent 65%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-brand-gradient opacity-20 blur-3xl"
            />

            <Sparkles className="mx-auto h-8 w-8 text-electric-bright" aria-hidden="true" />
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Would You Like to Start a Project <span className="text-gradient">With Us?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Tell us about your idea  an AI-powered application, an automation workflow or a
              complete product build  and we&apos;ll get back to you within one business day with a
              clear plan and a no-obligation quote.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" withArrow>
                Get a Free Quote
              </Button>
              <a
                href={siteConfig.phoneHref}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-electric/50 hover:bg-white/[0.08]"
              >
                <Phone className="h-4 w-4 text-electric-bright" aria-hidden="true" />
                {siteConfig.phone}
              </a>
            </div>

            <p className="mt-6 text-xs text-ink-faint">
              Prefer email?{" "}
              <Link href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1 text-electric-bright transition-colors hover:text-electric-bright/80">
                {siteConfig.email}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
