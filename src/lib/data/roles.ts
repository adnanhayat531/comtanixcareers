export type Role = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  detail?: string;
  salary?: string;
  employmentType?: string;
  location?: string;
};

const LOCATION = "Bahria Town Phase 8, Rawalpindi";

export const ROLES: Role[] = [
  {
    id: "support",
    title: "Customer Support Representative",
    summary:
      "Assist international customers, resolve service inquiries, and maintain clear support communication.",
    salary: "PKR 60,000-75,000 per month",
    employmentType: "Onsite | 6 PM - 3 AM (Mon-Fri)",
    location: LOCATION,
    tags: ["US shift", "Onsite", "Customer Support"],
    detail: `Please read thoroughly before you apply:

Pay: PKR 60,000-75,000 per month
Location: Bahria Town, Phase 8, Rawalpindi
Timings: 6 PM - 3 AM (Monday-Friday) | US Business Hours
Work Arrangement: Onsite

About Comtanix
Comtanix is a technology-driven company working across software development, AI and automation, cybersecurity, cloud infrastructure, and specialized business services. We are looking for a Customer Support Representative to assist international customers, address service-related inquiries, resolve issues, and maintain clear communication throughout the support process.

Core Responsibilities
- Respond to customer inquiries through appropriate communication channels, including email, chat, and other support platforms.
- Understand customer concerns, provide accurate information, and resolve issues within defined service standards.
- Document customer interactions, maintain support records, and update relevant systems.
- Investigate recurring concerns and coordinate with relevant internal teams for effective resolution.
- Follow up on pending issues to ensure timely resolution and a consistent customer experience.
- Communicate professionally with international customers and maintain clear, accurate records of support activities.
- Identify recurring customer concerns and share feedback to support service and process improvements.

Required Qualifications & Skills
- Strong written and verbal communication skills in English.
- Excellent problem-solving, interpersonal, and organizational abilities.
- Proficiency in standard business applications and digital communication tools.
- Ability to manage multiple inquiries while maintaining accuracy and professionalism.
- A customer-focused approach with strong attention to detail and accountability.

Preferred Skills
- Experience with customer support platforms, CRM systems, or ticketing tools.
- Familiarity with international customer communication and service workflows.
- Ability to troubleshoot routine issues and coordinate effectively with internal teams.

Pay: PKR 60,000-75,000 per month
Work Location: In person`,
  },
  {
    id: "web",
    title: "Web Developer",
    summary:
      "Develop and maintain responsive websites and web applications with reliable performance.",
    salary: "PKR 70,000-90,000 per month",
    employmentType: "Onsite | 6 PM - 3 AM (Mon-Fri)",
    location: LOCATION,
    tags: ["US shift", "Onsite", "Engineering"],
    detail: `Please read thoroughly before you apply:

Pay: PKR 70,000-90,000 per month
Location: Bahria Town, Phase 8, Rawalpindi
Timings: 6 PM - 3 AM (Monday-Friday) | US Business Hours Alignment
Work Arrangement: Onsite

About Comtanix
Comtanix is a technology-driven company delivering software development, AI and automation, cybersecurity, cloud infrastructure, and digital solutions for business needs. We are seeking a Web Developer to develop and maintain responsive websites and web applications, implement functional requirements, and ensure reliable performance across devices and platforms.

Core Responsibilities
- Develop, maintain, and enhance responsive websites and web applications based on business and technical requirements.
- Build user interfaces and application features using relevant frontend and backend technologies.
- Write clean, maintainable, and reusable code while following established development standards.
- Integrate APIs, databases, and third-party services as required by project specifications.
- Identify and resolve bugs, performance issues, and cross-browser compatibility problems.
- Implement responsive layouts and ensure consistent functionality across desktop, tablet, and mobile devices.
- Apply appropriate security practices, version control procedures, and coding standards.
- Collaborate with designers, QA engineers, and other developers to deliver reliable software features.
- Maintain technical documentation and support ongoing application updates and improvements.

Required Qualifications & Skills
- Bachelor's degree in Computer Science, Software Engineering, or a related field, or equivalent practical skills.
- Strong understanding of HTML, CSS, JavaScript, and responsive web development.
- Hands-on knowledge of relevant frameworks and technologies such as React, Next.js, Node.js, PHP, or Laravel, depending on project requirements.
- Familiarity with REST APIs, database fundamentals, Git, and debugging techniques.
- Understanding of web performance, accessibility, and secure coding practices.
- Strong analytical thinking, attention to detail, and problem-solving abilities.

Preferred Skills
- Experience with modern frontend frameworks and backend development.
- Familiarity with MySQL, PostgreSQL, MongoDB, or comparable database technologies.
- Knowledge of website deployment, cloud hosting, and performance monitoring.
- Experience working with international stakeholders or distributed development teams.

Pay: PKR 70,000-90,000 per month
Work Location: In person`,
  },
  {
    id: "qa",
    title: "Software QA Engineer",
    summary:
      "Validate application functionality, identify defects, and verify quality standards.",
    salary: "PKR 65,000-85,000 per month",
    employmentType: "Onsite | 6 PM - 3 AM (Mon-Fri)",
    location: LOCATION,
    tags: ["US shift", "Onsite", "Quality"],
    detail: `Please read thoroughly before you apply:

Pay: PKR 65,000-85,000 per month
Location: Bahria Town, Phase 8, Rawalpindi
Timings: 6 PM - 3 AM (Monday-Friday) | US Business Hours Alignment
Work Arrangement: Onsite

About Comtanix
Comtanix develops and maintains websites, software applications, and technology-driven business systems. We are looking for a Software QA Engineer to validate application functionality, identify defects, and verify that software deliverables meet defined requirements, quality standards, and expected user behavior.

Core Responsibilities
- Review business and technical requirements to develop appropriate test scenarios and test cases.
- Perform functional, regression, integration, and cross-browser testing of websites and applications.
- Identify, document, and track software defects with clear reproduction steps and supporting evidence.
- Verify bug fixes and conduct regression testing to prevent recurring issues.
- Test application workflows, user interfaces, APIs, and data handling against defined specifications.
- Maintain test documentation, defect reports, and quality assurance records.
- Collaborate with developers and project stakeholders to clarify requirements and resolve quality issues.
- Identify gaps in testing coverage and recommend improvements to testing procedures.
- Support release validation to ensure software is ready for deployment.

Required Qualifications & Skills
- Bachelor's degree in Computer Science, Software Engineering, or a related field, or equivalent practical knowledge.
- Understanding of software testing methodologies, SDLC, and defect management.
- Ability to prepare test cases, execute test scenarios, and document findings accurately.
- Familiarity with browser testing, API testing, and basic database validation.
- Knowledge of issue-tracking tools such as Jira or similar platforms.
- Strong analytical thinking, attention to detail, and written communication skills.

Preferred Skills
- Experience with API testing tools such as Postman.
- Familiarity with automation frameworks such as Playwright, Cypress, or Selenium.
- Basic knowledge of SQL, performance testing, and CI/CD workflows.
- Understanding of Agile development and software release processes.

Pay: PKR 65,000-85,000 per month
Work Location: In person`,
  },
  {
    id: "accountant",
    title: "Senior Accounts Executive",
    summary:
      "Manage core accounting activities, reporting, reconciliations, and financial controls.",
    salary: "PKR 70,000-90,000 per month",
    employmentType: "Onsite | 4 PM - 1 AM (Mon-Fri)",
    location: LOCATION,
    tags: ["UK shift", "Onsite", "Finance"],
    detail: `Please read thoroughly before you apply:

Pay: PKR 70,000-90,000 per month
Location: Bahria Town, Phase 8, Rawalpindi
Timings: 4 PM - 1 AM (Monday-Friday) | UK Business Hours Alignment
Work Arrangement: Onsite

About Comtanix
Comtanix is a technology-driven company operating across software development, cybersecurity, cloud infrastructure, and specialized business services. We are seeking a detail-oriented Senior Accountant to manage core accounting activities, maintain financial integrity, support reporting and reconciliations, and contribute to effective financial controls and business decision-making.

Core Responsibilities
- Maintain accurate general ledger entries, financial records, and supporting accounting documentation.
- Manage accounts payable and receivable, including invoice processing, payment tracking, and outstanding balances.
- Perform bank, vendor, customer, and ledger reconciliations to identify and resolve discrepancies.
- Assist in preparing monthly financial statements, management reports, and periodic financial summaries.
- Monitor expenses, cash flow movements, and financial transactions to maintain accurate records.
- Support budgeting, expense analysis, and variance reporting to assist financial planning.
- Ensure financial documentation is organized and transactions are recorded in accordance with applicable accounting standards and internal controls.
- Coordinate with internal departments, vendors, banks, and external auditors on finance-related matters.
- Support month-end closing, audit preparation, and tax documentation as required.
- Identify inconsistencies in financial records and recommend improvements to accounting procedures.

Required Qualifications & Skills
- Bachelor's degree in Accounting, Finance, or a related field.
- Relevant experience in accounting, bookkeeping, financial reporting, or reconciliation.
- Strong understanding of general ledger accounting, accounts payable and receivable, and financial controls.
- Proficiency in Microsoft Excel and accounting software.
- Knowledge of financial reporting principles, documentation requirements, and applicable tax regulations.
- High numerical accuracy, integrity, analytical ability, and attention to detail.

Preferred Skills
- Experience with accounting platforms such as QuickBooks, Xero, or relevant ERP systems.
- Familiarity with budgeting, cash flow monitoring, month-end closing, and audit preparation.
- ACCA, CA, or CMA qualification or progress toward a relevant professional certification is an advantage.
- Ability to manage financial deadlines and communicate effectively with internal and external stakeholders.

Pay: PKR 70,000-90,000 per month
Work Location: In person`,
  },
  {
    id: "ops-lead",
    title: "Business Operations Team Lead",
    summary:
      "Oversee cross-functional workflows, guide teams, and improve operational execution.",
    salary: "PKR 150,000-200,000 per month",
    employmentType: "Onsite | 6 PM - 3 AM (Mon-Fri)",
    location: LOCATION,
    tags: ["US shift", "Onsite", "Leadership"],
    detail: `Please read thoroughly before you apply:

Pay: PKR 150,000-200,000 per month
Location: Bahria Town, Phase 8, Rawalpindi
Timings: 6 PM - 3 AM (Monday-Friday) | US Business Hours
Work Arrangement: Onsite

About Comtanix
Comtanix is a technology-driven company with operations spanning software development, AI and automation, cybersecurity, cloud infrastructure, and specialized business services. We are looking for an experienced Business Operations Team Lead to oversee cross-functional workflows, guide operational teams, improve execution standards, and ensure business activities align with organizational priorities and performance objectives.

Core Responsibilities
- Oversee daily business operations, coordinate departmental activities, and ensure timely execution of assigned priorities.
- Establish operational plans, allocate responsibilities, and monitor progress against defined targets and deadlines.
- Lead, mentor, and support team members while maintaining accountability, productivity, and consistent work quality.
- Develop, document, and improve standard operating procedures, internal workflows, and reporting practices.
- Monitor key performance indicators, analyze operational data, and prepare reports for management review.
- Identify process inefficiencies, recurring delays, and operational risks, then implement appropriate corrective measures.
- Coordinate with technology, finance, human resources, business development, and other departments to resolve dependencies and maintain workflow continuity.
- Establish clear communication and escalation procedures to address operational issues promptly.
- Support resource planning, workload distribution, performance reviews, and continuous improvement initiatives.
- Provide management with actionable insights on operational performance, process gaps, and opportunities for improvement.

Required Qualifications & Skills
- Bachelor's degree in Business Administration, Management, Operations, or a related field.
- Substantial experience in business operations, process management, or cross-functional coordination, including team leadership.
- Demonstrated ability to manage workflows, prioritize competing requirements, and deliver against operational targets.
- Strong understanding of KPI monitoring, performance reporting, process documentation, and operational controls.
- Proficiency in spreadsheets, reporting tools, and project or task management platforms.
- Excellent leadership, analytical, organizational, and stakeholder management skills.
- Ability to make informed decisions, resolve operational challenges, and maintain accountability across teams.

Preferred Skills
- Experience leading cross-functional teams in a technology-driven or professional services environment.
- Familiarity with process improvement methodologies, workflow automation, and performance management frameworks.
- Experience preparing management reports, reviewing operational metrics, and implementing measurable improvements.
- Strong judgment, initiative, and the ability to translate business priorities into actionable plans.

Pay: PKR 150,000-200,000 per month
Work Location: In person`,
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
