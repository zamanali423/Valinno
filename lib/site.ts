/**
 * Velinno — central site configuration.
 *
 * Everything a non-developer would want to change lives here:
 * phone number, email, address, social links, and navigation.
 */

export const siteConfig = {
  name: "Velinno",
  legalName: "Velinno Software Solutions",
  tagline: "Full-Stack Software Solutions for Ambitious Businesses",
  subTagline: "Innovating the Future of Technology",
  description:
    "Velinno is a UAE-based full-stack software development agency delivering web, mobile, cloud and design solutions for startups, SMEs and enterprises.",

  // Real contact details
  phone: "+971-55-3693942",
  phoneHref: "tel:+971553693942",
  email: "hello@velinno.com", // TODO: replace with the real business inbox
  address: "Business Bay, Dubai, United Arab Emirates", // TODO: replace with official office address

  // Social links — fill in real profile URLs
  socials: {
    linkedin: "https://www.linkedin.com/company/velinno/", // TODO: https://www.linkedin.com/company/velinno
    instagram: "#", // TODO: https://www.instagram.com/velinno
    whatsapp: "https://wa.me/971553693942",
  },

  // Google Maps embed for the contact page — replace with the real office location
  mapEmbedSrc: "https://www.google.com/maps?q=Business%20Bay%2C%20Dubai&output=embed",

  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Team", href: "/#team" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
