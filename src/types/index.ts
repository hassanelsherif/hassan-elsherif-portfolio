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
  coverImage?: string; // path under /public, shown on the project card
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
  /** Path under /public to the badge image, e.g. /images/badges/aws-saa.png */
  badge?: string;
}

export interface Education {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  /** Path under /public to the institution logo */
  logo?: string;
}
