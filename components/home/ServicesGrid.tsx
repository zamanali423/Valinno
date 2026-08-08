import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { StaggerGroup } from "@/components/ui/motion";
import { services } from "@/lib/services-data";

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
          subtitle={`At Velinno, we deliver AI-powered applications, intelligent workflows, chatbots and automation alongside smart software, mobile apps and web platforms  all ${services.length} disciplines under one accountable team.`}
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
