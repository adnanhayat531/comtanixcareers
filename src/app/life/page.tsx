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
        eyebrow="Work Hard, Celebrate Together"
        title="Life at Comtanix"
        description="We work demanding US hours, so we take workplace comfort, team bonding, and celebration culture very seriously."
      />

      <Section className="bg-[#f7fafA]">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {LIFE_ACTIVITIES.map((a) => (
              <article key={a.title} className="group flex flex-col">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-[#dce8e8]">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0a2222]/50 via-transparent to-transparent"
                    aria-hidden
                  />
                  <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-sea shadow-soft backdrop-blur-sm">
                    <LifeIcon name={a.icon} className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="font-display text-lg font-extrabold tracking-tight text-ink md:text-xl">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
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
            title="What Our Team Says"
            description="Real stories from people building their careers here."
          />
          <TestimonialsGrid />
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-[#0a2222]">
        <div
          className="absolute inset-0 bg-gradient-to-br from-sea/40 via-transparent to-brand/30"
          aria-hidden
        />
        <Container className="relative z-10 max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance text-white md:text-4xl">
            Join the team
          </h2>
          <p className="mt-3 text-base text-white/75 md:text-lg">
            Your next role is one message away.
          </p>
          <Button href="/apply" variant="white" className="mt-7">
            Apply Now
          </Button>
        </Container>
      </Section>

      <GetInTouch />
    </>
  );
}
