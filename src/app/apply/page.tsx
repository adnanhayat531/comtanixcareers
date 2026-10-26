import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { ApplyPageHeading } from "@/components/apply/ApplyPageHeading";
import { Container, Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to a current open role at Comtanix. US shift, onsite, Bahria Town Phase 8.",
};

export default function ApplyPage() {
  return (
    <Section
      id="application"
      className="site-dark-section scroll-mt-24 pt-10 md:scroll-mt-28 md:pt-12"
    >
      <Container>
        <div className="w-full min-w-0">
          <Suspense
            fallback={
              <div className="mb-5 max-w-3xl sm:mb-7">
                <p className="type-eyebrow text-brand">Current openings</p>
                <h1 className="type-h2 mt-2 text-ink">Apply for an open role.</h1>
              </div>
            }
          >
            <ApplyPageHeading />
          </Suspense>

          <div className="theme-light w-full rounded-[var(--radius-xl)] border border-line bg-white p-4 shadow-[0_0_0_1px_var(--glow),var(--shadow-soft)] sm:p-6 md:p-8 lg:p-10">
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
        </div>
      </Container>
    </Section>
  );
}
