import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { StaggerGroup } from "@/components/ui/motion";
import { services } from "@/lib/data";

export default function ServicesGrid() {
  return (
    <section id="services" className="section scroll-mt-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              How Can We <span className="text-gradient">Help You?</span>
            </>
          }
          subtitle={`${services.length} disciplines, one accountable team. Whatever stage your product is at, we have the expertise to move it forward.`}
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
