import { NextResponse } from "next/server";

import { emailValidationError } from "@/lib/form-validation";
import { formatSupabaseEnvError, getSupabaseEnv } from "@/lib/supabase-env";
import { getSupabaseAdmin } from "@/lib/supabase";

export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

export type ContactJsonBody = Partial<ContactPayload>;

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function parseJsonBody(raw: ContactJsonBody): ContactPayload {
  return {
    fullName: String(raw.fullName ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    phone: String(raw.phone ?? "").trim(),
    city: String(raw.city ?? "").trim(),
    message: String(raw.message ?? "").trim(),
  };
}

function validatePayload(payload: ContactPayload): string | null {
  if (!payload.fullName || payload.fullName.length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (!payload.email) {
    return "Email is required.";
  }

  const emailErr = emailValidationError(payload.email);
  if (emailErr) return emailErr;

  if (!payload.phone) {
    return "Phone number is required.";
  }

  if (!/^\d{7,15}$/.test(payload.phone.replace(/\s/g, ""))) {
    return "Phone must be 7-15 digits (numbers only).";
  }

  if (!payload.message || payload.message.length < 10) {
    return "Message must be at least 10 characters.";
  }

  return null;
}

async function createContactRecord(
  payload: ContactPayload,
): Promise<{ id: string } | { error: string }> {
  const row: Record<string, unknown> = {
    full_name: payload.fullName,
    email: payload.email,
    phone_number: payload.phone,
    message: payload.message,
  };

  if (payload.city) row.city = payload.city;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("contact")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    return { error: error.message };
  }

  return { id: String(data.id) };
}

export async function handleContactSubmission(
  request: Request,
): Promise<NextResponse> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatSupabaseEnvError(env.missing) },
      { status: 500 },
    );
  }

  let payload: ContactPayload | null = null;

  try {
    const raw = (await request.json()) as ContactJsonBody;
    payload = parseJsonBody(raw);
  } catch {
    return validationError("Invalid request body");
  }

  if (!payload) return validationError("Invalid request body");

  const validationMsg = validatePayload(payload);
  if (validationMsg) return validationError(validationMsg);

  const result = await createContactRecord(payload);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    ok: true as const,
    id: result.id,
  });
}
