import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://hassan-elsherif.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hassan El-Sherif | Cloud & DevOps Engineer",
    template: "%s | Hassan El-Sherif",
  },
  description:
    "Cloud & Infrastructure Engineer with 3+ years in AWS, Linux, and enterprise infrastructure. Portfolio of DevOps lab projects covering Terraform IaC, CI/CD, Kubernetes, Observability, and Disaster Recovery.",
  keywords: [
    "Cloud Engineer",
    "DevOps Engineer",
    "AWS",
    "Terraform",
    "Kubernetes",
    "Linux",
    "Infrastructure as Code",
    "Hassan El-Sherif",
  ],
  authors: [{ name: "Hassan El-Sherif" }],
  creator: "Hassan El-Sherif",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Hassan El-Sherif | Cloud & DevOps Engineer",
    title: "Hassan El-Sherif | Cloud & DevOps Engineer",
    description:
      "Cloud & Infrastructure Engineer. Portfolio of five DevOps lab projects with architecture diagrams, runbooks, and evidence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan El-Sherif | Cloud & DevOps Engineer",
    description: "Cloud & Infrastructure Engineer. DevOps lab projects with evidence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="portfolio-theme">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
