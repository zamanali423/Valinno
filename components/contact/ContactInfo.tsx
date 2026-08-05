import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/ui/motion";

const socials = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedInIcon },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: InstagramIcon },
  { label: "WhatsApp", href: siteConfig.socials.whatsapp, icon: WhatsAppIcon },
];

export default function ContactInfo() {
  return (
    <Reveal y={24} amount={0.2}>
      <div className="flex h-full flex-col gap-6">
        <div className="rounded-3xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm sm:p-8">
          <h2 className="font-display text-xl font-semibold tracking-tight text-white">
            Get in touch
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Prefer to talk? Call or message us we usually reply within a few hours on business days.
          </p>

          <ul className="mt-7 space-y-5">
            <li>
              <a href={siteConfig.phoneHref} className="group flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-electric/40 group-hover:shadow-glow">
                  <Phone className="h-5 w-5 text-electric-bright" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-ink-faint">Phone / WhatsApp</span>
                  <span className="text-sm font-semibold text-white transition-colors group-hover:text-electric-bright">
                    {siteConfig.phone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="group flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-electric/40 group-hover:shadow-glow">
                  <Mail className="h-5 w-5 text-electric-bright" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-ink-faint">Email</span>
                  <span className="text-sm font-semibold text-white transition-colors group-hover:text-electric-bright">
                    {siteConfig.email}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                <MapPin className="h-5 w-5 text-electric-bright" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-ink-faint">Address</span>
                <span className="text-sm font-semibold text-white">{siteConfig.address}</span>
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Clock className="h-5 w-5 text-electric-bright" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-ink-faint">Business hours</span>
                <span className="text-sm font-semibold text-white">Sun – Thu, 9:00 – 18:00 (GST)</span>
              </span>
            </li>
          </ul>

          <div className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-6">
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
            <span className="ml-auto text-xs text-ink-faint">Follow us</span>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="relative min-h-56 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-surface/70">
          <iframe
            title="Velinno office location map"
            src={siteConfig.mapEmbedSrc}
            className="absolute inset-0 h-full w-full grayscale-[0.4] opacity-80 transition-opacity duration-500 hover:opacity-100"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-surface/90 px-4 py-2.5 backdrop-blur-lg">
            <MapPin className="h-4 w-4 text-electric-bright" aria-hidden="true" />
            <span className="text-xs font-semibold text-white">
              Dubai, UAE{" "}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-ink-faint" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
