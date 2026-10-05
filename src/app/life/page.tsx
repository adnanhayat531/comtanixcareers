import type { Metadata } from "next";
import Image from "next/image";
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
        eyebrow="Workplace"
        title="Life at Comtanix"
        description="Facilities, recognition, and team activities designed around US shift patterns."
      />

      <Section className="bg-tint">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
            {LIFE_ACTIVITIES.map((a) => (
              <article key={a.title} className="group flex flex-col">
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-md bg-tint">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2.5 left-2.5 z-10 grid h-8 w-8 place-items-center rounded-md bg-white text-brand">
                    <LifeIcon name={a.icon} className="h-3.5 w-3.5" />
                  </span>
                </div>
                <h3 className="font-display text-base font-bold tracking-tight text-ink md:text-lg">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {a.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-tint">
        <Container>
          <SectionHeading
            title="Team feedback"
            description="Comments from associates on delivery floors and support desks."
          />
          <TestimonialsGrid />
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-brand">
        <Container className="relative z-10 max-w-lg">
          <h2 className="font-display text-[clamp(1.35rem,3vw,1.85rem)] font-bold tracking-tight text-white leading-[1.25]">
            Apply for open roles
          </h2>
          <p className="mt-2 text-[15px] text-white/75 md:text-base">
            Submit an application for current openings.
          </p>
          <Button href="/apply" variant="white" className="mt-5 w-full sm:w-auto">
            Apply
          </Button>
        </Container>
      </Section>

      <GetInTouch />
    </>
  );
}
