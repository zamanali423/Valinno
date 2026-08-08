import type { Testimonial } from "@/types";

/* ------------------------------------------------------------------ */
/* Testimonials  placeholders, clearly marked for replacement        */
/* ------------------------------------------------------------------ */
// TODO: Replace with real, client-approved testimonials before launch.
// Swap clientName / clientRole / companyName with the client's real details,
// drop a photo in /public/images/testimonials/ and set clientPhoto (an initials
// avatar is shown while clientPhoto is undefined). rating is optional (1–5).

export const testimonials: Testimonial[] = [
  {
    clientName: "[Placeholder: Client Name]",
    clientRole: "Founder",
    companyName: "[Placeholder: Company]",
    quote:
      "Working with Velinno's team transformed how we approach [product/process]  their AI automation work saved us significant time every week, and the handover was seamless.",
    rating: 5,
  },
  {
    clientName: "[Placeholder: Client Name]",
    clientRole: "Product Manager",
    companyName: "[Placeholder: Company]",
    quote:
      "From the first discovery call to launch, Velinno kept us informed at every step. The [web/mobile] platform they shipped is fast, reliable and exactly what our users needed.",
    rating: 5,
  },
  {
    clientName: "[Placeholder: Client Name]",
    clientRole: "CEO",
    companyName: "[Placeholder: Company]",
    quote:
      "Velinno doesn't just build software  they act like a partner who cares about outcomes. Their team helped us turn a rough idea into a polished, scalable product.",
    rating: 5,
  },
  {
    clientName: "[Placeholder: Client Name]",
    clientRole: "Operations Director",
    companyName: "[Placeholder: Company]",
    quote:
      "What stood out was the transparency. Weekly demos, honest timelines, and a team that genuinely understands both engineering and business.",
    rating: 4,
  },
];
