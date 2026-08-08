import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import Logo from "./Logo";
import FooterServices from "./FooterServices";
import { siteConfig } from "@/lib/site";

const socials = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedInIcon },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: InstagramIcon },
  { label: "WhatsApp", href: siteConfig.socials.whatsapp, icon: WhatsAppIcon },
];



export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-surface/60">
      <div className="container-px pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo gradientId="logo-g-footer" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              {siteConfig.tagline}. {siteConfig.subTagline}.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-faint">
              Velinno builds AI-powered applications, intelligent automation and full-stack digital
              solutions for ambitious businesses worldwide.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/40 hover:text-white hover:shadow-glow"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services  responsive accordion linking to detail pages */}
          <FooterServices />

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="group flex items-center gap-3 text-ink-muted transition-colors hover:text-white"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <Phone className="h-4 w-4 text-electric-bright" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-faint">Phone / WhatsApp</span>
                    <span className="font-medium text-white">{siteConfig.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-3 text-ink-muted transition-colors hover:text-white"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <Mail className="h-4 w-4 text-electric-bright" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-faint">Email</span>
                    <span className="font-medium text-white">{siteConfig.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink-muted">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <MapPin className="h-4 w-4 text-electric-bright" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-ink-faint">Address</span>
                  <span className="font-medium text-white">{siteConfig.address}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            {siteConfig.subTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
