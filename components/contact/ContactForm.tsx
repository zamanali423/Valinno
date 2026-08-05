"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/motion";
import { sendContactEmail } from "@/app/actions/sendContactEmail";
import type { ContactFormInput, ContactFormResult } from "@/app/actions/sendContactEmail";

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

const projectTypes = [
  "Web Development",
  "Mobile App Development",
  "Cloud Solutions & DevOps",
  "Social Media",
  "UI/UX Design",
  "IT Consulting & Strategy",
  "Other",
];

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "success" | "error";

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "That email doesn't look right — please check it.";
  }
  if (!form.phone.trim()) errors.phone = "Please enter a phone number.";
  if (!form.projectType) errors.projectType = "Please choose a project type.";
  if (form.message.trim().length < 10) {
    errors.message = "Please tell us a little more (at least 10 characters).";
  } else if (form.message.length > 5000) {
    errors.message = "Please keep your message under 5000 characters.";
  }
  return errors;
}

const inputBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-ink-faint outline-none transition-all duration-300 focus:border-electric/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(79,124,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<ContactFormResult | null>(null);
  const [pending, setPending] = useState(false);

  const status: Status = pending
    ? "sending"
    : result
      ? result.ok
        ? "success"
        : "error"
      : "idle";

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    // Dismiss any lingering result panel once the user starts editing again.
    if (result) setResult(null);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    setResult(null);

    try {
      const payload: ContactFormInput = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: `New project inquiry — ${form.projectType || "General"}`,
        phone: form.phone.trim() || undefined,
        projectType: form.projectType || undefined,
        message: form.message.trim(),
      };

      const next = await sendContactEmail(payload);
      setResult(next);

      if (next.ok) {
        setForm(initialForm);
      } else if (next.fieldErrors) {
        // Surface server-side validation errors on the matching fields.
        setErrors(next.fieldErrors as Errors);
      }
    } catch {
      setResult({
        ok: false,
        message: "Something went wrong on our end. Please try again, or call us directly.",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <Reveal y={24} amount={0.2}>
      <form
        onSubmit={handleSubmit}
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
            Fields marked <span className="font-semibold text-white">*</span> are required. We reply
            within one business day.
          </p>
        </div>

        {/* Fields */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
              Name <span className="text-electric-bright">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              disabled={pending}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Your full name"
              className={cn(
                inputBase,
                errors.name &&
                  "border-rose-500/60 focus:border-rose-500/60 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.15)]",
              )}
              aria-invalid={!!errors.name}
            />
            {errors.name && <FieldError message={errors.name} />}
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
              disabled={pending}
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="you@company.com"
              className={cn(
                inputBase,
                errors.email &&
                  "border-rose-500/60 focus:border-rose-500/60 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.15)]",
              )}
              aria-invalid={!!errors.email}
            />
            {errors.email && <FieldError message={errors.email} />}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
              Phone <span className="text-electric-bright">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              disabled={pending}
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+971 ..."
              className={cn(
                inputBase,
                errors.phone &&
                  "border-rose-500/60 focus:border-rose-500/60 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.15)]",
              )}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <FieldError message={errors.phone} />}
          </div>

          {/* Project type */}
          <div>
            <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-ink">
              Project Type <span className="text-electric-bright">*</span>
            </label>
            <select
              id="projectType"
              disabled={pending}
              value={form.projectType}
              onChange={(e) => setField("projectType", e.target.value)}
              className={cn(
                inputBase,
                "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%239aa7bd%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4.5%206l3.5%203.5L11.5%206%22%20stroke%3D%22%239aa7bd%22%20stroke-width%3D%221.6%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10",
                !form.projectType && "text-ink-faint",
                errors.projectType && "border-rose-500/60",
              )}
              aria-invalid={!!errors.projectType}
            >
              <option value="" disabled>
                Select a service
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-surface text-white">
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType && <FieldError message={errors.projectType} />}
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
              Message <span className="text-electric-bright">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              maxLength={5000}
              disabled={pending}
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              placeholder="Tell us about your project, goals and timeline…"
              className={cn(
                inputBase,
                "resize-y",
                errors.message &&
                  "border-rose-500/60 focus:border-rose-500/60 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.15)]",
              )}
              aria-invalid={!!errors.message}
            />
            {errors.message && <FieldError message={errors.message} />}
          </div>
        </div>

        {/* Status panels */}
        <div className="mt-8" aria-live="polite">
          {status === "success" && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              className="flex flex-col gap-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-5 sm:flex-row sm:items-center"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-400/15">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-emerald-300">
                  Message sent successfully
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{result.message}</p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-emerald-400/40 hover:text-emerald-300 sm:self-center"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Send another
              </button>
            </motion.div>
          )}

          {status === "error" && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="flex items-start gap-4 rounded-2xl border border-rose-400/25 bg-rose-400/[0.07] p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-400/15">
                <AlertCircle className="h-5 w-5 text-rose-400" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-rose-300">
                  We couldn&apos;t send your message
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{result.message}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-ink-faint">
            Prefer to talk? Call{" "}
            <a href="tel:+971553693942" className="text-electric-bright transition-colors hover:text-white">
              +971-55-3693942
            </a>
          </p>

          <motion.button
            type="submit"
            disabled={pending}
            whileHover={pending ? undefined : { scale: 1.03 }}
            whileTap={pending ? undefined : { scale: 0.97 }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-violet disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {pending ? (
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
      </form>
    </Reveal>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-400"
      role="alert"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </motion.p>
  );
}
