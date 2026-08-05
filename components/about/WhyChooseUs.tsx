import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion";
import { whyUs } from "@/lib/data";

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              Built To Be Your <span className="text-gradient">Long-Term Partner</span>
            </>
          }
          subtitle="We combine senior engineering, honest communication and a genuine stake in your outcomes."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {whyUs.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/30 hover:shadow-card">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-electric/25 bg-electric/10 text-electric-bright transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
