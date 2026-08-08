# Velinno  Company Website

Modern, fully responsive marketing site for **Velinno**, a UAE-based AI-first software
development agency. This is a complete rebuild of the previous WordPress template site,
built with the Next.js App Router and designed to be hosted on your own Node.js server.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom brand theme (deep navy base, blue→purple gradient accents, glassmorphism)
- **Framer Motion** for scroll-triggered reveals, stagger animations, hover/tilt micro-interactions, the testimonial carousel and filter reflow animations
- **lucide-react** for icons
- **zod + react-hook-form** for shared, type-safe form validation (client & server)
- **Resend** (with **Nodemailer/SMTP** fallback) for contact-form email delivery
- **Supabase** (optional) for lead backup storage
- Self-hosted **Inter + Space Grotesk** fonts (`next/font/local`)  no external font CDN at runtime or build time
- `next/image` for all images (SVG placeholders allowed via `dangerouslyAllowSVG` in `next.config.mjs`)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build (required before `next start`):

```bash
npm run build
npm start          # serves the production build on :3000
```

### Deploy on your own server (Node.js)

```bash
npm ci
npm run build
npx pm2 start "npm run start" --name velinno
# or
npx pm2 start npm --name velinno -- start
```

Point your reverse proxy (nginx/caddy) at port 3000. The site is a server-rendered app 
**do not** use `next export` / static export.

## Project Structure

```
app/
  layout.tsx        # Root layout, fonts, global metadata (OG / Twitter / keywords)
  page.tsx          # Home page (hero, services, portfolio preview, team, CTA)
  about/  contact/  portfolio/  services/   # Static + dynamic pages
  services/[slug]/  # 13 service detail pages (generateStaticParams)
  portfolio/[slug]/ # 8 case-study pages (generateStaticParams)
  api/contact/route.ts   # POST /api/contact  validation, honeypot, rate limit, email + DB
  sitemap.ts  robots.ts  # SEO

components/
  layout/             # Navbar, Footer, FooterServices (responsive accordion), Logo, BackgroundFX
  ui/                 # Button, SectionHeading, cards (ServiceCard, ProjectCard, TeamCard…), Reveal/Stagger, Marquee, CTASection, PageHero, AnimatedCounter
  home/  about/  services/  portfolio/  contact/

lib/
  site.ts             # Site-wide config (contact details, socials, nav, tagline)
  data.ts             # Team, testimonials, stats, why-us, client logos, global process steps
  services-data.ts    # All 13 services + detail-page content (single source of truth)
  service-icons.ts    # Slug → lucide icon map for services
  portfolio-data.ts   # All portfolio projects + case-study content (single source of truth)
  mailer.ts             # Type-safe Nodemailer transport factory (server-only env vars)
  email-template.ts     # Premium HTML email templates (lead notification + auto-reply)
  contact-form-schema.ts # Shared Zod schema + types for the contact form (client & server)
  supabase.ts           # Server-side Supabase admin client for lead storage (optional)
  animations.ts         # Framer Motion variants + EASE curve
  utils.ts              # cn()  clsx + tailwind-merge

types/                # Shared TypeScript types
public/images/portfolio/  # Slug-named project thumbnails (SVG mockups; swap for real screenshots)
```

## Where to Replace Placeholder Content

All editable content lives in **four data files**  no component code changes needed:

| File | Holds | Notes |
| --- | --- | --- |
| `lib/site.ts` | Contact details, socials, nav, tagline | Replace phone/email/address/social URLs |
| `lib/services-data.ts` | 13 services + detail pages | Overview, features, process, tech stack, related services, case studies |
| `lib/portfolio-data.ts` | 8 projects + case-study pages | See the **Portfolio** section below |
| `lib/data.ts` | Team, testimonials, stats, why-us, logos, process steps | Team names are real; bios/stats/quotes are placeholders |

### `lib/site.ts`  site-wide config

| Item | Key | Notes |
| --- | --- | --- |
| Phone number | `phone` / `phoneHref` | Real number already set: `+971-55-3693942` |
| Email | `email` | Currently `hello@velinno.com`  set the real inbox |
| Address | `address` | Placeholder: `Business Bay, Dubai, UAE`  set the official one |
| LinkedIn / Instagram | `socials.linkedin` / `socials.instagram` | `"#"` until real profile URLs are added |
| WhatsApp | `socials.whatsapp` | `wa.me` link already wired to the real number |
| Map embed | `mapEmbedSrc` | Google Maps `output=embed` URL for the real office |
| Navigation | `navLinks` | Add/remove links here |

### `lib/data.ts`  team, testimonials, stats

| Content | Key | Notes |
| --- | --- | --- |
| Team | `team` | **Real members already set** (Shahid, Abid, Zaman, Asim Mirza). Bios are placeholders  replace the `bio` strings. Add photos later in `TeamCard` (initials avatars shown for now) |
| Testimonials | `testimonials` | Clearly marked placeholders  replace quotes and author names |
| Client logos | `clientLogos` | Replace with real client/brand names |
| Stats | `stats` | Replace with **verified** company numbers before launch |
| Why-us cards | `whyUs` | 7 cards incl. “AI-Driven Innovation” |
| Global process | `processSteps` | Discover → Define → Design → Develop → Deploy → Deliver |

