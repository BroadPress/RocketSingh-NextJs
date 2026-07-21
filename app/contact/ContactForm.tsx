"use client";

import { useCallback, useId, useState } from "react";
import {
  FORM_STACK_CLASS,
  ResetIcon,
  fieldLabelClass,
  textInputClass,
} from "@/components/form-controls";
import { emailValidationError } from "@/lib/form-validation";

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

export default function ContactForm() {
  const formId = useId();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const resetFields = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("");
    setMessage("");
    setEmailError(null);
    setSubmitError(null);
  }, []);

  const clear = () => {
    resetFields();
    setSubmitSuccess(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setSubmitError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      setSubmitError("Please fill in all required fields (marked with *).");
      return;
    }

    const emailErr = emailValidationError(email);
    setEmailError(emailErr);
    if (emailErr) return;

    if (!phone.trim()) {
      setSubmitError("Please fill in all required fields (marked with *).");
      return;
    }

    if (!/^\d{7,15}$/.test(phone)) {
      setSubmitError("Phone must be 7–15 digits.");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setSubmitError("Message must be at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: city.trim(),
          message: message.trim(),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setSubmitError(
          json.error ?? "There was a problem sending your message. Please try again.",
        );
        return;
      }

      resetFields();
      setSubmitSuccess(true);
    } catch {
      setSubmitError("We could not submit your message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white px-5 py-8 sm:px-8 sm:py-10">
      <form
        id={formId}
        onSubmit={onSubmit}
        className={FORM_STACK_CLASS}
        noValidate
      >
        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-name`} className={fieldLabelClass()}>
            Full Name<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-name`}
            className={textInputClass()}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-email`} className={fieldLabelClass()}>
            eMail<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            className={textInputClass()}
            value={email}
            onChange={(e) => {
              const v = e.target.value;
              setEmail(v);
              setEmailError(v.trim() ? emailValidationError(v) : null);
            }}
            autoComplete="email"
            required
            aria-invalid={emailError ? true : undefined}
          />
          {emailError ? (
            <p className="text-[12px] text-red-600">{emailError}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-phone`} className={fieldLabelClass()}>
            Phone Number<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            inputMode="numeric"
            maxLength={15}
            className={textInputClass()}
            value={phone}
            onChange={(e) => setPhone(onlyDigits(e.target.value).slice(0, 15))}
            autoComplete="tel"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-city`} className={fieldLabelClass()}>
            City
          </label>
          <input
            id={`${formId}-city`}
            className={textInputClass()}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="address-level2"
            placeholder="Chennai, Bengaluru, Mumbai…"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-message`} className={fieldLabelClass()}>
            Message<span className="text-red-600"> *</span>
          </label>
          <textarea
            id={`${formId}-message`}
            rows={5}
            className={textInputClass() + " resize-y min-h-[120px]"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {submitError ? (
          <p
            role="alert"
            className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-800"
          >
            {submitError}
          </p>
        ) : null}

        {submitSuccess ? (
          <p
            role="status"
            className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[13px] text-green-800"
          >
            Thank you! Your message has been received. We will get back to you soon.
          </p>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={clear}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 text-[14px] text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            <ResetIcon />
            Clear form
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-black px-8 py-2.5 text-[14px] font-medium text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Submit"}
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-400">
          Do not submit passwords through this form. Report malicious form.
        </p>
      </form>
    </div>
  );
}
