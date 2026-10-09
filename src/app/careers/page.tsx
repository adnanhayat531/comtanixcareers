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
    "Open roles at Comtanix for freshers and experienced professionals across global IT teams.",
};

const WHY = [
  {
    title: "Paid training",
    body: "Induction covers process, tools, and professional communication before live queues.",
  },
  {
    title: "Defined progression",
    body: "Agent → senior → team lead → manager, with scheduled reviews.",
  },
  {
    title: "Performance pay",
    body: "Monthly incentives tied to published SLA and quality metrics.",
  },
  {
    title: "Office standards",
    body: "Workstations, network stability, access control, and on-floor support.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career on real global IT work."
        description="Open roles across engineering and IT support — with paid training, clear progression, and teams that deliver for businesses worldwide."
        image="/careers/hero-desk.jpg"
        imageAlt="Comtanix careers — innovation, teamwork, and growth"
      >
        <Button href="#openings" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/submit-cv" variant="outlineLight">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section id="openings" className="scroll-mt-24 bg-canvas md:scroll-mt-28">
        <Container>
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              compact
              eyebrow="Open roles"
              title="Current openings"
              description="Night shift · Onsite · Bahria Town Phase 8, Rawalpindi"
              className="mb-0"
            />
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

      <Section className="border-t border-line bg-tint">
        <Container>
          <SectionHeading title="Why grow your career with us" />
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