## Services (`/services` and `/services/[slug]`)

- The services list page (`/services`) renders all 13 disciplines with deep-link anchors and a “View full details” link per section.
- **Every service has its own detail page** (`/services/ai-automation`, `/services/ai-chatbots`, etc.) generated from `lib/services-data.ts` via `generateStaticParams`  animated hero, overview, feature grid, tailored process stepper, tech stack, why-choose-us, related services and a case-studies preview.
- Cards on the home grid, the footer, and the related-services rows all deep-link to these pages.
- **Edit copy in one place**: `lib/services-data.ts`. Each entry carries `slug`, `title`, `short`, `description`, `includes`, `overview[]`, `features[]`, `processSteps[]`, `techStack[]`, `whyChoose[]`, `relatedServices[]` and `caseStudies[]`.

## Portfolio (`/portfolio` and `/portfolio/[slug]`)

Portfolio content is **fully data-driven** and split across two places:

| What | Where |
| --- | --- |
| Project copy & metrics | `lib/portfolio-data.ts` |
| Thumbnails | `public/images/portfolio/<slug>.svg` |

- The `/portfolio` page is a **filterable grid** (All / Web / Mobile / Cloud / AI / UI/UX) with animated filter pills, `layout` reflow animations and scroll-triggered stagger.
- The home page shows up to **4 `featured` projects** in a responsive preview grid.
- Every project links to a **case-study page** (`/portfolio/[slug]`) with hero image, overview, challenge/solution/results, tech stack and CTA  all driven by the same data file.

### Replacing placeholder projects with real client work

1. **Drop real screenshots into `public/images/portfolio/`** using the **exact same filename as the project slug** (e.g. `fintrack.svg` → `fintrack.png`). No code changes are needed  the path is derived from `slug` in the data file.
2. **Keep thumbnails landscape, 16:10** (the card grid uses `aspect-[16/10]`). Swap the file and the grid, home preview and case-study hero all update automatically.
3. **Edit `lib/portfolio-data.ts`**: replace the `description`, `overview`, `challenge`, `solution` and `results` placeholder copy with client-approved write-ups and **verified metrics**. Mark projects `featured: true` (max 4) to show them on the home page.
4. The detail pages at `/portfolio/[slug]` are generated from the same data  nothing to update in components.

> **Note on SVG placeholders**: the generated thumbnails must start with `<?xml` and declare `width`/`height` or Next.js's image optimizer rejects them with a 400 (it recognizes SVGs only by the `<?xml` magic bytes). Real JPEG/PNG screenshots don't have this constraint.

## Contact Form

The contact form (`components/contact/ContactForm.tsx`) is a production-ready,
fully functional submission pipeline: client validation → API route → email +
optional database backup.

### How it works

1. **Form & client validation**  React Hook Form + `@hookform/resolvers/zod` drive
   the form. Validation rules live in **one place**: `lib/contact-form-schema.ts`
   (a Zod schema + inferred `ContactFormValues` type) shared by the client and the
   API route, so logic is never duplicated. Inline per-field errors, a subtle
   shake on invalid submit, a disabled submit button while invalid/submitting,
   and full loading/success/error UX states are all handled in the component.
2. **Honeypot**  a visually-hidden off-screen `website` field (not
   `display:none`) is rendered for bots. If it contains a value, the API silently
   returns a fake success response  no email, no storage, no log entry.
3. **API route** (`app/api/contact/route.ts`, `POST /api/contact`)  re-validates
   every payload with the **same Zod schema** (never trusts the client), then:
   - applies **rate limiting** (in-memory, max 5 submissions per IP per 10 minutes → `429`);
   - **stores the lead** in Supabase (`contact_submissions` table) *first*, so
     leads are never lost to email failures;
   - sends a **team notification email** (Resend, or Nodemailer/SMTP fallback)
     with all fields, and an **auto-reply confirmation** to the submitter.
4. **Graceful degradation**  if `RESEND_API_KEY`/SMTP or `SUPABASE_URL` are
   missing, the route logs a clear server-side warning and continues with whatever
   channel is available. It never crashes at boot and never leaks env values or
   raw errors to the client.

### Setup

1. Install dependencies:

   ```bash
   npm install zod react-hook-form @hookform/resolvers @supabase/supabase-js nodemailer
   npm install -D @types/nodemailer
   ```

