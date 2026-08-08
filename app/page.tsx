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
    absolute: "Velinno  AI-Powered Software Solutions for Ambitious Businesses",
  },
  description:
    "Velinno is a UAE-based AI-first software development agency building AI-powered applications, intelligent automation and full-stack web, mobile, cloud and design solutions for startups, SMEs and enterprises.",
  openGraph: {
    title: "Velinno  AI-Powered Software Solutions for Ambitious Businesses",
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
