import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight, Clock, MapPin, Building2 } from "lucide-react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { CONFIG, DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Submit CV",
  description:
    "Submit your CV to Comtanix for future openings. We review profiles and contact matching candidates when roles open.",
};

const STEPS = [
  {
    n: "01",
    title: "CV review",
    body: "Our hiring team reviews your profile for fit and experience.",
  },
  {
    n: "02",
    title: "Talent pool",
    body: "Strong CVs are kept for upcoming opportunities only.",
  },
  {
    n: "03",
    title: "We reach out",
    body: "When a matching role opens, we contact you for next steps.",
  },
] as const;

export default function SubmitCvPage() {
  return (
    <>
      <section className="relative flex min-h-[42vh] flex-col justify-end overflow-hidden sm:min-h-[46vh] md:min-h-[50vh] lg:min-h-[52vh]">
        <Image
          src="/careers-team.jpg"
          alt="Submit your CV to Comtanix for future opportunities"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-3xl bg-gradient-to-r from-white/75 via-white/40 to-transparent"
          aria-hidden
        />

        <Container className="relative z-10 py-8 sm:py-10 md:py-12">
          <div className="max-w-xl">
            <p className="type-eyebrow mb-2 text-ink">Future openings</p>
            <h1 className="type-h1 text-ink">Submit your CV.</h1>
            <p className="type-lede mt-2.5 max-w-md text-ink/85 sm:mt-3">
              For future opportunities only. We review your CV and keep strong
              profiles for when a matching role opens. For a listed job, use{" "}
              <a href="/apply" className="font-semibold text-brand hover:underline">
                Apply
              </a>
              .
            </p>
            <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                href="#cv-form"
                className="!bg-[#55ACB5] text-white hover:!brightness-110"
              >
                Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href="/careers#openings"
                className="!border-0 !bg-white !text-ink shadow-soft hover:!bg-white/95"
              >
                Current openings <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section id="cv-form" className="scroll-mt-20 md:scroll-mt-28">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 xl:gap-16">
            <div className="min-w-0">
              <SectionHeading
                compact
                eyebrow="Talent pool"
                title="CV submission form"
                description="This form is for future openings — not a live role application. Attach a PDF or Word CV to continue."
                className="mb-6 md:mb-8"
              />

              <div className="mb-6 rounded-md border border-brand/30 bg-tint px-4 py-4 sm:px-5">
                <p className="type-eyebrow text-brand">Confirm before you submit</p>
                <p className="type-meta mt-1.5 text-muted">
                  Future roles at Comtanix are typically night shift, onsite, and
                  based in Bahria Town Phase 8. Confirm these fit you before
                  submitting your CV.
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    {
                      icon: Clock,
                      text: "Night shift (office hours aligned to overseas clients)",
                    },
                    {
                      icon: Building2,
                      text: "Onsite job — work from the Comtanix office (not remote)",
                    },
                    {
                      icon: MapPin,
                      text: `Location: Bahria Town Phase 8, Rawalpindi — ${CONFIG.address}`,
                    },
                  ].map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="type-meta flex items-start gap-2.5 leading-snug text-ink"
                    >
                      <Icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden
                      />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Suspense
                fallback={
                  <p className="text-muted" role="status">
                    Loading form…
                  </p>
                }
              >
                <ApplyForm mode="cv" />
              </Suspense>
            </div>

            <aside className="min-w-0 lg:pt-2">
              <p className="type-eyebrow text-brand">What happens next</p>
              <h2 className="type-h2 mt-1.5 text-ink">After you submit your CV</h2>
              <p className="type-meta mt-2 text-muted">
                We use this for future openings only. Prefer to talk first?{" "}
                <a
                  href={waLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:underline"
                >
                  WhatsApp hiring
                </a>
                .
              </p>
              <ol className="mt-6 space-y-5 border-t border-line pt-6">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="type-eyebrow text-brand">{s.n}</span>
                    <div>
                      <p className="type-h3 text-ink">{s.title}</p>
                      <p className="type-meta mt-1 text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="type-meta mt-8 text-muted">
                Ready for a listed job?{" "}
                <a
                  href="/apply"
                  className="font-semibold text-brand hover:underline"
                >
                  Apply to a current opening
                </a>
                .
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
