import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";

const STEPS = [
  {
    n: "01",
    title: "Application Received",
    body: "We receive your application and CV.",
    icon: "/careers/hire/step-01.png",
  },
  {
    n: "02",
    title: "Shortlisted After Review",
    body: "Our team reviews your profile against the role.",
    icon: "/careers/hire/step-02.png",
  },
  {
    n: "03",
    title: "Online Assessment",
    body: "A short test of your skills for the role.",
    icon: "/careers/hire/step-03.png",
  },
  {
    n: "04",
    title: "Interviews",
    body: "Technical rounds may be more than one, based on business unit needs.",
    icon: "/careers/hire/step-04.png",
    tags: ["Technical", "HR"] as const,
  },
  {
    n: "05",
    title: "Final Evaluation",
    body: "Shortlisted candidates move to the final interview.",
    icon: "/careers/hire/step-05.png",
  },
] as const;

export function HowWeHire() {
  return (
    <Section
      id="how-we-hire"
      className="bg-white [--hire:#0e9aa7] [--hire-d:#0a6f7a] [--hire-l:#e3f6f7] [--hire-ink:#17383d] [--hire-mute:#5d7a7e] [--hire-line:#cfe8ea]"
    >
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <h2 className="type-h2 text-center text-[var(--hire-ink)]">
            How We <span className="font-bold text-[var(--hire)]">Hire</span>
          </h2>
          <p className="type-body mx-auto mt-2 max-w-[560px] px-1 text-center text-[var(--hire-mute)]">
            A clear, fair path from your application to your first day at
            Comtanix.
          </p>

          <ol className="relative mt-12 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-12 md:gap-x-6 lg:mt-16 lg:grid-cols-5 lg:gap-4 xl:gap-5">
            {/* Desktop connector */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[2.15rem] right-[6%] left-[6%] z-0 hidden border-t-2 border-dashed border-[var(--hire)] opacity-45 lg:block"
            />

            {STEPS.map((step) => (
              <li
                key={step.n}
                className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center sm:max-w-none"
              >
                <div className="relative z-20 h-16 w-16 shrink-0 overflow-hidden rounded-[18px] border-[3px] border-white shadow-[0_8px_18px_rgba(14,154,167,0.35)] sm:h-[4.5rem] sm:w-[4.5rem] lg:h-[88px] lg:w-[88px] lg:rounded-[20px]">
                  <Image
                    src={step.icon}
                    alt=""
                    width={88}
                    height={88}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 72px, 88px"
                  />
                </div>

                <div className="mt-[-1.35rem] flex h-full w-full flex-col rounded-2xl border border-[var(--hire-line)] bg-white px-4 pt-9 pb-5 text-center shadow-[0_6px_18px_rgba(14,154,167,0.08)] sm:rounded-[18px] sm:px-3.5 sm:pt-10 sm:pb-[22px] lg:mt-[-1.75rem] lg:px-3 lg:pt-12 xl:px-4">
                  <p className="mb-1.5 font-display text-[11px] font-bold tracking-[0.12em] text-[var(--hire)] uppercase sm:text-xs">
                    Step {step.n}
                  </p>
                  <h3 className="font-display text-[15px] font-semibold leading-snug text-[var(--hire-ink)] sm:text-base">
                    {step.title}
                  </h3>
                  {"tags" in step && step.tags ? (
                    <div className="mt-2 mb-1 flex flex-wrap justify-center gap-1.5 sm:mb-2.5">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--hire-l)] px-2.5 py-1 font-body text-[11px] font-medium text-[var(--hire-d)] sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="type-meta mt-2 flex-1 text-[var(--hire-mute)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:mt-9 sm:gap-4 md:mt-10 md:grid-cols-2 md:gap-[18px]">
            <div className="flex items-start gap-3.5 rounded-2xl bg-gradient-to-br from-[var(--hire)] to-[var(--hire-d)] px-4 py-4 text-white sm:items-center sm:gap-4 sm:rounded-[18px] sm:px-5 sm:py-5 md:px-6 md:py-[22px]">
              <Image
                src="/careers/hire/outcome-offer.png"
                alt=""
                width={68}
                height={68}
                className="h-14 w-14 shrink-0 rounded-xl border-2 border-white/75 object-cover sm:h-[68px] sm:w-[68px] sm:rounded-2xl"
                sizes="(max-width: 640px) 56px, 68px"
              />
              <div className="min-w-0 pt-0.5 sm:pt-0">
                <h4 className="font-display text-[15px] font-semibold text-white sm:text-base">
                  Job Offered
                </h4>
                <p className="type-meta mt-1 text-white/90">
                  Welcome to the team. Let&apos;s get you started.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-[var(--hire-line)] bg-[var(--hire-l)] px-4 py-4 sm:items-center sm:gap-4 sm:rounded-[18px] sm:px-5 sm:py-5 md:px-6 md:py-[22px]">
              <Image
                src="/careers/hire/outcome-other.png"
                alt=""
                width={68}
                height={68}
                className="h-14 w-14 shrink-0 rounded-xl border-2 border-white/75 object-cover sm:h-[68px] sm:w-[68px] sm:rounded-2xl"
                sizes="(max-width: 640px) 56px, 68px"
              />
              <div className="min-w-0 pt-0.5 sm:pt-0">
                <h4 className="font-display text-[15px] font-semibold text-[var(--hire)] sm:text-base">
                  Not shortlisted?
                </h4>
                <p className="type-meta mt-1 text-[var(--hire-mute)]">
                  You&apos;ll still be considered for other current or future
                  openings. We encourage you to apply again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
