import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { LifeIcon } from "@/components/ui/Icons";
import { TestimonialsGrid } from "@/components/home/Testimonials";
import { LIFE_ACTIVITIES } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Life at Comtanix",
  description:
    "Our teams share the experiences, the achievements, and the culture that make Comtanix more than a place to work.",
};

export default function LifePage() {
  return (
    <>
      <PageHero
        eyebrow="Life at Comtanix"
        title="Together in Every Milestone."
        description="Our teams share the experiences, the achievements, and the culture that make Comtanix more than a place to work."
        image="/life/hero-v3.jpg"
        imageAlt="Colleagues collaborating at a conference table in the Comtanix office"
        imageFit="cover"
        objectPosition="55% 42%"
        className="page-hero-banner w-full !aspect-[1440/369] !h-auto !min-h-0 !max-h-none max-sm:!min-h-[15rem] max-sm:!aspect-auto max-sm:!h-[min(34vh,15rem)] [&_h1]:max-w-[16ch] sm:[&_h1]:max-w-[18ch]"
      >
        <Button href="/careers" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/submit-cv" variant="outlineLight">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section className="site-dark-section">
        <Container>
          <SectionHeading
            eyebrow="Culture"
            title="A Workplace That Invests in You"
            description="Wellness, recognition, and team experiences designed around how our people work."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {LIFE_ACTIVITIES.map((a) => (
              <article key={a.title} className="group flex flex-col">
                <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface shadow-[0_0_28px_-16px_rgba(45,212,224,0.4)]">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-2.5 left-2.5 z-10 grid h-8 w-8 place-items-center rounded-[var(--radius-md)] border border-brand/30 bg-surface text-brand shadow-[0_0_16px_-4px_rgba(45,212,224,0.65)]">
                    <LifeIcon name={a.icon} className="h-3.5 w-3.5" />
                  </span>
                </div>
                <h3 className="type-h3 text-ink">
                  <BrandAccentText>{a.title}</BrandAccentText>
                </h3>
                <p className="type-meta mt-1.5 text-muted">{a.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="theme-light site-light-section border-t border-line">
        <Container>
          <SectionHeading title="Google reviews" />
          <TestimonialsGrid />
        </Container>
      </Section>

      <CtaBanner
        tone="dark"
        eyebrow="Join the team"
        title="See open roles and apply today."
        description="Night-shift, onsite careers with paid training and clear progression."
      >
        <Button href="/careers" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/apply" variant="outlineLight">
          Apply now <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </CtaBanner>
    </>
  );
}
