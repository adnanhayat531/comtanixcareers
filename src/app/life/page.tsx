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
    "Team trips, sports, awards, and everyday culture — how Comtanix people work and grow together beyond the desk.",
};

export default function LifePage() {
  return (
    <>
      <PageHero
        eyebrow="Life at Comtanix"
        title="Work hard. Climb higher. Stay together."
        description="Our teams share the grind, the wins, and the moments that make Comtanix feel like more than a workplace."
        image="/life/hero-team.jpg"
        imageAlt="Comtanix team together outdoors"
      >
        <Button href="/careers" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/submit-cv" variant="outlineLight">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section className="bg-tint">
        <Container>
          <SectionHeading
            eyebrow="Everyday culture"
            title="How we live the work week"
            description="Facilities, recognition, and team activities designed around real shift patterns."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {LIFE_ACTIVITIES.map((a) => (
              <article key={a.title} className="group flex flex-col">
                <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] bg-white">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-2.5 left-2.5 z-10 grid h-8 w-8 place-items-center rounded-[var(--radius-md)] bg-white text-brand shadow-soft">
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

      <Section className="border-t border-line bg-white">
        <Container>
          <SectionHeading
            title="Google reviews"
            description="Live Google reviews for Comtanix — tap a card to open the reviewer on Google Maps."
          />
          <TestimonialsGrid />
        </Container>
      </Section>

      <CtaBanner
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
