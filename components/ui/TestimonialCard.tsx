import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

/** Star row  rendered when the testimonial has a rating (1–5). */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-amber-400 text-amber-400" : "text-white/15"
          )}
        />
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.clientName
    .replace(/[\[\]]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur-sm sm:p-8">
      <div className="flex items-center justify-between">
        <Quote className="h-8 w-8 text-electric/50" aria-hidden="true" />
        {testimonial.rating ? <Stars rating={testimonial.rating} /> : null}
      </div>

      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-4 border-t border-white/[0.08] pt-5">
        {testimonial.clientPhoto ? (
          <Image
            src={testimonial.clientPhoto}
            alt={testimonial.clientName}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover object-top"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-semibold text-white"
          >
            {initials}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.clientName}</p>
          <p className="text-xs text-ink-muted">
            {testimonial.clientRole} · {testimonial.companyName}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
