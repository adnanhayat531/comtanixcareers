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
      <Section id="story" className="scroll-mt-20 border-b border-line bg-surface pt-8 md:scroll-mt-28 md:pt-12 lg:pt-16">
        <Container className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 min-w-0 lg:order-1">
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
            <Button href="/apply" className="mt-6 w-full sm:mt-8 sm:w-auto">
              Apply Now
            </Button>
          </div>
          <div className="order-1 min-w-0 w-full lg:order-2">
            <OfficeIllustration />
          </div>
        </Container>
      </Section>

      <Section id="values" className="scroll-mt-20 bg-tint md:scroll-mt-28">
        <Container>
          <SectionHeading
            eyebrow="The 4 Core Values"
            title="Core Values"
            description="Four promises we keep to our people and our clients."
          />
          <ol className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8">
            {VALUES.map((v, i) => (
              <li key={v.title} className="group">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-tint">
                  <Image
                    src={v.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 left-3 z-10 font-display text-xs font-bold tracking-[0.14em] text-white uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
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

      <Section id="learning" className="scroll-mt-20 md:scroll-mt-28">
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
                  className="absolute top-1.5 -left-[1.9rem] grid h-6 w-6 place-items-center rounded-full bg-brand text-[11px] font-bold text-white md:-left-[2.15rem]"
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