2. **Copy `.env.example` to `.env.local`** and fill in your values (git-ignored 
   never commit secrets; mirror them in your hosting provider's environment dashboard):

   **Email  option A (recommended): Resend**

   ```bash
   RESEND_API_KEY=re_...                 # https://resend.com/api-keys
   RESEND_FROM="Velinno <hello@velinno.com>"  # must be a verified domain in Resend
   ```

   **Email  option B: Nodemailer / SMTP** (used when `RESEND_API_KEY` is empty)

   ```bash
   SMTP_HOST=smtp.your-provider.com   # e.g. smtp.gmail.com, smtp.zoho.com
   SMTP_PORT=465                      # 465 = implicit TLS · 587/2525 = STARTTLS
   SMTP_USER=hello@velinno.com        # authenticated sender (becomes "From")
   SMTP_PASS=your-smtp-password       # app password for the sender account
   SMTP_SECURE=                       # optional: "true"/"false" overrides the port default
   ```

   **Gmail (smtp.gmail.com)  quick start**

   Gmail blocks normal account passwords for SMTP. You must use an **App
   Password**: Google Account → Security → turn on **2-Step Verification** →
   Security → **App passwords** → create one for “Mail”. Then set:

   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465            # or 587 (STARTTLS)  both work with Gmail
   SMTP_USER=your.address@gmail.com   # FULL Gmail address
   SMTP_PASS=xxxxxxxxxxxxxxxx         # 16-char app password, no spaces
   CONTACT_RECEIVER_EMAIL=your.address@gmail.com  # where submissions land
   ```

   Verify your credentials **without sending an email**:

   ```bash
   npm run check:smtp
   ```

   This connects and authenticates via Nodemailer and prints a clear success
   or Gmail-specific failure hint (app password, 2FA, wrong port).

   **Recipient + optional database backup**

   ```bash
   CONTACT_RECEIVER_EMAIL=hello@velinno.com  # inbox that receives submissions
   SUPABASE_URL=https://xyz.supabase.co     # optional  see below
   SUPABASE_SERVICE_ROLE_KEY=eyJ...         # optional  service-role key, server-only
   ```

3. **Create the `contact_submissions` table** (only if using Supabase). Run this
   SQL in the Supabase SQL editor:

   ```sql
   create table if not exists contact_submissions (
     id uuid primary key default gen_random_uuid(),
     full_name text not null,
     email text not null,
     phone text,
     company_name text,
     project_type text not null,
     budget_range text,
     timeline text,
     message text not null,
     consent boolean not null default false,
     created_at timestamptz not null default now()
   );

   alter table contact_submissions enable row level security;
   -- Allow inserts only via the service-role key (the API route's client):
   create policy "Service role can insert" on contact_submissions
     for insert with check (true);
   ```

4. Restart the dev server so Next.js loads the new env vars, then submit the form
   or test the route directly:

   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"website":"","fullName":"Test User","email":"test@example.com","phone":"","companyName":"","projectType":"Web Development","budgetRange":"$5k - $15k","timeline":"1-3 months","message":"Hello Velinno  we would like a quote for a new website.","consent":true}'
   ```

   > **Dev tip**: without valid email/DB keys configured, the route logs a clear
   > server-side warning and returns `200` after storing/sending what it can.

### API route contract (`POST /api/contact`)

Accepts a JSON body matching `ContactFormValues` (see `lib/contact-form-schema.ts`)
 `fullName`, `email`, `phone?`, `companyName?`, `projectType`, `budgetRange?`,
`timeline?`, `message`, `consent`, `website` (honeypot)  and returns:

| Status | Body |
| --- | --- |
| `200` | `{ "success": true, "message": "..." }`  accepted (or honeypot fake-success) |
| `400` | `{ "success": false, "message": "...", "fields": {...} }`  validation / malformed JSON |
| `429` | `{ "success": false, "message": "..." }`  rate limited (5/IP/10 min) |
| `500` | `{ "success": false, "message": "..." }`  storage + delivery both failed |

## Footer

- The footer's **Services column is a responsive accordion**: collapsible on mobile
  (tap the “Services” heading), a plain vertical list from `md` up  powered by
  `components/layout/FooterServices.tsx`. Every entry links to its service detail page.
- Quick links, contact info and socials live in `components/layout/Footer.tsx`.

## SEO

- **Sitemap**: `app/sitemap.ts` auto-generates URLs for every service and case-study page from the data files.
- **Meta title/description per page**: each page file exports its own `metadata` (service and case-study pages generate theirs dynamically via `generateMetadata`).
- Replace the `metadataBase` URL in `app/layout.tsx` if the site isn't hosted at `velinno.com`.

## Notes

- **OG share image**: `public/og.svg`  replace with a 1200×630 **PNG/JPG** before launch (some platforms ignore SVG). Reference: `metadata.openGraph.images` in `app/layout.tsx`.
- **Favicon**: real logo mark served from `app/icon.png`, `app/apple-icon.png` and `app/favicon.ico` (generated by `scripts/gen-favicon.mjs`).
- The site is dark-themed by design (premium tech-studio aesthetic); the palette is defined in `tailwind.config.ts` and `app/globals.css`.
- Content is AI-first in positioning: AI automation, chatbots, generative AI and agentic AI are flagship services layered on the full-stack core, and that messaging carries through the hero, about, footer and metadata.
