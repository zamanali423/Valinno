import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceDetail from "@/components/services/ServiceDetail";
import ProcessFlow from "@/components/services/ProcessFlow";
import CTASection from "@/components/ui/CTASection";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI-powered applications, AI automation, AI chatbots, agentic AI and generative AI, plus web, mobile, cloud, ERP/CRM systems and design  delivered by Velinno, a UAE-based AI-first full-stack agency.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Everything You Need to <span className="text-gradient">Ship & Scale</span>
          </>
        }
        description={`From AI-powered applications and intelligent automation to web, mobile and cloud development  ${services.length} disciplines under one roof, so your product never falls through the cracks between vendors.`}
      />

      {/* Process overview */}
      <section className="section pt-8 sm:pt-10">
        <div className="container-px">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From Inquiry to <span className="text-gradient">Delivery</span>
              </>
            }
            subtitle="Every engagement follows the same clear path you always know where your project stands."
          />
          <div className="mt-16">
            <ProcessFlow />
          </div>
        </div>
      </section>

      {/* Service details */}
      <div className="mt-8">
        {services.map((service, index) => (
          <ServiceDetail key={service.slug} service={service} index={index} />
        ))}
      </div>

      <CTASection />
    </>
  );
}
