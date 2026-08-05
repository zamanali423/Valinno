import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import ClientMarquee from "@/components/home/ClientMarquee";
import Testimonials from "@/components/home/Testimonials";
import TeamSection from "@/components/home/TeamSection";
import CTASection from "@/components/ui/CTASection";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Velinno — Full-Stack Software Solutions for Ambitious Businesses",
  },
  description:
    "Velinno is a UAE-based full-stack software development agency delivering web, mobile, cloud and design solutions for startups, SMEs and enterprises.",
  openGraph: {
    title: "Velinno Full-Stack Software Solutions for Ambitious Businesses",
    description: siteConfig.description,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <PortfolioPreview />
      <ClientMarquee />
      <Testimonials />
      <TeamSection />
      <CTASection />
    </>
  );
}
