import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get a free quote from Velinno  AI-powered applications, intelligent automation, web, mobile and cloud. Call +971-55-3693942 or send us a message; we reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s Build Something <span className="text-gradient">Great Together</span>
          </>
        }
        description="Tell us about your project  from AI-powered applications and intelligent automation to web, mobile and cloud platforms  and we'll come back with a clear plan and a no-obligation quote usually within one business day."
      />

      <section className="section pt-4 sm:pt-6">
        <div className="container-px grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
