import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion";
import { projects } from "@/lib/data";

export default function PortfolioPreview() {
  const featured = projects.slice(0, 4);

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
            subtitle="A selection of web, mobile, cloud and design projects. Case studies are placeholders the real ones are coming."
          />
          <Link
            href="/portfolio"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-electric-bright transition-colors hover:text-white"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
