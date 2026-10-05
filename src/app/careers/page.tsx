import type { Metadata } from "next";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading, PageIntro } from "@/components/ui/Section";
import { GetInTouch } from "@/components/layout/GetInTouch";
import { ROLES } from "@/lib/data/roles";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Comtanix for freshers and experienced professionals across US-process IT teams.",
};

const WHY = [
  {
    title: "Paid training",
    body: "Induction covers process, tools, and US communication before live queues.",
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
      <PageIntro
        eyebrow="Careers"
        title="Open roles"
        description="Positions across engineering and IT support for US-process delivery teams."
      >
        <p className="mt-4 text-sm font-semibold text-brand">
          {ROLES.length} openings listed
        </p>
      </PageIntro>

      <Section>
        <Container>
          <div className="overflow-hidden rounded-md border border-line bg-surface">
            {ROLES.map((role) => {
              const department = role.tags[role.tags.length - 1] ?? "Comtanix";
              const shift = role.tags.find((t) =>
                /shift|night|day|flexible|rotational|overlap/i.test(t),
              );
              return (
                <article
                  key={role.id}
                  className="list-row flex flex-col gap-4 px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between md:gap-8"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-lg font-semibold text-ink md:text-xl">
                      {role.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden />
                        {department}
                      </span>
                      {shift ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-brand" aria-hidden />
                          {shift}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-[15px]">
                      {role.detail ?? role.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-sm border border-brand/25 bg-tint/80 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-brand"
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
          <SectionHeading title="Why stay" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {WHY.map((w, i) => (
              <div key={w.title}>
                <p className="font-display text-xs font-bold tracking-[0.08em] text-brand uppercase">
                  0{i + 1}
                </p>
                <h3 className="mt-1.5 font-display text-base font-semibold text-ink">
                  {w.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <GetInTouch />
    </>
  );
}
