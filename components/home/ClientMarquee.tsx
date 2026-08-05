import Marquee from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/motion";
import { clientLogos } from "@/lib/data";

/** Infinite scrolling "trusted by" marquee. Replace clientLogos in lib/data.ts. */
export default function ClientMarquee() {
  return (
    <section className="py-14 sm:py-16" aria-label="Trusted by">
      <div className="container-px">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-faint">
            Trusted by ambitious teams
          </p>
        </Reveal>
      </div>
      <Reveal className="mt-8" amount={0.4}>
        <Marquee>
          {clientLogos.map((name) => (
            <span
              key={name}
              className="mx-8 inline-flex select-none items-center gap-2 font-display text-lg font-semibold text-white/25 transition-colors duration-300 hover:text-white/60 sm:mx-12 sm:text-xl"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-electric to-violet" />
              {name}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
