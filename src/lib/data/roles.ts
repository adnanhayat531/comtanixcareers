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
    title: "Customer Support Agent (US Process)",
    summary: "Handle calls and chats for US customers.",
    detail:
      "Handle inbound customer calls, inquiries, and email tickets for leading American retail and logistics brands. Requires excellent English fluency and active problem-solving skills.",
    tags: ["Night shift", "Fresh graduates welcome", "US Process"],
  },
  {
    id: "tech",
    title: "Technical Support Representative",
    summary: "Solve software and device issues step by step.",
    detail:
      "Deliver first-touch IT resolution for remote US staff. Diagnose network issues, reset enterprise credentials, and escalate complex incidents.",
    tags: ["Night shift", "Technical skills", "Rotational"],
  },
  {
    id: "data",
    title: "Data Entry and Back Office Executive",
    summary: "Accurate, fast processing of documents and records.",
    detail:
      "Process medical billing claims, reconcile inventory logs, and perform secure catalog categorization for US clients.",
    tags: ["Day or night", "Back Office"],
  },
  {
    id: "web",
    title: "Web Developer",
    summary: "Build and maintain websites and web apps.",
    detail:
      "Build and maintain responsive client-facing web applications. Collaborate with US Product Managers on clean, documented JavaScript/TypeScript services.",
    tags: ["IT team", "React / Node", "Flexible US overlap"],
  },
  {
    id: "lead",
    title: "Team Leader",
    summary: "Lead an agent team and coach them to hit targets.",
    detail:
      "Oversee floor operations of 15–20 support agents. Drive daily CSAT and attendance metrics while mentoring junior staff.",
    tags: ["Leadership", "Experience needed", "Night shift"],
  },
];

export const EXPERIENCE_OPTIONS = [
  "Fresher",
  "Less than 1 year",
  "1 to 3 years",
  "3 or more years",
] as const;
