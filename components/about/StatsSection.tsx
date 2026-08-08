import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/motion";
import { stats } from "@/lib/data";

/**
 * Animated statistics band. Values live in lib/data.ts  replace them
 * with verified company numbers before launch.
 */
export default function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-surface/50">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(30rem 14rem at 15% 0%, rgba(79,124,255,0.12), transparent 60%), radial-gradient(30rem 14rem at 85% 100%, rgba(139,92,246,0.12), transparent 60%)",
        }}
      />
      <div className="container-px relative grid grid-cols-2 gap-y-10 py-14 sm:py-16 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-gradient" />
            </p>
            <p className="mt-2 text-sm font-medium text-ink-muted">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
