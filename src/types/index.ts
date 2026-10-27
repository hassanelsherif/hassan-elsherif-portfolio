export type ProjectStatus = "planned" | "in-progress" | "completed";

export interface TechChip {
  label: string;
  category: "cloud" | "devops" | "infra" | "scripting" | "monitoring";
}

export interface Project {
  slug: string;
  title: string;
  problem: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  techCategories: TechChip[];
  repositoryUrl: string;
  featured: boolean;
  order: number;
  architectureDiagram?: string; // path to diagram file
  screenshotAlt?: string;
}

export interface ExperienceRole {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  accomplishments: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  verifyUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ContactFormState {
  status: "idle" | "sending" | "success" | "failure";
  message?: string;
}
