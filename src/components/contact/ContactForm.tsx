"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "failure">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Read values directly from DOM — bypasses Grammarly interference
    const data = {
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      subject: subjectRef.current?.value ?? "",
      message: messageRef.current?.value ?? "",
    };

    // Validate with Zod
    const result = contactSchema.safeParse({ ...data, honeypot: "" });
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    // Clear errors
    setErrors({});

    setSubmitState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (res.ok) {
        setSubmitState("success");
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (subjectRef.current) subjectRef.current.value = "";
        if (messageRef.current) messageRef.current.value = "";
      } else {
        setSubmitState("failure");
      }
    } catch {
      setSubmitState("failure");
    }
  }

  const inputBase =
    "w-full px-3 py-2.5 rounded-md bg-gray-50 dark:bg-gray-800/60 border text-sm text-[#0F172A] dark:text-[#E5E7EB] placeholder-gray-400 dark:placeholder-gray-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6] focus:border-transparent";
  const inputNormal = "border-gray-300 dark:border-gray-700";
  const inputError = "border-red-400 dark:border-red-600";

  if (submitState === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
        aria-live="polite"
      >
        <CheckCircle className="w-10 h-10 text-emerald-500" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Message sent</h3>
        <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-xs">
          Thanks for reaching out. I&apos;ll reply to your email as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-2 text-sm text-[#2563EB] dark:text-[#3B82F6] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Honeypot — visually hidden, bots fill it */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
        <label htmlFor="honeypot">Leave this empty</label>
        <input id="honeypot" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] mb-1.5">
          Name <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
          placeholder="Your name"
          ref={nameRef}
          className={cn(inputBase, errors.name ? inputError : inputNormal)}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] mb-1.5">
          Email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          placeholder="you@example.com"
          ref={emailRef}
          className={cn(inputBase, errors.email ? inputError : inputNormal)}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] mb-1.5">
          Subject <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          type="text"
          aria-required="true"
          aria-describedby={errors.subject ? "subject-error" : undefined}
          aria-invalid={!!errors.subject}
          placeholder="Regarding a role / collaboration / etc."
          ref={subjectRef}
          className={cn(inputBase, errors.subject ? inputError : inputNormal)}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] mb-1.5">
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
          placeholder="Your message…"
          ref={messageRef}
          className={cn(inputBase, "resize-y min-h-[120px]", errors.message ? inputError : inputNormal)}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {submitState === "failure" && (
        <div
          role="alert"
          className="flex items-start gap-2 p-3 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-300"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Something went wrong. Please try again or email me directly at{" "}
            <a href="mailto:hassanelsherif73x@gmail.com" className="underline font-medium">
              hassanelsherif73x@gmail.com
            </a>
          </span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState === "sending"}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-[#2563EB] dark:bg-[#3B82F6] text-white hover:bg-blue-700 dark:hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
        aria-busy={submitState === "sending"}
      >
        {submitState === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
