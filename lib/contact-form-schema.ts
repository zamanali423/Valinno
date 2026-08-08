import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Shared option lists (used by the form AND the API route)           */
/* ------------------------------------------------------------------ */

export const PROJECT_TYPES = [
  "AI Automation",
  "AI Chatbot Development",
  "Generative AI / Content",
  "Agentic AI Solutions",
  "Web Development",
  "Mobile App Development",
  "Cloud Solutions & DevOps",
  "UI/UX Design",
  "IT Consulting",
  "Other",
] as const;

export const BUDGET_RANGES = ["Under $5k", "$5k - $15k", "$15k - $50k", "$50k+", "Not sure yet"] as const;

export const TIMELINES = ["ASAP", "1-3 months", "3-6 months", "Just exploring"] as const;

/* ------------------------------------------------------------------ */
/* Zod schema  single source of truth for client AND server          */
/* ------------------------------------------------------------------ */

/** Optional enum helper: allows the empty string (unselected) or undefined. */
function optionalEnum<T extends readonly [string, ...string[]]>(values: T) {
  return z.union([z.enum(values), z.literal("")]).optional();
}

export const contactFormSchema = z.object({
  // Honeypot  hidden from real users. Must stay empty; bots that fill it in
  // are silently dropped by the API route.
  website: z.string().max(0).optional().or(z.literal("")),

  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(120, "Name must be 120 characters or fewer."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("That email doesn't look right  please check it.")
    .max(254, "Email must be 254 characters or fewer."),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or fewer.")
    .optional()
    .or(z.literal("")),

  companyName: z
    .string()
    .trim()
    .max(120, "Company name must be 120 characters or fewer.")
    .optional()
    .or(z.literal("")),

  // The form's select starts on an empty "Select a service" option, so the
  // schema accepts "" then rejects it via refine  the empty value never
  // reaches the server as a valid submission.
  projectType: z
    .union([z.enum(PROJECT_TYPES), z.literal("")])
    .refine((value) => value !== "", { message: "Please choose a project type." }),

  budgetRange: optionalEnum(BUDGET_RANGES),

  timeline: optionalEnum(TIMELINES),

  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(5000, "Please keep your message under 5000 characters."),

  // boolean input so RHF's unchecked default (`false`) types correctly; the
  // refine enforces agreement on submit.
  consent: z.boolean().refine((value) => value === true, {
    message: "Please agree to be contacted regarding your inquiry.",
  }),
});

/**
 * Form values as typed by the FORM (input type). The form starts on empty
 * sentinel values ("" / false), so the input type  not the narrowed output
 * type  is what React Hook Form should be generic over. The API route
 * re-validates with the same schema and uses the parsed (output) data.
 */
export type ContactFormValues = z.input<typeof contactFormSchema>;

/** Parsed (validated) payload type the API route works with after safeParse. */
export type ContactFormData = z.output<typeof contactFormSchema>;
