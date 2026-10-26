import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { FacilitiesBenefits } from "@/components/careers/FacilitiesBenefits";
import { HowWeHire } from "@/components/careers/HowWeHire";
import { OpeningsList } from "@/components/careers/OpeningsList";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore roles across AI, software development, cybersecurity, and IT operations, with paid training, structured career growth, and the opportunity to work on projects for global enterprises.",
};

const WHY = [
  {
    title: "Structured Onboarding",
    body: "Gain role-specific training, practical guidance, and a clear understanding of expectations.",
  },
  {
    title: "Career Progression",
    body: "Strengthen your expertise, take on new responsibilities, and advance professionally.",
  },
  {
    title: "Meaningful Recognition",
    body: "Get recognized for your contributions, achievements, and commitment to quality.",
  },
  {
    title: "Supportive Workplace",
    body: "Thrive in a culture of collaboration, respect, and shared accountability.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Be Part of What's Next in Technology."
        description="Explore roles across AI, software development, cybersecurity, and IT operations, with paid training, structured career growth, and the opportunity to work on projects for global enterprises."
        image="/careers/hero-wide.jpg"
        imageAlt="Colleagues collaborating at a desk in the Comtanix office"
        imageFit="cover"
        objectPosition="center 55%"
        className="page-hero-banner careers-hero-faces w-full !aspect-[1440/369] !h-auto !min-h-0 !max-h-none max-sm:!min-h-[15rem] max-sm:!aspect-auto max-sm:!h-[min(34vh,15rem)]"
      />

      <Section
        id="openings"
        className="site-dark-section scroll-mt-24 md:scroll-mt-28"
      >
        <Container>
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <SectionHeading
                compact
                eyebrow="Join our team"
                title="Career Opportunities"
                className="mb-0"
              />
            </div>
            <Button
              href="/submit-cv"
              variant="secondary"
              className="shrink-0 self-start sm:self-auto"
            >
              Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <Suspense
            fallback={
              <div className="glass-card min-h-[28rem] animate-pulse rounded-[var(--radius-xl)]" />
            }
          >
            <OpeningsList />
          </Suspense>
        </Container>
      </Section>

      <Section className="theme-light site-light-section border-t border-line">
        <Container>
          <SectionHeading title="Why Build Your Career With Us" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {WHY.map((w) => (
              <div key={w.title}>
                <h3 className="type-h3 text-ink">
                  <BrandAccentText>{w.title}</BrandAccentText>
                </h3>
                <p className="type-meta mt-2 text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <HowWeHire />
      <FacilitiesBenefits />
    </>
  );
}
