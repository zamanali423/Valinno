/**
 * Velinno  server-side Supabase client for lead storage (server-only).
 *
 * ⚠️ This module touches `process.env` and must only be imported from the
 * Node.js runtime (API routes with `runtime = "nodejs"`). It must never be
 * imported from a Client Component.
 *
 * Graceful degradation: if SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are
 * missing, `getSupabaseAdmin()` returns null and `saveContactSubmission`
 * reports the failure instead of throwing  the contact route still returns
 * a sensible response and logs the reason server-side.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ContactFormValues } from "@/lib/contact-form-schema";

let cachedClient: SupabaseClient | null | undefined;

/** Admin (service-role) client, or null when Supabase isn't configured. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn(
      "[supabase] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set  contact submissions will not be stored in the database.",
    );
    cachedClient = null;
    return null;
  }

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}

/** Row shape for the `contact_submissions` table. */
export interface ContactSubmissionRow {
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  project_type: string;
  budget_range: string | null;
  timeline: string | null;
  message: string;
  consent: boolean;
}

/**
 * Store a validated submission in the `contact_submissions` table.
 * Returns { ok: true } on success, or { ok: false, error } with a server-side
 * log  never throws, so the API route can continue even if storage fails.
 */
export async function saveContactSubmission(
  values: ContactFormValues,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Supabase is not configured (missing env vars)." };
  }

  const row: ContactSubmissionRow = {
    full_name: values.fullName,
    email: values.email,
    phone: values.phone?.trim() || null,
    company_name: values.companyName?.trim() || null,
    project_type: values.projectType,
    budget_range: values.budgetRange?.trim() || null,
    timeline: values.timeline?.trim() || null,
    message: values.message,
    consent: values.consent,
  };

  const { error } = await supabase.from("contact_submissions").insert([row]);

  if (error) {
    console.error("[supabase] Failed to store contact submission:", error.message);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
