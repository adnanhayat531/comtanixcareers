import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { OfficeIllustration } from "@/components/ui/OfficeIllustration";
import { GetInTouch } from "@/components/layout/GetInTouch";
import { LEARNING, VALUES } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our story, core values, and learning pathways at Comtanix — building careers that serve US enterprises.",
};

export default function AboutPage() {
  return (
    <>
      <Section id="story" className="scroll-mt-28 border-b border-line bg-surface pt-12 md:pt-16">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              compact
              eyebrow="Institutional Clarity & Trust"
              title="About Comtanix"
              description="Connecting ambitious professionals with premier US businesses through architectural discipline and high ethical standards."
              className="mb-6"
            />
            <div className="space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
              <p>
                Comtanix was founded on a simple yet unyielding realization: top-tier
                American businesses don&apos;t need transactional call centers; they
                need integrated, strategic talent pods that think in sync with their
                core values and product deadlines.
              </p>
              <p>
                We adjust to each client&apos;s work processes, tools and quality
                standards, and we train our people to match. That is why teams stay
                with us and clients stay with us.
              </p>
            </div>
            <Button href="/apply" className="mt-8">
              Apply Now
            </Button>
          </div>
          <OfficeIllustration />
        </Container>
      </Section>

      <Section id="values" className="scroll-mt-28 bg-tint">
        <Container>
          <SectionHeading
            eyebrow="The 4 Core Values"
            title="Core Values"
            description="Four promises we keep to our people and our clients."
          />
          <ol className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <li key={v.title} className="group">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-on-sea">
                  <Image
                    src={v.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-deep/45 via-transparent to-transparent"
                    aria-hidden
                  />
                  <span className="absolute bottom-3 left-3 font-display text-xs font-bold tracking-[0.14em] text-white uppercase drop-shadow-sm">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted md:text-[15px]">
                  {v.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="learning" className="scroll-mt-28">
        <Container>
          <SectionHeading
            eyebrow="Growth Architecture"
            title="Learning & Development Roadmap"
            description="Every team member follows a structured pathway from onboarding to executive leadership."
          />
          <div className="relative space-y-0 border-l-2 border-brand/30 pl-6 md:pl-8">
            {LEARNING.map((l, i) => (
              <div key={l.title} className="relative pb-10 last:pb-0">
                <span
                  className="absolute top-1.5 -left-[1.9rem] grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-sea to-brand text-[11px] font-bold text-white md:-left-[2.15rem]"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink md:text-xl">
                  {l.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
                  {l.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <GetInTouch />
    </>
  );
}
