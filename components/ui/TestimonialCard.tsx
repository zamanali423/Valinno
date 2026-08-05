import { Quote } from "lucide-react";
import type { Testimonial } from "@/types";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm sm:p-8">
      <Quote className="h-8 w-8 text-electric/50" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-white/[0.08] pt-5">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-semibold text-white"
        >
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.author}</p>
          <p className="text-xs text-ink-muted">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
