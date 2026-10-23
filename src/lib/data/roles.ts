export type Role = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  detail?: string;
};

export const ROLES: Role[] = [
  {
    id: "support",
    title: "Customer Support Agent",
    summary:
      "Manage customer inquiries, resolve service concerns, and maintain clear communication records.",
    detail:
      "Manage customer inquiries, resolve service concerns, and maintain clear communication records while delivering timely, professional support to international customers.",
    tags: ["US shift", "Fresh graduates welcome", "Global process"],
  },
  {
    id: "web",
    title: "Web Developer",
    summary:
      "Develop and maintain responsive websites and web applications.",
    detail:
      "Develop and maintain responsive websites and web applications, ensuring functionality, performance, and alignment with business requirements.",
    tags: ["IT team", "React / Node", "Flexible overlap"],
  },
  {
    id: "qa",
    title: "Software QA Engineer",
    summary:
      "Test software applications and features, identify defects, and verify functionality.",
    detail:
      "Test software applications and features, identify defects, and verify functionality to ensure quality, reliability, and compliance with defined requirements.",
    tags: ["IT team", "Quality", "Detail-oriented"],
  },
  {
    id: "accountant",
    title: "Accountant",
    summary:
      "Maintain financial records, process invoices and payments, and reconcile accounts.",
    detail:
      "Maintain financial records, process invoices and payments, reconcile accounts, and support accurate financial reporting and daily operations.",
    tags: ["Accounts", "Onsite", "Day shift"],
  },
  {
    id: "ops-lead",
    title: "Business Operations Team Lead",
    summary:
      "Coordinate operational workflows, monitor team performance, and drive timely execution.",
    detail:
      "Coordinate operational workflows, monitor team performance, and drive timely execution of business objectives through effective planning and coordination.",
    tags: ["Leadership", "Operations", "Experience needed"],
  },
];

export const EXPERIENCE_OPTIONS = [
  "Fresher",
  "Less than 1 year",
  "1 to 3 years",
  "3 or more years",
] as const;

/** Extra department interests for Submit CV (not tied to live openings). */
export const ROLE_INTEREST_OPTIONS = [
  "Admin",
  "HR",
  "Accounts and Finance",
  "Marketing",
  "E-commerce",
  "General / future openings",
  "Other",
] as const;
