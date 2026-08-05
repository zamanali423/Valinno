import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceDetail from "@/components/services/ServiceDetail";
import ProcessFlow from "@/components/services/ProcessFlow";
import CTASection from "@/components/ui/CTASection";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile, cloud and design, plus AI automation, chatbots and ERP/CRM systems — delivered by Velinno, a UAE-based full-stack agency.",
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
        description={`${services.length} disciplines under one roof — from web, mobile and design to AI, automation and business systems — so your product never falls through the cracks between vendors.`}
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
