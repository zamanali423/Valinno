import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamCard from "@/components/ui/TeamCard";
import { StaggerGroup } from "@/components/ui/motion";
import { team } from "@/lib/data";

/** "Meet Our Team" — used on the Home page and reused on the About page. */
export default function TeamSection({ showLink = true }: { showLink?: boolean }) {
  return (
    <section id="team" className="section scroll-mt-24 bg-surface/30">
      <div className="container-px">
        <SectionHeading
          eyebrow="Meet Our Team"
          title={
            <>
              The People Behind <span className="text-gradient">The Products</span>
            </>
          }
          subtitle="A senior, hands-on team. Founders, executives and engineers who stay close to the work."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </StaggerGroup>

        {showLink && (
          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-electric-bright transition-colors hover:text-white"
            >
              Learn more about Velinno
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
