import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { Container, Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Submit CV",
  description:
    "Submit your CV to be considered for future opportunities. We'll be in touch when a role aligns with your experience and expertise.",
};

export default function SubmitCvPage() {
  return (
    <Section
      id="cv-form"
      className="site-dark-section scroll-mt-24 pt-10 md:scroll-mt-28 md:pt-12"
    >
      <Container>
        <div className="w-full min-w-0">
          <div className="mb-6 max-w-3xl sm:mb-8">
            <p className="type-eyebrow text-brand">Future openings</p>
            <h1 className="type-h2 mt-2 text-ink">Connect for Future Roles</h1>
            <p className="type-body mt-2.5 max-w-2xl text-muted">
              Submit your CV to be considered for future opportunities.
              We&apos;ll be in touch when a role aligns with your experience
              and expertise.
            </p>
          </div>

          <div className="theme-light w-full rounded-2xl border border-line bg-white p-5 shadow-[0_0_0_1px_var(--glow),var(--shadow-soft)] sm:p-7 md:p-8 lg:p-10">
            <Suspense
              fallback={
                <p className="text-center text-muted" role="status">
                  Loading form…
                </p>
              }
            >
              <ApplyForm mode="cv" />
            </Suspense>
          </div>
        </div>
      </Container>
    </Section>
  );
}
