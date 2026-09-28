import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading, PageIntro } from "@/components/ui/Section";
import { LifeIcon } from "@/components/ui/Icons";
import { TestimonialsGrid } from "@/components/home/Testimonials";
import { GetInTouch } from "@/components/layout/GetInTouch";
import { LIFE_ACTIVITIES } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Life at Comtanix",
  description:
    "Team lunches, sports days, awards, skill sessions and celebrations — how we work and grow together.",
};

export default function LifePage() {
  return (
    <>
      <PageIntro
        eyebrow="Work Hard, Celebrate Together"
        title="Life at Comtanix"
        description="We work demanding US hours, so we take workplace comfort, team bonding, and celebration culture very seriously."
      />

      <Section>
        <Container>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {LIFE_ACTIVITIES.map((a) => (
              <div key={a.title} className="border-t border-line pt-6">
                <span className="inline-flex text-sea">
                  <LifeIcon name={a.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-tint">
        <Container>
          <SectionHeading
            title="What Our Team Says"
            description="Real stories from people building their careers here."
          />
          <TestimonialsGrid />
        </Container>
      </Section>

      <Section>
        <Container className="max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Join the team
          </h2>
          <p className="mt-3 text-base text-muted md:text-lg">
            Your next role is one message away.
          </p>
          <Button href="/apply" className="mt-7">
            Apply Now
          </Button>
        </Container>
      </Section>

      <GetInTouch />
    </>
  );
}
