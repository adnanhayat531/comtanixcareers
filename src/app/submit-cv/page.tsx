import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Submit CV",
  description:
    "Submit your CV to Comtanix for future openings. We review profiles and contact matching candidates when roles open.",
};

export default function SubmitCvPage() {
  return (
    <>
      <PageHero
        eyebrow="Future openings"
        title="Submit your CV."
        description="Share your profile for upcoming roles. We review every CV and reach out when there is a strong match."
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

      <Section id="cv-form" className="scroll-mt-24 bg-canvas md:scroll-mt-28">
        <Container>
          <div className="w-full min-w-0">
            <div className="mb-5 max-w-3xl sm:mb-7">
              <p className="type-eyebrow text-brand">Talent pool</p>
              <h2 className="type-h2 mt-2 text-ink">CV submission</h2>
              <p className="type-body mt-2.5 text-muted">
                Fill in your details and attach a PDF or Word CV. Looking for a
                listed job?{" "}
                <a
                  href="/apply"
                  className="font-semibold text-brand underline-offset-2 hover:underline"
                >
                  Apply to a current opening
                </a>
                .
              </p>
            </div>

            <div className="w-full rounded-[var(--radius-xl)] border border-line bg-white p-4 shadow-soft sm:p-6 md:p-8 lg:p-10">
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
          </div>
        </Container>
      </Section>
    </>
  );
}
