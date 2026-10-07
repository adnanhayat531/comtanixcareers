import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { FacilitiesBenefits } from "@/components/careers/FacilitiesBenefits";
import { HowWeHire } from "@/components/careers/HowWeHire";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { ROLES } from "@/lib/data/roles";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Comtanix for freshers and experienced professionals across global IT teams.",
};

const WHY = [
  {
    title: "Paid training",
    body: "Induction covers process, tools, and professional communication before live queues.",
  },
  {
    title: "Defined progression",
    body: "Agent → senior → team lead → manager, with scheduled reviews.",
  },
  {
    title: "Performance pay",
    body: "Monthly incentives tied to published SLA and quality metrics.",
  },
  {
    title: "Office standards",
    body: "Workstations, network stability, access control, and on-floor support.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      {/* Half hero */}
      <section className="relative flex min-h-[42vh] flex-col justify-start overflow-hidden sm:min-h-[46vh] md:min-h-[50vh] lg:min-h-[52vh]">
        <Image
          src="/careers/hero-desk.jpg"
          alt="Comtanix careers — innovation, teamwork, and growth"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_45%]"
        />
        {/* Soft light wash behind dark text */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-3xl bg-gradient-to-r from-white/75 via-white/40 to-transparent"
          aria-hidden
        />

        <Container className="relative z-10 pt-8 pb-10 sm:pt-10 sm:pb-12 md:pt-12 md:pb-14">
          <div className="max-w-xl">
            <p className="type-eyebrow mb-2 text-ink">Careers</p>
            <h1 className="type-h1 text-ink">
              Build your career on real global IT work.
            </h1>
            <p className="type-lede mt-2.5 max-w-md text-ink/85 sm:mt-3">
              Open roles across engineering and IT support — with paid training,
              clear progression, and teams that deliver for businesses worldwide.
            </p>
            <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                href="#openings"
                className="!bg-[#55ACB5] text-white hover:!brightness-110"
              >
                View openings <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href="/submit-cv"
                className="!border-0 !bg-white !text-ink shadow-soft hover:!bg-white/95"
              >
                Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section id="openings">
        <Container>
          <div className="mb-5 rounded-md border border-brand/30 bg-tint px-4 py-4 sm:px-5">
            <p className="type-eyebrow text-brand">Before you apply</p>
            <p className="type-body mt-1.5 text-muted">
              All listed roles are <span className="font-semibold text-ink">night shift</span>,{" "}
              <span className="font-semibold text-ink">onsite</span>, and based at{" "}
              <span className="font-semibold text-ink">
                Bahria Town Phase 8, Rawalpindi
              </span>
              . Please confirm these fit you before submitting an application.
            </p>
          </div>

          <div className="overflow-hidden rounded-md border border-line bg-surface">
            {ROLES.map((role) => {
              const shift =
                role.tags.find((t) => /night/i.test(t)) ?? "Night shift";
              return (
                <article
                  key={role.id}
                  className="list-row flex flex-col gap-4 px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between md:gap-8"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="type-h3 text-ink">{role.title}</h2>
                    <div className="type-meta mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden />
                        Bahria Town Phase 8 · Onsite
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-brand" aria-hidden />
                        {shift}
                      </span>
                    </div>
                    <p className="type-body mt-3 max-w-3xl text-muted">
                      {role.detail ?? role.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.tags.map((t) => (
                        <span
                          key={t}
                          className="type-eyebrow rounded-sm border border-brand/25 bg-tint/80 px-2 py-0.5 text-brand"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto md:items-stretch">
                    <Button
                      href={`/apply?role=${encodeURIComponent(role.title)}`}
                      className="w-full min-h-11 sm:w-auto"
                    >
                      Apply <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-tint">
        <Container>
          <SectionHeading title="Why grow your career with us" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {WHY.map((w, i) => (
              <div key={w.title}>
                <p className="type-eyebrow text-brand">0{i + 1}</p>
                <h3 className="type-h3 mt-1.5 text-ink">{w.title}</h3>
                <p className="type-meta mt-1.5 text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <HowWeHire />
      <FacilitiesBenefits />
    </>
  );
}
