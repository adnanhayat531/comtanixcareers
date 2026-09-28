export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  tags: string[];
  icon: "code" | "shield" | "wrench" | "headset" | "folder" | "chart" | "megaphone";
};

export const SERVICES: Service[] = [
  {
    slug: "dev",
    title: "Software Development",
    short:
      "Web and mobile apps built and maintained by dedicated teams.",
    long: "Custom web and mobile solutions built by dedicated remote squads. We integrate seamlessly into your Jira, GitHub, and CI/CD pipelines, writing production-grade code in React, Vue, Next.js, Node.js, Python, and Go with test-driven discipline.",
    tags: ["Full-Stack Web", "Cloud-Native APIs", "Microservices", "AWS & Azure"],
    icon: "code",
  },
  {
    slug: "qa",
    title: "Software Quality & Testing",
    short:
      "Manual and automated testing so every release ships with confidence.",
    long: "Ensuring zero regression and rock-solid usability across all devices. Our QA engineers build Cypress, Playwright, and Selenium suites, conduct automated load tests, and perform rigorous usability checks before any sprint hits production.",
    tags: ["Automated Regression", "Performance & Load", "API Validation", "Cross-Browser"],
    icon: "shield",
  },
  {
    slug: "it",
    title: "IT Support & Administration",
    short: "Help desk and systems administration for daily operations.",
    long: "24/7/365 Tier 1–3 engineering desk for US distributed organizations. We monitor uptime, handle Active Directory provisioning, troubleshoot MDM, and maintain cloud backup routines.",
    tags: ["24/7 Help Desk", "Microsoft 365", "Network & VPN", "Security Hardening"],
    icon: "wrench",
  },
  {
    slug: "care",
    title: "Customer Care",
    short: "Friendly, trained agents for voice, chat and email support.",
    long: "Inbound and outbound omnichannel customer support delivering CSAT scores above 95%. Our reps are trained extensively on US cultural context, active listening, de-escalation, and Zendesk/Freshdesk workflows.",
    tags: ["US Voice Support", "Real-Time Web Chat", "Email Tickets", "High CSAT Focus"],
    icon: "headset",
  },
  {
    slug: "back",
    title: "Back Office & Data Processing",
    short: "Accurate, secure handling of documents, orders and records.",
    long: "High-accuracy operational processing for fintech, healthcare, and logistics companies. Multi-tier QA audits ensure 99.5%+ field accuracy with full data protection safeguards.",
    tags: ["Document Digitization", "Claims Processing", "Content Moderation", "Catalog Management"],
    icon: "folder",
  },
  {
    slug: "fin",
    title: "Finance & Accounting",
    short: "Bookkeeping, invoicing and reporting by trained accountants.",
    long: "Skilled offshore accounting teams adept in QuickBooks, Xero, NetSuite, and Sage. We maintain AP/AR, bank reconciliations, and produce accurate financial packets for US management.",
    tags: ["US GAAP", "AP / AR", "Reconciliation", "Payroll"],
    icon: "chart",
  },
  {
    slug: "sales",
    title: "Sales & Marketing Support",
    short: "Lead research, outreach support and campaign operations.",
    long: "Accelerating pipeline generation for US account executives. Our reps specialize in targeted prospect research, cold email sequences, LinkedIn outreach, and inbound meeting scheduling.",
    tags: ["B2B Lead Enrichment", "SDR Outreach", "Salesforce & HubSpot", "Meeting Qualification"],
    icon: "megaphone",
  },
];
