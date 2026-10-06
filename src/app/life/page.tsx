import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { LifeIcon } from "@/components/ui/Icons";
import { TestimonialsGrid } from "@/components/home/Testimonials";
import { GetInTouch } from "@/components/layout/GetInTouch";
import { LIFE_ACTIVITIES } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Life at Comtanix",
  description:
    "Team trips, sports, awards, and everyday culture — how Comtanix people work and grow together beyond the desk.",
};

export default function LifePage() {
  return (
    <>
      {/* Hero — team trip (half-height) */}
      <section className="relative flex min-h-[42vh] flex-col justify-center overflow-hidden sm:min-h-[46vh] md:min-h-[50vh] lg:min-h-[52vh]">
        <Image
          src="/life/hero-team.jpg"
          alt="Comtanix team together outdoors"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        {/* Teal wash only behind text — right side stays clear */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(96%,34rem)] bg-gradient-to-r from-[#0d3a40]/80 via-[#2F7A84]/50 to-transparent sm:w-[min(78%,40rem)] md:w-[min(68%,46rem)]"
          aria-hidden
        />

        <Container className="relative z-10 py-8 sm:py-10 md:py-12">
          <div className="max-w-xl">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.1em] text-white/90 uppercase">
              Life at Comtanix
            </p>
            <h1 className="font-display text-[clamp(1.5rem,4.5vw,2.5rem)] font-bold tracking-tight text-white leading-[1.15]">
              Work hard. Climb higher. Stay together.
            </h1>
            <p className="mt-2.5 max-w-md text-[14px] font-medium leading-[1.55] text-white/95 sm:mt-3 sm:text-[15px] md:text-base">
              Our teams share the grind, the wins, and the moments that make
              Comtanix feel like more than a workplace.
            </p>
            <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-3">
              <Button href="/careers" variant="white">
                View openings <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/apply" variant="outlineLight">
                Join the team <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-tint">
        <Container>
          <SectionHeading
            eyebrow="Everyday culture"
            title="How we live the work week"
            description="Facilities, recognition, and team activities designed around US shift patterns."
            className="mb-6 md:mb-8"
          />
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

      <Section className="border-t border-line bg-white">
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
