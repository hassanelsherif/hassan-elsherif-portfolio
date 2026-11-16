export const profile = {
  name: "Hassan El-Sherif",
  location: "Cairo, Egypt",
  targetRole: "Cloud / DevOps Engineer",
  cvHeadline: "Cloud & Infrastructure Engineer | AWS | Linux | DevOps",
  email: "hassanelsherif73x@gmail.com",
  linkedin: "https://www.linkedin.com/in/hassanelsherifx/",
  github: "https://github.com/hassanelsherif",
  photo: "/images/profile.jpg",
  experienceSummary:
    "3+ years in cloud infrastructure, system administration and enterprise application support. Currently managing and supporting AWS infrastructure hosting AI-powered computer vision applications at Shelter Technology.",
  // DRAFT: built only from facts on this site. Rewrite in your own voice; a personal
  // detail (why infrastructure, what you enjoy fixing) makes it far more memorable.
  story: [
    "I've grown through three roles at Shelter Technology. I started in IT technical support, moved into system administration, where I coordinated a team of four engineers and automated PostgreSQL reporting that used to take about six hours a week, and now manage the AWS infrastructure behind the company's AI-powered computer vision applications.",
    "Alongside that work I build hands-on labs, like the five on this site, to go deeper on the parts of DevOps I want to do every day: infrastructure as code, CI/CD, Kubernetes, monitoring and disaster recovery.",
  ],
  engineeringApproach:
    "I focus on reproducibility, operational clarity, and measurable outcomes. Each lab project starts with a defined problem, progresses through versioned infrastructure-as-code, and ends with evidence: architecture diagrams, sanitized logs, and documented runbooks. I prioritize least-privilege access, clean teardown, and honest documentation of trade-offs.",
};

export const skillCategories = [
  {
    label: "Cloud",
    skills: ["AWS EC2", "S3", "IAM", "VPC", "CloudWatch", "Lambda", "CloudFormation"],
  },
  {
    label: "Infrastructure",
    skills: [
      "Linux",
      "Windows Server",
      "System Administration",
      "Backup / Recovery",
      "Monitoring",
      "High Availability",
    ],
  },
  {
    label: "Networking",
    skills: ["TCP/IP", "DNS", "SSH", "Network Troubleshooting"],
  },
  {
    label: "Scripting & Data",
    skills: ["Bash", "Python", "PostgreSQL", "MySQL"],
  },
  {
    label: "DevOps",
    skills: ["Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "Git"],
  },
];
