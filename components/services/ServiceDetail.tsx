import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { getServiceIcon } from "@/lib/service-icons";
import { Reveal } from "@/components/ui/motion";

interface ServiceDetailProps {
  service: Service;
  index: number;
}

export default function ServiceDetail({ service, index }: ServiceDetailProps) {
  const Icon = getServiceIcon(service.slug);
  const reversed = index % 2 === 1;

  return (
    <section id={service.slug} className="section scroll-mt-24 border-t border-white/[0.06] first:border-t-0">
      <div className="container-px">
        <div
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            reversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Visual / icon panel */}
          <Reveal
            y={reversed ? -24 : 24}
            x={reversed ? -32 : 32}
            amount={0.3}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/70 p-10 backdrop-blur-sm sm:p-14">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-gradient opacity-20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-electric/20 blur-3xl"
              />
              <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-brand-gradient shadow-glow">
                <Icon className="h-12 w-12 text-white" aria-hidden="true" />
              </div>
              <p className="relative mt-8 font-display text-7xl font-semibold leading-none text-white/10">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal y={20}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {service.title}
              </h2>
            </Reveal>
            <Reveal y={20} delay={0.08}>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                {service.description}
              </p>
            </Reveal>

            <Reveal y={20} delay={0.16}>
              <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-white">
                What&apos;s included
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-electric/15 text-electric-bright">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal y={20} delay={0.24}>
              <Link
                href={`/services/${service.slug}`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-electric-bright transition-colors hover:text-white"
              >
                View full details
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
