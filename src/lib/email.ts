import { Resend } from "resend";
import type { ContactFormValues } from "@/lib/validation";

// Only instantiate on the server — RESEND_API_KEY must never be in client bundles
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function sendContactEmail(data: ContactFormValues): Promise<void> {
  const resend = getResendClient();
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "hassanelsherif73x@gmail.com";

  // Sanitize header values to prevent header injection
  const safeName = data.name.replace(/[\r\n]/g, " ").slice(0, 100);
  const safeSubject = data.subject.replace(/[\r\n]/g, " ").slice(0, 150);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: toEmail,
    reply_to: data.email,
    subject: `Portfolio contact: ${safeSubject}`,
    text: [
      `From: ${safeName} <${data.email}>`,
      `Subject: ${safeSubject}`,
      "",
      data.message,
    ].join("\n"),
  });

  if (error) {
    // Log error type but not message body contents
    console.error("[contact] email delivery error:", error.name);
    throw new Error("Email delivery failed");
  }
}
