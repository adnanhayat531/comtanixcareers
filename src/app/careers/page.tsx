import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
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
            <p className="mb-2 text-[11px] font-semibold tracking-[0.1em] text-ink uppercase">
              Careers
            </p>
            <h1 className="font-display text-[clamp(1.5rem,4.5vw,2.5rem)] font-bold tracking-tight text-ink leading-[1.15]">
              Build your career on real US IT work.
            </h1>
            <p className="mt-2.5 max-w-md text-[14px] font-medium leading-[1.55] text-ink/85 sm:mt-3 sm:text-[15px] md:text-base">
              Open roles across engineering and IT support — with paid training,
              clear progression, and teams that deliver for American businesses.
            </p>
            <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                href="/apply"
                className="!bg-[#55ACB5] text-white hover:!brightness-110"
              >
                Apply now <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href="#openings"
                className="!border-0 !bg-white !text-ink shadow-soft hover:!bg-white/95"
              >
                View openings <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section id="openings">
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
