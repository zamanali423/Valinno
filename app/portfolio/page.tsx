import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "Portfolio & Work",
  description:
    "Explore Velinno's portfolio of AI-powered applications, web, mobile, cloud and design projects. Filter by category to see the work we're proud of.",
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
        description="AI-powered applications, web platforms, mobile apps, cloud infrastructure and design systems. Filter by discipline and explore the full case-study breakdown for each project."
      />

      <section className="section pt-4 sm:pt-6">
        <PortfolioGrid />
      </section>

      <CTASection />
    </>
  );
}
