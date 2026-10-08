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

      <Section id="openings" className="scroll-mt-24 bg-white md:scroll-mt-28">
        <Container>
          <div className="mb-8 rounded-xl border border-brand/25 bg-tint px-5 py-5 sm:px-6">
            <p className="type-eyebrow text-brand">Before you apply</p>
            <p className="type-body mt-2 text-muted">
              All listed roles are <span className="font-semibold text-ink">night shift</span>,{" "}
              <span className="font-semibold text-ink">onsite</span>, and based at{" "}
              <span className="font-semibold text-ink">
                Bahria Town Phase 8, Rawalpindi
              </span>
              . Please confirm these fit you before submitting an application.
            </p>
          </div>

          <OpeningsList />
        </Container>
      </Section>

      <Section className="border-t border-line bg-tint">
        <Container>
          <SectionHeading title="Why grow your career with us" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {WHY.map((w, i) => (
              <div key={w.title}>
                <p className="type-eyebrow text-brand">0{i + 1}</p>
                <h3 className="type-h3 mt-2 text-ink">
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
