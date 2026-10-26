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
        image="/submit-cv/hero-v1.jpg"
        imageAlt="Candidate submitting a CV during an interview at Comtanix"
        imageFit="cover"
        objectPosition="62% 42%"
        className="page-hero-banner w-full !aspect-[1440/369] !h-auto !min-h-0 !max-h-none max-sm:!min-h-[15rem] max-sm:!aspect-auto max-sm:!h-[min(34vh,15rem)]"
      >
        <Button href="#cv-form" variant="white">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/careers#openings" variant="outlineLight">
          Current openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section
        id="cv-form"
        className="site-dark-section scroll-mt-24 md:scroll-mt-28"
      >
        <Container>
          <div className="w-full min-w-0">
            <div className="mb-6 max-w-3xl sm:mb-8">
              <p className="type-eyebrow text-brand">Talent pool</p>
              <h2 className="type-h2 mt-2 text-ink">CV submission</h2>
              <p className="type-body mt-2.5 max-w-2xl text-muted">
                Confirm the role basics, upload your CV, then review auto-filled
                details (edit if needed). For a listed job,{" "}
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
    </>
  );
}
