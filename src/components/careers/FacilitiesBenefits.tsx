import Image from "next/image";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Container, Section } from "@/components/ui/Section";

const BENEFITS = [
  {
    title: "Market-Competitive Salary",
    image: "/careers/benefits/salary.jpg",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
        <path d="M5 19V9.5L10 7l5 2.5V19" />
        <path d="M7.5 19v-5h5V19M8.5 11h.01M12 11h.01" />
        <path d="M15.5 8.5V19h3.5V10.5L15.5 8.5z" />
        <circle cx="18.2" cy="6.2" r="2.8" />
        <path d="M18.2 5v2.4M17.2 6.2h2" />
      </svg>
    ),
  },
  {
    title: "Medical Coverage for Employees and Eligible Dependents",
    image: "/careers/benefits/medical.jpg",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
        <path d="M12 20.5S5.5 15.8 5.5 10.2A3.9 3.9 0 0 1 12 7.8a3.9 3.9 0 0 1 6.5 2.4c0 5.6-6.5 10.3-6.5 10.3z" />
        <path d="M8 12h2.1l1.1-1.8 1.5 2.8 1-1.5H16" />
      </svg>
    ),
  },
  {
    title: "Performance-Based Bonuses",
    image: "/careers/benefits/bonuses.jpg",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
        <circle cx="12" cy="9" r="5.5" />
        <path d="M12 5.8l1 2 2.2.3-1.6 1.5.4 2.2L12 10.7 9.9 11.8l.4-2.2-1.6-1.5 2.2-.3z" />
        <path d="M8.8 14.2 7.5 20l4.5-2 4.5 2-1.3-5.8" />
      </svg>
    ),
  },
  {
    title: "Professional Learning & Development",
    image: "/careers/benefits/learning.jpg",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
        <path d="M3.5 10.5 12 6.5l8.5 4-8.5 4-8.5-4z" />
        <path d="M7.5 12.5v3.8c0 1.5 2 2.7 4.5 2.7s4.5-1.2 4.5-2.7v-3.8M19.5 11.2v5.5" />
      </svg>
    ),
  },
  {
    title: "Gym Membership",
    image: "/careers/benefits/gym.jpg",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
        <path d="M4 9.5v5M6.5 8v8M17.5 8v8M20 9.5v5M7.5 12h9" />
      </svg>
    ),
  },
  {
    title: "Sports & Recreational Activities",
    image: "/careers/benefits/sports.jpg",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
        <circle cx="9.5" cy="10.5" r="5.5" />
        <path d="M9.5 5c1.6 1.6 2.4 3.7 2.4 5.5S11.1 15.4 9.5 17M9.5 5C7.9 6.6 7.1 8.7 7.1 10.5S7.9 15.4 9.5 17M4.5 10.5h10M5.6 7.5h7.8M5.6 13.5h7.8" />
        <circle cx="16.8" cy="16" r="3" />
        <path d="M16.8 13.5v5M15 14.6l3.6 2.2M15 17.4l3.6-2.2" />
      </svg>
    ),
  },
] as const;

export function FacilitiesBenefits() {
  return (
    <Section
      id="facilities"
      className="theme-light site-light-section scroll-mt-24 border-t border-line md:scroll-mt-28"
    >
      <Container>
        <div className="mx-auto w-full max-w-none">
          <h2 className="type-h2 text-center text-ink">
            <BrandAccentText>Facilities & Benefits</BrandAccentText>
          </h2>
          <p className="type-body mx-auto mt-2.5 max-w-2xl text-center text-muted">
            Resources and perks designed to support your well-being,
            professional growth, and work-life balance.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mt-10 lg:grid-cols-3 lg:gap-5">
            {BENEFITS.map((b) => (
              <li
                key={b.title}
                className="group relative flex min-h-[14rem] flex-col items-center overflow-hidden rounded-[1.35rem] border border-[#cfe3e8] bg-gradient-to-b from-[#eef6f8] to-white px-4 pb-5 pt-2 shadow-[0_12px_28px_-18px_rgba(15,40,48,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:bg-gradient-to-b hover:from-[#dff4f5] hover:to-white hover:shadow-[0_18px_40px_-14px_rgba(13,148,136,0.45),0_0_0_1px_rgba(45,212,224,0.25)] sm:min-h-[15rem] sm:px-5 sm:pb-6"
              >
                <div className="relative mt-1 flex h-[7.5rem] w-full items-center justify-center sm:h-[8.25rem]">
                  <div className="relative z-10 -ml-6 h-[6.75rem] w-[6.75rem] overflow-hidden rounded-full bg-white shadow-[0_10px_22px_-12px_rgba(15,40,48,0.45)] ring-[3px] ring-white sm:-ml-8 sm:h-[7.5rem] sm:w-[7.5rem]">
                    <Image
                      src={b.image}
                      alt=""
                      fill
                      sizes="160px"
                      quality={92}
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="relative z-20 -ml-4 grid h-12 w-12 place-items-center rounded-full bg-[#3f4f56] text-[#b7e4e2] shadow-[0_10px_18px_-10px_rgba(15,40,48,0.55)] ring-[3px] ring-white sm:-ml-5 sm:h-[3.25rem] sm:w-[3.25rem]">
                    <span className="block h-[1.35rem] w-[1.35rem] sm:h-6 sm:w-6 [&_svg]:h-full [&_svg]:w-full [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.7] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]">
                      {b.icon}
                    </span>
                  </div>
                </div>

                <h3 className="type-h3 mt-auto max-w-[16rem] text-center text-ink">
                  <BrandAccentText>{b.title}</BrandAccentText>
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
