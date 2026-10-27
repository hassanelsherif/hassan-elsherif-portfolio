import type { ExperienceRole, Certification, Education } from "@/types";

export const roles: ExperienceRole[] = [
  {
    title: "Cloud & Infrastructure Engineer",
    company: "Shelter Technology",
    startDate: "Mar 2025",
    endDate: "",
    current: true,
    accomplishments: [
      "Manage and support AWS infrastructure hosting AI-powered computer vision applications.",
      "Monitor infrastructure health, investigate disruptions, and troubleshoot application and infrastructure issues.",
      "Support cloud resource optimization, cost management, maintenance, and availability activities.",
    ],
  },
  {
    title: "System Administrator",
    company: "Shelter Technology",
    startDate: "Mar 2024",
    endDate: "Mar 2025",
    current: false,
    accomplishments: [
      "Supported enterprise infrastructure and system administration operations.",
      "Coordinated a team of four engineers, operational procedures, on-call coordination, and troubleshooting.",
      "Monitored performance and investigated bottlenecks.",
      "Automated PostgreSQL reporting with JasperSoft Studio, reducing manual reporting by approximately six hours weekly.",
    ],
  },
  {
    title: "IT Technical Support Engineer",
    company: "Shelter Technology",
    startDate: "Mar 2023",
    endDate: "Mar 2024",
    current: false,
    accomplishments: [
      "Provided L1/L2 support for enterprise applications and infrastructure.",
      "Performed maintenance, backup verification, and health checks.",
      "Troubleshot PostgreSQL/MySQL issues and supported query performance improvements.",
      "Assisted with availability checks, failover testing, and recovery documentation.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "2025",
    verifyUrl: "https://www.credly.com/badges/d724362f-f885-4b6e-a156-a58ae1672398/public_url",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
    verifyUrl: "https://www.credly.com/badges/27a5d3d2-1d8a-4bfe-904a-1f8a12b15570/linked_in_profile",
  },
];

export const education: Education[] = [
  {
    degree: "AWS Cloud Computing Bootcamp",
    institution: "ALX",
    startYear: "Jan 2025",
    endYear: "Oct 2025",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "El-Shorouk Academy",
    startYear: "Sep 2017",
    endYear: "Jun 2021",
  },
];
