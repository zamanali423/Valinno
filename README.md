# Velinno — Company Website

Modern, fully responsive marketing site for **Velinno**, a UAE-based full-stack software
development agency. This is a complete rebuild of the previous WordPress template site,
built with the Next.js App Router and designed to be hosted on your own Node.js server.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom brand theme (deep navy base, blue→purple gradient accents, glassmorphism)
- **Framer Motion** for scroll-triggered reveals, stagger animations, hover/tilt micro-interactions and the testimonial carousel
- **lucide-react** for icons
- **Nodemailer** for SMTP email delivery (contact form)
- Self-hosted **Inter + Space Grotesk** fonts (`next/font/local`) — no external font CDN at runtime or build time
- `next/image` for all images

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

Point your reverse proxy (nginx/caddy) at port 3000. The site is a server-rendered app —
**do not** use `next export` / static export.

## Project Structure

```
app/                  # Pages, API routes, layout, metadata, fonts
  api/contact/route.ts# Contact form API route — Nodemailer delivery (POST /api/contact)
  actions/            # Server Actions — sendContactEmail.ts (form → Nodemailer)
components/
  layout/             # Navbar, Footer, Logo, BackgroundFX
  ui/                 # Button, SectionHeading, cards, AnimatedCounter, Reveal/Stagger, Marquee, CTASection, PageHero
  home/  about/  services/  portfolio/  contact/
lib/                  # site.ts (config), data.ts (content), mailer.ts (SMTP transport), email-template.ts (email markup), animations.ts, utils.ts
types/                # Shared TypeScript types
public/images/        # Portfolio placeholder images
```

## Where to Replace Placeholder Content

Everything editable lives in **two files**:

### 1. `lib/site.ts` — site-wide config

| Item | Key | Notes |
| --- | --- | --- |
| Phone number | `phone` / `phoneHref` | Real number already set: `+971-55-3693942` |
| Email | `email` | Currently `hello@velinno.com` — set the real inbox |
| Address | `address` | Placeholder: `Business Bay, Dubai, UAE` — set the official one |
| LinkedIn / Instagram | `socials.linkedin` / `socials.instagram` | `"#"` until real profile URLs are added |
| WhatsApp | `socials.whatsapp` | `wa.me` link already wired to the real number |
| Map embed | `mapEmbedSrc` | Google Maps `output=embed` URL for the real office |
| Navigation | `navLinks` | Add/remove links here |

### 2. `lib/data.ts` — page content

| Content | Where | Notes |
| --- | --- | --- |
| Services (13) | `services` | Short/long copy + "what's included" lists |
| Team | `team` | **Real members already set** (Shahid, Abid, Zaman, Asim Mirza). Bios are placeholders — replace the `bio` strings. Add photos later in `TeamCard` (initials avatars shown for now) |
| Projects / case studies | `projects` | Titles, categories, tags and `image` paths are placeholders. Swap `image` to real images in `public/images/portfolio/` |
| Testimonials | `testimonials` | Clearly marked placeholders — replace quotes and author names |
| Client logos | `clientLogos` | Replace with real client/brand names |
| Stats | `stats` | Replace with **verified** company numbers before launch |
| Process steps | `processSteps` | Discover → Define → Design → Develop → Deploy → Deliver |

### Images & SEO

- **Portfolio images**: drop real images in `public/images/portfolio/` and update `image` paths in `lib/data.ts`. Keep them landscape (4:3). Note: the current placeholder SVGs must start with `<?xml` and declare `width`/`height` or Next.js's image optimizer rejects them with a 400 (it recognizes SVGs only by the `<?xml` magic bytes) — real JPEG/PNG photos don't have this constraint.
- **Favicon**: `app/icon.svg`.
- **OG share image**: `public/og.svg` — replace with a 1200×630 **PNG/JPG** before launch (some platforms ignore SVG). Reference: `metadata.openGraph.images` in `app/layout.tsx`.
- **Meta title/description per page**: each page file exports its own `metadata`.

## Contact Form

The contact form (`components/contact/ContactForm.tsx`) submits inquiries through the
**Server Action** `app/actions/sendContactEmail.ts`. A standalone **API route**
(`app/api/contact/route.ts`, `POST /api/contact`) exposes the same delivery for
external clients. Both paths share the same Nodemailer engine and email markup.

### How it works

- `lib/mailer.ts` — type-safe Nodemailer transport factory. Reads the SMTP
  credentials **only** from server-side environment variables and creates the
  transporter lazily (with connection timeouts), so the app never crashes at boot
  if variables are missing — the error surfaces only when a send is attempted and
  is caught safely.
- `lib/email-template.ts` — shared premium HTML email template (dark theme,
  inline table-based styles, all user content HTML-escaped) plus a plain-text
  fallback. Used by both the Server Action and the API route so the delivered
  markup never drifts.
- Both delivery paths run on the **Node.js runtime** (`runtime = "nodejs"`);
  SMTP credentials never reach the client or the edge.

### Setup

1. Install the dependency:

   ```bash
   npm install nodemailer
   npm install -D @types/nodemailer
   ```

2. Add the SMTP variables to `.env.local` (git-ignored — never commit secrets,
   and mirror them in your hosting provider's environment dashboard):

   ```bash
   SMTP_HOST=smtp.your-provider.com   # e.g. smtp.gmail.com, smtp.zoho.com
   SMTP_PORT=465                      # 465 = implicit TLS · 587/2525 = STARTTLS
   SMTP_USER=hello@velinno.com        # authenticated sender (becomes "From")
   SMTP_PASS=your-smtp-password       # app password for the sender account
   CONTACT_RECEIVER_EMAIL=hello@velinno.com   # inbox that receives submissions
   ```

3. Restart the dev server so Next.js loads the new env vars, then submit the form
   or test the route directly:

   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","subject":"Hi","message":"Hello Velinno — we would like a quote."}'
   ```

### API route contract (`POST /api/contact`)

Accepts a JSON body `{ name, email, subject, message, phone?, projectType? }` and
returns:

| Status | Body |
| --- | --- |
| `200` | `{ "success": true, "message": "..." }` — delivered |
| `400` | `{ "success": false, "message": "...", "fields": {...} }` — malformed or invalid payload |
| `500` | `{ "success": false, "message": "..." }` — delivery failure (raw error logged server-side) |

## Notes

- Replace the `metadataBase` URL in `app/layout.tsx` if the site isn't hosted at `velinno.com`.
- Favicon, OG image and all placeholder images are generated SVG placeholders.
- The site is dark-themed by design (premium tech-studio aesthetic); the palette is defined in `tailwind.config.ts` and `app/globals.css`.
