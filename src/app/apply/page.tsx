import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Apply Now",
  description:
    "Apply to Comtanix in minutes. Send your details on WhatsApp to our hiring team.",
};

const STEPS = [
  {
    n: "1",
    title: "Screening",
    body: "Background review within two business days.",
  },
  {
    n: "2",
    title: "Communication check",
    body: "Short spoken-English and situational assessment.",
  },
  {
    n: "3",
    title: "Interview & offer",
    body: "Panel interview, written offer, and onboarding date.",
  },
] as const;

export default function ApplyPage() {
  return (
    <Section className="pt-10 md:pt-12">
      <Container className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] xl:gap-12">
        <div>
          <SectionHeading
            compact
            eyebrow="Application"
            title="Apply to Comtanix"
            description="Submit the form. We open WhatsApp with your details so you can send the application and CV to hiring."
            className="mb-6"
          />
          <Suspense
            fallback={
              <p className="text-muted" role="status">
                Loading form…
              </p>
            }
          >
            <ApplyForm />
          </Suspense>
        </div>

        <aside className="rounded-md border border-line bg-surface p-5 md:sticky md:top-24 md:p-6">
          <h3 className="font-display text-base font-semibold text-ink md:text-lg">
            Process
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Typical path from application to offer.
          </p>
          <ol className="mt-5 space-y-4">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand font-display text-xs font-bold text-white">
                  {s.n}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{s.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-muted">
            Prefer to talk first?{" "}
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
          <Button href="/careers" variant="secondary" className="mt-5 w-full">
            Browse openings
          </Button>
        </aside>
      </Container>
    </Section>
  );
}
