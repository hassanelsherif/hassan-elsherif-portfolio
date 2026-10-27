import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer")
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must be 150 characters or fewer")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must be 3000 characters or fewer")
    .trim(),
  // Honeypot — must be empty; bots fill it automatically
  honeypot: z.string().max(0, "").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
