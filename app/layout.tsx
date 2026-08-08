import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundFX from "@/components/layout/BackgroundFX";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "./fonts/inter-v20-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-v20-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-v20-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-v20-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-v22-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-grotesk-v22-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-v22-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/space-grotesk-v22-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05070e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://velinno.com"),
  title: {
    default: "Velinno  AI-Powered Software Solutions for Ambitious Businesses",
    template: "%s  Velinno",
  },
  description:
    "Velinno is a UAE-based AI-first software development agency building AI-powered applications, intelligent automation and full-stack web, mobile, cloud and design solutions for startups, SMEs and enterprises. Innovating the future of technology.",
  keywords: [
    "Velinno",
    "software development agency",
    "AI development agency",
    "AI-powered applications",
    "AI automation",
    "AI chatbots",
    "agentic AI",
    "generative AI",
    "artificial intelligence",
    "Dubai software company",
    "full-stack development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "UI/UX design",
    "DevOps",
  ],
  authors: [{ name: "Velinno" }],
  creator: "Velinno",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://velinno.com",
    siteName: "Velinno",
    title: "Velinno  AI-Powered Software Solutions for Ambitious Businesses",
    description:
      "UAE-based AI-first software development agency building AI-powered applications, intelligent automation and full-stack web, mobile, cloud and design solutions for startups, SMEs and enterprises.",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Velinno  AI-Powered Software Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velinno  AI-Powered Software Solutions for Ambitious Businesses",
    description:
      "UAE-based AI-first software development agency building AI-powered applications, intelligent automation and full-stack digital solutions.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="relative min-h-screen bg-base font-sans text-ink antialiased">
        {/* MotionConfig makes Framer Motion respect the OS reduced-motion setting */}
        <MotionConfig reducedMotion="user">
          <BackgroundFX />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
