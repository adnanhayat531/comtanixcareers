export const STATS = [
  {
    value: 250,
    suffix: "+",
    label: "Team members",
    sub: "Engineers & IT Specialists",
  },
  {
    value: 6,
    suffix: "",
    label: "Service lines",
    sub: "Specialized enterprise hubs",
  },
  {
    value: 4,
    suffix: "",
    label: "US time zones",
    sub: "Full EST, CST, MST, PST coverage",
  },
  {
    value: 95,
    suffix: "%",
    label: "Quality score target",
    sub: "Consistently achieved benchmark",
  },
] as const;

export const GOALS = [
  {
    title: "Quality first",
    body: "Root-cause resolution on first touch. Metrics track outcomes, not activity volume.",
    image: "/goals/quality.jpg",
    tag: "Delivery quality",
  },
  {
    title: "People investment",
    body: "Skill development mapped to role levels and compensation bands.",
    image: "/goals/people.jpg",
    tag: "Career paths",
  },
  {
    title: "Measured growth",
    body: "Account growth tied to hiring selectivity and technical fit, not headcount alone.",
    image: "/goals/growth.jpg",
    tag: "Capacity planning",
  },
  {
    title: "Security & trust",
    body: "IP controls, NDAs, and secured networks on every US engagement.",
    image: "/goals/trust.jpg",
    tag: "Compliance",
  },
  {
    title: "Client partnership",
    body: "Same tools and rituals as the US team; real-time accountability across zones.",
    image: "/goals/client-partnership.png",
    tag: "Embedded delivery",
  },
  {
    title: "Continuous learning",
    body: "Certifications, mentor labs, and stack training matched to live client work.",
    image: "/goals/continuous-learning.jpg",
    tag: "Upskilling",
  },
] as const;

export const VALUES = [
  {
    title: "Recruit well",
    body: "Screen for aptitude, communication, and long-term fit — not keyword matches alone.",
    image: "/values/recruit-well.png",
  },
  {
    title: "Train fully",
    body: "No live US queue without preparation: tools, scenarios, and client standards.",
    image: "/values/train-fully.png",
  },
  {
    title: "Deliver results",
    body: "Success measured on client KPIs and retention, not internal vanity metrics.",
    image: "/values/deliver-results.png",
  },
] as const;

export const LEARNING = [
  {
    title: "Paid induction",
    body: "Orientation, compliance, and security before account assignment.",
  },
  {
    title: "Communication",
    body: "US business speech and written standards for client-facing work.",
  },
  {
    title: "Tooling",
    body: "Sandboxed practice on Jira, Salesforce, Zendesk, AWS, and related stacks.",
  },
  {
    title: "Leadership track",
    body: "Mentorship into team lead, floor QA, and operations roles.",
  },
] as const;

export const LIFE_ACTIVITIES = [
  {
    title: "Gym Membership",
    body: "Company-sponsored gym membership so you can stay fit, decompress after US shifts, and build healthy routines year-round.",
    icon: "gym" as const,
    image: "/life/gym-membership.jpg",
  },
  {
    title: "Weekend Sports",
    body: "Weekend cricket, badminton, table tennis, and friendly matches to unwind with the team outside the terminal.",
    icon: "trophy" as const,
    image: "/life/sports-gala-cricket.jpg",
  },
  {
    title: "Star of the Month",
    body: "Public recognition, gift vouchers, and cash bonuses for agents who exceed monthly SLA targets.",
    icon: "star" as const,
    image: "/life/star-month.jpg",
  },
  {
    title: "Skill Enrichment Sessions",
    body: "Interactive sessions covering US business idioms, cloud certifications, and public speaking.",
    icon: "graduation" as const,
    image: "/life/skill-sessions.jpg",
  },
  {
    title: "Festivals & Birthdays",
    body: "Cake cutting on every birthday, festive holiday dinners, and cultural exchanges.",
    icon: "party" as const,
    image: "/life/festivals.jpg",
  },
  {
    title: "Breakroom & Game Nights",
    body: "Recharge between calls with console games, foosball, quiet rest corners, and unlimited tea & coffee.",
    icon: "game" as const,
    image: "/life/breakroom.jpg",
  },
] as const;

export const CULTURE_TILES = [
  {
    title: "Client-aligned teams",
    body: "Daily syncs with US engineering and account leads; shared tools and rituals.",
    image: "/culture/teamwork.jpg",
  },
  {
    title: "Scheduled sports",
    body: "Weekly badminton, cricket, and table tennis for off-shift recovery.",
    image: "/culture/weekly-sports-cricket.jpg",
  },
  {
    title: "Floor briefings & meals",
    body: "Monthly updates, sprint reviews, and team meals after major deliveries.",
    image: "/culture/lunches.jpg",
  },
  {
    title: "Performance awards",
    body: "Spot bonuses, Star of the Month, and client commendations on record.",
    image: "/culture/excellence-awards-trophy.jpg",
  },
] as const;

/** Home — IT capabilities (from existing site language; no new service claims) */
export const CAPABILITIES = [
  {
    title: "Software engineering",
    body: "Engineering teams that work in the client’s tools, processes, and delivery cadence.",
    image: "/goals/continuous-learning.jpg",
  },
  {
    title: "IT operations",
    body: "Reliable IT support and operations aligned to US business hours and standards.",
    image: "/goals/client-partnership.png",
  },
  {
    title: "US-aligned delivery",
    body: "Coverage across US time zones with real-time collaboration and shared rituals.",
    image: "/goals/growth.jpg",
  },
  {
    title: "Quality & security",
    body: "Outcome-focused quality, IP controls, and secured networks on every engagement.",
    image: "/goals/trust.jpg",
  },
] as const;

/** Home — Why Comtanix (company differentiators from existing goals) */
export const WHY_COMTANIX = [
  {
    title: "Quality first",
    body: "Root-cause resolution and client outcomes ahead of vanity metrics.",
    image: "/goals/quality.jpg",
  },
  {
    title: "Security & trust",
    body: "NDAs, IP protection, and secure infrastructure on US accounts.",
    image: "/goals/trust.jpg",
  },
  {
    title: "Embedded partnership",
    body: "Same tools and accountability as the US team across time zones.",
    image: "/goals/client-partnership.png",
  },
] as const;

/** Home life preview — three stronger beats (links to full Life page) */
export const LIFE_PREVIEW = [
  {
    title: "Client-aligned teams",
    body: "Daily syncs with US leads and an ego-free collaborative floor.",
    image: "/culture/teamwork.jpg",
  },
  {
    title: "Learning on the job",
    body: "Paid induction, communication coaching, and stack upskilling.",
    image: "/life/skill-sessions.jpg",
  },
  {
    title: "Balance around US hours",
    body: "Sports, recognition, and team rituals built for night and hybrid shifts.",
    image: "/culture/lunches.jpg",
  },
] as const;
