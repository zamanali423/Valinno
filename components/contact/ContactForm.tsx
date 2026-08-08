"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import { Send, Loader2, AlertCircle, RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/motion";
import {
  contactFormSchema,
  PROJECT_TYPES,
  BUDGET_RANGES,
  TIMELINES,
  type ContactFormValues,
} from "@/lib/contact-form-schema";

const inputBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-ink-faint outline-none transition-all duration-300 focus:border-electric/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(79,124,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60";

const inputError =
  "border-rose-500/60 focus:border-rose-500/60 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.15)]";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface ServerResponse {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
}

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");
  // Becomes true after the first submit attempt. Until then the submit button
  // stays enabled so users can trigger validation + the shake on an invalid
  // attempt; once attempted, it disables while the form is invalid.
  const [attempted, setAttempted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit", // button starts enabled → first submit surfaces errors + shake
    reValidateMode: "onChange",
    defaultValues: {
      website: "",
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      projectType: "",
      budgetRange: "",
      timeline: "",
      message: "",
      consent: false,
    },
  });

  // Subtle shake on invalid submit attempts (re-triggered via controls).
  const shakeControls = useAnimation();
  const triggerShake = () => {
    shakeControls.start({
      x: [0, -10, 10, -6, 6, -3, 3, 0],
      transition: { duration: 0.45, ease: "easeInOut" },
    });
  };

  const budget = watch("budgetRange");
  const timeline = watch("timeline");

  const onSubmit = async (values: ContactFormValues) => {
    setAttempted(true);
    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json().catch(() => null)) as ServerResponse | null;

      if (res.ok) {
        setStatus("success");
        return;
      }

      // Surface server-side field errors onto the matching fields.
      if (data?.fields) {
        for (const [field, message] of Object.entries(data.fields)) {
          if (field in contactFormSchema.shape) {
            setError(field as keyof ContactFormValues, { message, type: "server" });
          }
        }
      }
      setServerMessage(
        data?.message ??
          "We couldn't send your message right now. Please try again in a few minutes, or call us directly.",
      );
      setStatus("error");
    } catch {
      setServerMessage(
        "Something went wrong on our end. Please try again, or call us directly at +971-55-3693942.",
      );
      setStatus("error");
    }
  };

  const onInvalid = () => {
    setAttempted(true);
    setStatus("idle");
    setServerMessage("");
    triggerShake();
  };

  const resetForm = () => {
    reset();
    setAttempted(false);
    setStatus("idle");
    setServerMessage("");
  };

  /* ----------------------------- helpers ----------------------------- */

  const fieldErrorId = (name: string) => `${name}-error`;

  const renderError = (message: string | undefined, id: string) =>
    message ? (
      <motion.p
        key={id}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        id={id}
        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-400"
      >
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {message}
      </motion.p>
    ) : null;

  const inputClasses = (hasError: boolean) => cn(inputBase, hasError && inputError);

  /* ------------------------------- form ------------------------------ */

  return (
    <Reveal y={24} amount={0.2}>
      <div className="relative">
        {/* Honeypot  off-screen (not display:none) so naive bots fill it in */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong gradient-border flex flex-col items-center rounded-3xl p-10 text-center sm:p-14"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-brand-gradient shadow-glow"
              >
                <Check className="h-8 w-8 text-white" aria-hidden="true" />
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 font-display text-2xl font-semibold tracking-tight text-white"
              >
                Message sent!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted"
              >
                Thanks for reaching out to Velinno. We&apos;ll get back to you within 24 hours.
                Need us sooner? Call{" "}
                <a href="tel:+971553693942" className="text-electric-bright transition-colors hover:text-white">
                  +971-55-3693942
                </a>
                .
              </motion.p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-electric/40 hover:bg-white/[0.08]"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              noValidate
              className="glass-strong gradient-border rounded-3xl p-7 sm:p-9"
            >
              {/* Heading */}
              <div>
                <p className="eyebrow">New Business Inquiry</p>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-gradient-soft">
                  Tell us about your project
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Fields marked <span className="font-semibold text-white">*</span> are required. We
                  reply within one business day.
                </p>
              </div>

              {/* Error banner (network / server failures)  data stays intact */}
              <AnimatePresence>
                {status === "error" && serverMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    role="alert"
                    className="overflow-hidden"
                  >
                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-400/25 bg-rose-400/[0.07] p-4">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" aria-hidden="true" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-rose-300">We couldn&apos;t send your message</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{serverMessage}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:border-rose-400/40 hover:text-rose-300"
                      >
                        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fields (shaken on invalid submit) */}
              <motion.div animate={shakeControls} className="mt-8 grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-ink">
                    Full Name <span className="text-electric-bright">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    disabled={isSubmitting}
                    placeholder="Your full name"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? fieldErrorId("fullName") : undefined}
                    className={inputClasses(!!errors.fullName)}
                    {...register("fullName")}
                  />
                  {renderError(errors.fullName?.message, fieldErrorId("fullName"))}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                    Email <span className="text-electric-bright">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    disabled={isSubmitting}
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? fieldErrorId("email") : undefined}
                    className={inputClasses(!!errors.email)}
                    {...register("email")}
                  />
                  {renderError(errors.email?.message, fieldErrorId("email"))}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
                    Phone <span className="text-ink-faint">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    disabled={isSubmitting}
                    placeholder="+971 ..."
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? fieldErrorId("phone") : undefined}
                    className={inputClasses(!!errors.phone)}
                    {...register("phone")}
                  />
                  {renderError(errors.phone?.message, fieldErrorId("phone"))}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-ink">
                    Company <span className="text-ink-faint">(optional)</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    autoComplete="organization"
                    disabled={isSubmitting}
                    placeholder="Your company"
                    aria-invalid={!!errors.companyName}
                    aria-describedby={errors.companyName ? fieldErrorId("companyName") : undefined}
                    className={inputClasses(!!errors.companyName)}
                    {...register("companyName")}
                  />
                  {renderError(errors.companyName?.message, fieldErrorId("companyName"))}
                </div>

                {/* Project type */}
                <div className="sm:col-span-2">
                  <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-ink">
                    Project Type <span className="text-electric-bright">*</span>
                  </label>
                  <select
                    id="projectType"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.projectType}
                    aria-describedby={errors.projectType ? fieldErrorId("projectType") : undefined}
                    className={cn(
                      inputClasses(!!errors.projectType),
                      "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%239aa7bd%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4.5%206l3.5%203.5L11.5%206%22%20stroke%3D%22%239aa7bd%22%20stroke-width%3D%221.6%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10",
                      !watch("projectType") && "text-ink-faint",
                    )}
                    {...register("projectType")}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-surface text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                  {renderError(errors.projectType?.message, fieldErrorId("projectType"))}
                </div>

                {/* Budget  segmented accessible radio group */}
                <div>
                  <fieldset>
                    <legend className="mb-2 block text-sm font-medium text-ink">
                      Budget Range <span className="text-ink-faint">(optional)</span>
                    </legend>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Budget Range">
                      {BUDGET_RANGES.map((option) => (
                        <label
                          key={option}
                          className={cn(
                            "relative cursor-pointer rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300",
                            budget === option
                              ? "border-electric/60 bg-electric/15 text-white shadow-[0_0_0_3px_rgba(79,124,255,0.2)]"
                              : "border-white/10 bg-white/[0.04] text-ink-muted hover:border-white/25 hover:text-white",
                            "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric/60",
                          )}
                        >
                          <input
                            type="radio"
                            value={option}
                            disabled={isSubmitting}
                            className="sr-only"
                            {...register("budgetRange")}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {renderError(errors.budgetRange?.message, fieldErrorId("budgetRange"))}
                </div>

                {/* Timeline  segmented accessible radio group */}
                <div>
                  <fieldset>
                    <legend className="mb-2 block text-sm font-medium text-ink">
                      Timeline <span className="text-ink-faint">(optional)</span>
                    </legend>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Timeline">
                      {TIMELINES.map((option) => (
                        <label
                          key={option}
                          className={cn(
                            "relative cursor-pointer rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300",
                            timeline === option
                              ? "border-electric/60 bg-electric/15 text-white shadow-[0_0_0_3px_rgba(79,124,255,0.2)]"
                              : "border-white/10 bg-white/[0.04] text-ink-muted hover:border-white/25 hover:text-white",
                            "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric/60",
                          )}
                        >
                          <input
                            type="radio"
                            value={option}
                            disabled={isSubmitting}
                            className="sr-only"
                            {...register("timeline")}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {renderError(errors.timeline?.message, fieldErrorId("timeline"))}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                    Message / Project Details <span className="text-electric-bright">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    maxLength={5000}
                    disabled={isSubmitting}
                    placeholder="Tell us about your project, goals and timeline…"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? fieldErrorId("message") : undefined}
                    className={cn(inputClasses(!!errors.message), "resize-y")}
                    {...register("message")}
                  />
                  {renderError(errors.message?.message, fieldErrorId("message"))}
                </div>

                {/* Consent */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="consent"
                    className="flex cursor-pointer items-start gap-3 text-sm text-ink-muted"
                  >
                    <input
                      id="consent"
                      type="checkbox"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? fieldErrorId("consent") : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-white/20 bg-white/[0.04] transition-all duration-200 checked:border-transparent checked:bg-brand-gradient checked:shadow-glow focus-visible:ring-2 focus-visible:ring-electric/60"
                      {...register("consent")}
                    />
                    <span>
                      I agree to be contacted regarding my inquiry{" "}
                      <span className="text-electric-bright">*</span>
                    </span>
                  </label>
                  {renderError(errors.consent?.message, fieldErrorId("consent"))}
                </div>
              </motion.div>

              {/* Submit */}
              <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-ink-faint">
                  Prefer to talk? Call{" "}
                  <a
                    href="tel:+971553693942"
                    className="text-electric-bright transition-colors hover:text-white"
                  >
                    +971-55-3693942
                  </a>
                </p>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || (attempted && !isValid)}
                  whileHover={isSubmitting || (attempted && !isValid) ? undefined : { scale: 1.03 }}
                  whileTap={isSubmitting || (attempted && !isValid) ? undefined : { scale: 0.97 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-violet disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
