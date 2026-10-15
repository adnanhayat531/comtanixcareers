import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to a current open role at Comtanix. Night shift, onsite, Bahria Town Phase 8.",
};

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

      <Section
        id="application"
        className="site-dark-section scroll-mt-24 md:scroll-mt-28"
      >
        <Container>
          <div className="w-full min-w-0">
            <div className="mb-5 max-w-3xl sm:mb-7">
              <p className="type-eyebrow text-brand">Your details</p>
              <h2 className="type-h2 mt-2 text-ink">Application form</h2>
              <p className="type-body mt-2.5 text-muted">
                Apply for a current open role and attach a PDF or Word CV. No
                matching role yet?{" "}
                <a
                  href="/submit-cv"
                  className="font-semibold text-brand underline-offset-2 hover:underline"
                >
                  Submit your CV
                </a>{" "}
                for future openings.
              </p>
            </div>

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
    </>
  );
}
