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
  title: "Apply",
  description:
    "Apply to a current open role at Comtanix. Night shift, onsite, Bahria Town Phase 8.",
};

const STEPS = [
  {
    n: "01",
    title: "Screening",
    body: "Background review within two business days.",
  },
  {
    n: "02",
    title: "Communication check",
    body: "Short spoken-English and situational assessment.",
  },
  {
    n: "03",
    title: "Interview & offer",
    body: "Panel interview, written offer, and onboarding date.",
  },
] as const;

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Current openings"
        title="Apply for an open role."
        description="Choose a listed opening, confirm the job facts, and send your application. Looking for later roles? Use Submit CV for the talent pool."
        image="/careers-collab.jpg"
        imageAlt="Apply to a current Comtanix opening"
      >
        <Button href="#application" variant="white">
          Apply now <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/careers#openings" variant="outlineLight">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section id="application" className="scroll-mt-24 bg-white md:scroll-mt-28">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div className="min-w-0">
              <SectionHeading
                compact
                eyebrow="Your details"
                title="Application form"
                description="Apply only for a current open role. Attach a PDF or Word CV to continue."
                className="mb-6"
              />

              <div className="mb-6 rounded-[var(--radius-lg)] border border-brand/25 bg-tint px-4 py-4">
                <p className="type-eyebrow text-brand">Confirm before you apply</p>
                <p className="type-meta mt-2 text-muted">
                  Current openings are night shift, onsite only, and based in
                  Bahria Town Phase 8. If any of this does not work for you,
                  please do not apply.
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
                <ApplyForm mode="apply" />
              </Suspense>
            </div>

            <aside className="min-w-0 rounded-xl border border-line bg-tint/50 p-6 lg:sticky lg:top-28 lg:p-8">
              <p className="type-eyebrow text-brand">What happens next</p>
              <h2 className="type-h2 mt-2 text-ink">
                <BrandAccentText>From apply to offer</BrandAccentText>
              </h2>
              <p className="type-meta mt-3 text-muted">
                Typical path after you apply. Prefer to talk first?{" "}
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
                No matching open role right now?{" "}
                <a
                  href="/submit-cv"
                  className="font-semibold text-brand hover:underline"
                >
                  Submit your CV
                </a>{" "}
                for future openings.
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
