import Image from "next/image";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Container, Section } from "@/components/ui/Section";

const STEPS = [
  {
    n: "01",
    title: "Application Received",
    body: "We receive your application and consider your details for the role.",
    icon: "/careers/hire/step-01.png",
  },
  {
    n: "02",
    title: "Shortlisting",
    body: "We assess your experience, skills, and suitability against the role requirements.",
    icon: "/careers/hire/step-02.png",
  },
  {
    n: "03",
    title: "Online Assessment",
    body: "Complete a role-relevant assessment to demonstrate your skills and knowledge.",
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
    body: "Shortlisted candidates proceed to a final interview to assess overall suitability for the role.",
    icon: "/careers/hire/step-05.png",
  },
] as const;

export function HowWeHire() {
  return (
    <Section
      id="how-we-hire"
      className="site-dark-section scroll-mt-24 md:scroll-mt-28 [--hire:var(--brand)] [--hire-d:var(--deep)] [--hire-l:var(--tint)] [--hire-ink:var(--ink)] [--hire-mute:var(--muted)] [--hire-line:var(--line-strong)]"
    >
      <Container>
        <div className="mx-auto w-full max-w-none">
          <h2 className="type-h2 text-center text-[var(--hire-ink)]">
            <BrandAccentText>How We Hire</BrandAccentText>
          </h2>
          <p className="type-body mx-auto mt-2 max-w-2xl px-1 text-center text-[var(--hire-mute)]">
            A transparent, structured process to help you take the next step in
            your career at Comtanix.
          </p>

          <ol className="relative mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:mt-12 lg:grid-cols-3 lg:gap-4 xl:grid-cols-5 xl:gap-3">
            <div
              aria-hidden
              className="pointer-events-none absolute top-[1.75rem] right-[4%] left-[4%] z-0 hidden border-t-2 border-dashed border-[var(--hire)] opacity-45 xl:block"
            />

            {STEPS.map((step) => (
              <li
                key={step.n}
                className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center sm:max-w-none"
              >
                <div className="relative z-20 h-14 w-14 shrink-0 overflow-hidden rounded-[var(--radius-lg)] border-[3px] border-white shadow-brand sm:h-16 sm:w-16 lg:h-[4.25rem] lg:w-[4.25rem]">
                  <Image
                    src={step.icon}
                    alt=""
                    width={68}
                    height={68}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 68px"
                  />
                </div>

                <div className="glass-card mt-[-1.1rem] flex h-full w-full flex-col rounded-[var(--radius-lg)] px-3.5 pt-8 pb-4 text-center sm:px-3 sm:pt-9 lg:mt-[-1.25rem] lg:px-2.5 lg:pt-10 xl:px-3">
                  <p className="type-eyebrow mb-1.5 text-[var(--hire)]">
                    Step {step.n}
                  </p>
                  <h3 className="type-h3 text-[var(--hire-ink)]">
                    <BrandAccentText>{step.title}</BrandAccentText>
                  </h3>
                  {"tags" in step && step.tags ? (
                    <div className="mt-2 mb-1 flex flex-wrap justify-center gap-1.5">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-brand/45 bg-brand/20 px-2 py-0.5 type-meta font-semibold text-brand-bright"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="type-meta mt-1.5 flex-1 text-[var(--hire-mute)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 md:grid-cols-2 md:gap-4">
            <div className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--hire)] to-[var(--hire-d)] px-4 py-3.5 text-white sm:items-center sm:gap-3.5 sm:px-5 sm:py-4">
              <Image
                src="/careers/hire/outcome-offer.png"
                alt=""
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 rounded-[var(--radius-md)] border-2 border-white/75 object-cover sm:h-14 sm:w-14"
                sizes="(max-width: 640px) 48px, 56px"
              />
              <div className="min-w-0 pt-0.5 sm:pt-0">
                <h4 className="type-h3 text-white">
                  <BrandAccentText accentClassName="text-white underline decoration-white/50 decoration-2 underline-offset-[0.15em]">
                    Job Offered
                  </BrandAccentText>
                </h4>
                <p className="type-meta mt-1 text-white/90">
                  Welcome to the team. Let&apos;s get you started.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--hire-line)] bg-[var(--hire-l)] px-4 py-3.5 sm:items-center sm:gap-3.5 sm:px-5 sm:py-4">
              <Image
                src="/careers/hire/outcome-other.png"
                alt=""
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 rounded-[var(--radius-md)] border-2 border-white/75 object-cover sm:h-14 sm:w-14"
                sizes="(max-width: 640px) 48px, 56px"
              />
              <div className="min-w-0 pt-0.5 sm:pt-0">
                <h4 className="type-h3 text-[var(--hire-ink)]">
                  <BrandAccentText>Not shortlisted?</BrandAccentText>
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
