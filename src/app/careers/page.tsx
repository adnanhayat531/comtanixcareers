import type { Metadata } from "next";
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

/** Openings come from the live jobs API — never serve a stale static snapshot. */
export const dynamic = "force-dynamic";

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
        image="/careers/hero-v3.jpg"
        imageAlt="Developer focused on dual monitors in the Comtanix office"
        imageFit="cover"
        objectPosition="75% 50%"
        className="!h-[min(34svh,18rem)] !min-h-[12rem] !max-h-[20rem]"
      >
        <Button href="#openings" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/submit-cv" variant="outlineLight">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section id="openings" className="site-dark-section scroll-mt-24 md:scroll-mt-28">
        <Container>
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <SectionHeading
                compact
                eyebrow="Open roles"
                title="Current openings"
                className="mb-0"
              />
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Role highlights">
                {["Night shift", "Onsite", "Bahria Town Phase 8, Rawalpindi"].map(
                  (tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center rounded-[var(--radius-md)] border border-brand/40 bg-tint px-2.5 py-1 type-meta text-brand"
                    >
                      {tag}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <Button
              href="/submit-cv"
              variant="secondary"
              className="shrink-0 self-start sm:self-auto"
            >
              Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <OpeningsList />
        </Container>
      </Section>

      <Section className="theme-light site-light-section border-t border-line">
        <Container>
          <SectionHeading title="Why Build Your Career With Us" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {WHY.map((w, i) => (
              <div key={w.title}>
                <p className="type-eyebrow text-brand">0{i + 1}</p>
                <h3 className="type-h3 mt-1.5 text-ink">
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
