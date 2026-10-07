import { Container, Section } from "@/components/ui/Section";

const BENEFITS = [
  {
    title: "Market-leading Salary",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden className="h-full w-full">
        <rect className="fill-a" x="4" y="12" width="40" height="24" rx="4" />
        <circle cx="24" cy="24" r="6" />
        <path d="M10 18v.01M38 30v.01" />
      </svg>
    ),
  },
  {
    title: "Medical Coverage Self & Dependents",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden className="h-full w-full">
        <path
          className="fill-a"
          d="M24 41S6 30 6 17a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 13-18 24-18 24z"
        />
        <path d="M12 24h7l3-6 4 10 3-4h7" />
      </svg>
    ),
  },
  {
    title: "Parents Medical Coverage",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden className="h-full w-full">
        <circle className="fill-a" cx="15" cy="11" r="5" />
        <circle className="fill-a" cx="33" cy="11" r="5" />
        <path d="M8 41V29a7 7 0 0 1 14 0v12M26 41V29a7 7 0 0 1 14 0v12M4 28v13" />
      </svg>
    ),
  },
  {
    title: "Provident Fund",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden className="h-full w-full">
        <path d="M6 40V30M14 40V24M22 40V32" />
        <path d="M30 22V8M24 14l6-6 6 6" />
        <circle className="fill-a" cx="35" cy="35" r="8" />
        <path d="M35 31v8" />
      </svg>
    ),
  },
  {
    title: "Employee Performance-Based Bonuses",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden className="h-full w-full">
        <circle className="fill-a" cx="24" cy="20" r="13" />
        <path d="M24 13l2 4 4.5.6-3.3 3.1.8 4.4-4-2.1-4 2.1.8-4.4-3.3-3.1 4.5-.6zM17 31l-4 12 11-5 11 5-4-12" />
      </svg>
    ),
  },
  {
    title: "Profit Sharing Plan",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden className="h-full w-full">
        <circle className="fill-a" cx="24" cy="24" r="16" />
        <path d="M24 8v16l13.6 8" />
        <path d="M30 5a19 19 0 0 1 13 13H30z" />
      </svg>
    ),
  },
  {
    title: "Child Care Facility",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden className="h-full w-full">
        <circle className="fill-a" cx="24" cy="25" r="14" />
        <path d="M24 11c0-4 3-6 6-5M18 22v.01M30 22v.01M19 29a7 5 0 0 0 10 0" />
      </svg>
    ),
  },
  {
    title: "Company Provided Lunch/Dinner",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden className="h-full w-full">
        <circle className="fill-a" cx="24" cy="24" r="10" />
        <circle cx="24" cy="24" r="4.5" />
        <path d="M6 8v9a3 3 0 0 0 6 0V8M9 8v32M42 8c-4 2-5 8-5 14h5zM42 22v18" />
      </svg>
    ),
  },
] as const;

export function FacilitiesBenefits() {
  return (
    <Section
      id="facilities"
      className="scroll-mt-24 border-t border-line bg-tint md:scroll-mt-28 [--fb:#2f7a84] [--fb-d:#0f3d45] [--fb-l:#e8f2f3] [--fb-ink:#0b2c35] [--fb-card:#ffffff] [--fb-line:rgba(47,122,132,0.22)]"
    >
      <Container>
        <div className="mx-auto w-full max-w-none">
          <h2 className="type-h2 text-center text-ink">
            Facilities &amp;{" "}
            <span className="font-bold text-ink">Benefits</span>
          </h2>
          <p className="type-eyebrow mt-2.5 text-center text-ink/70">
            Because your growth matters
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
            {BENEFITS.map((b) => (
              <li
                key={b.title}
                className="group relative flex min-h-[140px] min-w-0 flex-col items-center overflow-hidden rounded-2xl border border-[var(--fb-line)] bg-white px-2 py-4 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(14,154,167,0.18)] sm:min-h-[180px] sm:rounded-[22px] sm:px-4 sm:py-6 md:min-h-[210px] md:rounded-[26px] md:px-[18px] md:py-7"
              >
                {/* Top card line — white */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[5px] bg-white"
                />

                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-[var(--fb-l)] shadow-[0_4px_12px_rgba(14,154,167,0.15)] transition-colors duration-300 group-hover:bg-[var(--fb)] sm:mb-4 sm:h-[72px] sm:w-[72px] md:mb-5 md:h-[84px] md:w-[84px]">
                  <span className="block h-7 w-7 text-[var(--fb)] transition-colors duration-300 group-hover:text-white sm:h-9 sm:w-9 md:h-[42px] md:w-[42px] [&_svg]:h-full [&_svg]:w-full [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[2.4] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_.fill-a]:fill-current [&_.fill-a]:opacity-20">
                    {b.icon}
                  </span>
                </div>

                <h3 className="font-display text-[11px] font-bold leading-snug text-ink sm:text-sm md:text-base md:leading-[1.45]">
                  {b.title}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
