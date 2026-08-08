import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { getFeaturedProjects } from "@/lib/portfolio-data";

export default function PortfolioPreview() {
  const featured = getFeaturedProjects();

  return (
    <section id="work" className="section scroll-mt-24 bg-surface/30">
      <div className="container-px">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Our Work"
            title={
              <>
                Products We&apos;re <span className="text-gradient">Proud Of</span>
              </>
            }
            subtitle="A selection of AI-powered applications, web platforms, mobile apps, cloud infrastructure and design systems. Full case studies are being finalised."
          />
          <Link
            href="/portfolio"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-electric-bright transition-colors hover:text-white"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Explore more */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-electric/50 hover:bg-white/[0.08]"
          >
            Explore More Work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
