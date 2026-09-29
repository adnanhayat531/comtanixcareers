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
    title: "Profile Screening",
    body: "Our Talent Acquisition squad evaluates your background within 48 business hours.",
  },
  {
    n: "2",
    title: "Communication Assessment",
    body: "A 15-minute phone or in-person check focusing on spoken English and situational clarity.",
  },
  {
    n: "3",
    title: "Executive Interview & Offer",
    body: "Final panel with campaign supervisors, immediate job offer letter, and onboarding schedule.",
  },
] as const;

export default function ApplyPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <Container className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] xl:gap-16">
        <div>
          <SectionHeading
            compact
            eyebrow="Fast-Track Application"
            title="Join the Comtanix Team"
            description="Complete the form below. We’ll open WhatsApp with your details so you can send your application and CV to our hiring team."
            className="mb-8"
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

        <aside className="rounded-lg border border-line bg-surface p-6 md:sticky md:top-24 md:p-7">
          <h3 className="font-display text-lg font-semibold text-ink md:text-xl">
            What happens next?
          </h3>
          <p className="mt-2 text-sm text-muted">
            Our recruitment pipeline is fast, respectful, and transparent.
          </p>
          <ol className="mt-6 space-y-5">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sea to-brand font-display text-sm font-bold text-white">
                  {s.n}
                </span>
                <div>
                  <p className="font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            Prefer to talk first?{" "}
            <a
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand hover:underline"
            >
              Message us on WhatsApp
            </a>
            .
          </p>
          <Button href="/careers" variant="secondary" className="mt-6 w-full">
            Browse Open Positions
          </Button>
        </aside>
      </Container>
    </Section>
  );
}
