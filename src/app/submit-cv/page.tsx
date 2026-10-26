import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { Container, Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Submit CV",
  description:
    "Submit your CV to Comtanix for future openings. We review profiles and contact matching candidates when roles open.",
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
            <h1 className="type-h2 mt-2 text-ink">Submit your CV.</h1>
            <p className="type-body mt-2.5 max-w-2xl text-muted">
              Share your profile for upcoming roles. We review every CV and
              reach out when there is a strong match. For a listed job,{" "}
              <a
                href="/apply"
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                apply here
              </a>
              .
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
