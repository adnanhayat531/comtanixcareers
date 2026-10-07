import type { Metadata } from "next";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { FacilitiesBenefits } from "@/components/careers/FacilitiesBenefits";
import { HowWeHire } from "@/components/careers/HowWeHire";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
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
      <PageHero
        eyebrow="Careers"
        title="Build your career on real global IT work."
        description="Open roles across engineering and IT support — with paid training, clear progression, and teams that deliver for businesses worldwide."
        image="/careers/hero-desk.jpg"
        imageAlt="Comtanix careers — innovation, teamwork, and growth"
      >
        <Button href="#openings" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/submit-cv" variant="outlineLight">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section id="openings" className="scroll-mt-24 bg-white md:scroll-mt-28">
        <Container>
          <div className="mb-8 rounded-xl border border-brand/25 bg-tint px-5 py-5 sm:px-6">
            <p className="type-eyebrow text-brand">Before you apply</p>
            <p className="type-body mt-2 text-muted">
              All listed roles are <span className="font-semibold text-ink">night shift</span>,{" "}
              <span className="font-semibold text-ink">onsite</span>, and based at{" "}
              <span className="font-semibold text-ink">
                Bahria Town Phase 8, Rawalpindi
              </span>
              . Please confirm these fit you before submitting an application.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
            {ROLES.map((role) => {
              const shift =
                role.tags.find((t) => /night/i.test(t)) ?? "Night shift";
              return (
                <article
                  key={role.id}
                  className="list-row flex flex-col gap-5 px-5 py-7 sm:px-7 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="type-h3 text-ink">{role.title}</h2>
                    <div className="type-meta mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-muted">
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
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.tags.map((t) => (
                        <span
                          key={t}
                          className="type-eyebrow rounded-md border border-brand/20 bg-tint px-2.5 py-1 text-brand"
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {WHY.map((w, i) => (
              <div key={w.title}>
                <p className="type-eyebrow text-brand">0{i + 1}</p>
                <h3 className="type-h3 mt-2 text-ink">{w.title}</h3>
                <p className="type-meta mt-2 text-muted">{w.body}</p>
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
