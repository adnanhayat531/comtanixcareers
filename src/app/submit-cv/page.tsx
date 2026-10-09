import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight, Clock, MapPin, Building2 } from "lucide-react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
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
      <PageHero
        eyebrow="Future openings"
        title="Submit your CV."
        description="For future opportunities only. We review your CV and keep strong profiles for when a matching role opens. For a listed job, use Apply."
        image="/careers-collab.jpg"
        imageAlt="Submit your CV to Comtanix for future opportunities"
      >
        <Button href="#cv-form" variant="white">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/careers#openings" variant="outlineLight">
          Current openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section id="cv-form" className="scroll-mt-24 bg-white md:scroll-mt-28">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div className="min-w-0">
              <SectionHeading
                compact
                eyebrow="Talent pool"
                title="CV submission form"
                description="This form is for future openings — not a live role application. Attach a PDF or Word CV to continue."
                className="mb-6"
              />

              <div className="mb-6 rounded-[var(--radius-lg)] border border-brand/25 bg-tint px-4 py-4">
                <p className="type-eyebrow text-brand">Confirm before you submit</p>
                <p className="type-meta mt-2 text-muted">
                  Future roles at Comtanix are typically night shift, onsite, and
                  based in Bahria Town Phase 8. Confirm these fit you before
                  submitting your CV.
                </p>
                <ul className="mt-4 space-y-2.5">
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

            <aside className="min-w-0 rounded-xl border border-line bg-tint/50 p-6 lg:sticky lg:top-28 lg:p-8">
              <p className="type-eyebrow text-brand">What happens next</p>
              <h2 className="type-h2 mt-2 text-ink">
                <BrandAccentText>After you submit your CV</BrandAccentText>
              </h2>
              <p className="type-meta mt-3 text-muted">
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
              <ol className="mt-7 space-y-5 border-t border-line pt-7">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="type-eyebrow text-brand">{s.n}</span>
                    <div>
                      <p className="type-h3 text-ink">
                        <BrandAccentText>{s.title}</BrandAccentText>
                      </p>
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
