export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "AK",
    name: "Ayesha K.",
    role: "QA Lead — Healthcare",
    quote:
      "I joined as a junior CSR on a healthcare support process. Within 14 months, thanks to internal leadership coaching, I was promoted to Floor QA Lead. Comtanix values consistency over politics.",
  },
  {
    initials: "SM",
    name: "Sara Malik",
    role: "Cloud Support Engineer",
    quote:
      "Working direct night shifts with international DevOps engineers expanded my systems engineering skills 10x compared to standard local firms. Compensation is always on time.",
  },
  {
    initials: "HB",
    name: "Hamza Bilal",
    role: "Operations Supervisor",
    quote:
      "The work environment is modern, respectful, and safe. Management cares about ergonomics, mental health during overnight shifts, and real career progression.",
  },
  {
    initials: "UF",
    name: "Usman F.",
    role: "Team Leader",
    quote:
      "Comtanix promotes from within. I started as an agent and now lead a team of my own.",
  },
  {
    initials: "NZ",
    name: "Noor Z.",
    role: "Back Office Executive",
    quote:
      "Clear targets, fair reviews and a supportive team. I always know where I stand.",
  },
];
