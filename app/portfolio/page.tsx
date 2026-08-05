import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "Portfolio & Work",
  description:
    "Explore Velinno's portfolio of web, mobile, cloud and design projects. Filter by category to see the work we're proud of.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={
          <>
            Projects That <span className="text-gradient">Move Businesses Forward</span>
          </>
        }
        description="Web platforms, mobile apps, cloud infrastructure and design systems. Filter by discipline case studies are being finalised and will replace the placeholders shortly."
      />

      <section className="section pt-4 sm:pt-6">
        <PortfolioGrid />
      </section>

      <CTASection />
    </>
  );
}
