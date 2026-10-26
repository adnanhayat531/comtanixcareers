import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { FacilitiesBenefits } from "@/components/careers/FacilitiesBenefits";
import { HowWeHire } from "@/components/careers/HowWeHire";
import { OpeningsList } from "@/components/careers/OpeningsList";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
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
          <SectionHeading
            compact
            eyebrow="Join our team"
            title="Career Opportunities"
            className="mb-6 sm:mb-8"
          />

          <Suspense
            fallback={
              <div className="glass-card min-h-[28rem] animate-pulse rounded-[var(--radius-xl)]" />
            }
          >
            <OpeningsList />
          </Suspense>

          <a
            href="/submit-cv"
            className="mt-6 flex flex-col gap-4 rounded-[var(--radius-xl)] px-5 py-5 shadow-[0_12px_32px_-18px_rgba(0,40,44,0.55)] transition hover:brightness-105 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-7 sm:py-6"
            style={{
              background:
                "linear-gradient(135deg, #004848 0%, #003B3B 55%, #002E2E 100%)",
            }}
          >
            <div className="min-w-0 text-left">
              <p className="text-[1.05rem] font-bold leading-snug text-white sm:text-lg">
                Don&apos;t see your specific role?
              </p>
              <p className="mt-1.5 max-w-2xl text-[0.8125rem] leading-relaxed text-white/80 sm:text-sm">
                We are constantly expanding our team. Send us your resume
                through an open application and we&apos;ll reach out when a
                suitable position matches your profile.
              </p>
            </div>
            <span className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-[var(--radius-md)] bg-white px-5 text-sm font-semibold text-[#003B3B] shadow-sm transition hover:bg-white/95 sm:self-auto">
              Send Open Application
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </a>
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
