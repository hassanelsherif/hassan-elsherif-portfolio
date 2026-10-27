import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

// Simple in-memory rate limiter — resets on cold start
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

const GENERIC_ERROR = { error: "Failed to send message. Please try again later." };

export async function POST(req: NextRequest) {
  // Request size limit (~16 KB)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 16384) {
    return NextResponse.json(GENERIC_ERROR, { status: 413 });
  }

  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(GENERIC_ERROR, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(GENERIC_ERROR, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // Return field-level errors so client can surface them without verbose logging
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot check
  if (parsed.data.honeypot) {
    // Silently accept to avoid bot enumeration
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Check provider is configured; if not, return a clear fallback error
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY not configured");
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Please contact me directly at hassanelsherif73x@gmail.com",
        fallback: true,
      },
      { status: 503 }
    );
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    // Generic error — do not expose provider details
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}
