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
              eyebrow="Company"
              title="About Comtanix"
              description="Pakistan delivery teams supporting US enterprise software and IT operations."
              className="mb-5"
            />
            <div className="space-y-3 text-[15px] leading-[1.55] text-muted md:text-base">
              <p>
                Comtanix builds IT and engineering capacity for US clients that need
                embedded teams — not transactional call-center volume. Delivery
                follows the client&apos;s tools, processes, and quality bar.
              </p>
              <p>
                Associates are trained to that standard before going live. Retention
                on both sides comes from fit, not slogans.
              </p>
            </div>
            <Button href="/apply" className="mt-5 w-full sm:mt-6 sm:w-auto">
              Apply
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
            eyebrow="Values"
            title="Operating principles"
            description="Standards we hold for hiring, training, and client delivery."
          />
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
            {VALUES.map((v, i) => (
              <li key={v.title} className="group">
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-md bg-tint">
                  <Image
                    src={v.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute bottom-2.5 left-2.5 z-10 font-display text-xs font-bold tracking-[0.1em] text-white uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold tracking-tight text-ink md:text-lg">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
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
            eyebrow="Training"
            title="Learning path"
            description="From paid induction through tooling and leadership tracks."
          />
          <div className="relative space-y-0 border-l border-brand/30 pl-5 md:pl-7">
            {LEARNING.map((l, i) => (
              <div key={l.title} className="relative pb-8 last:pb-0">
                <span
                  className="absolute top-1 -left-[1.65rem] grid h-5 w-5 place-items-center rounded-md bg-brand text-[10px] font-bold text-white md:-left-[1.9rem]"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-base font-semibold text-ink md:text-lg">
                  {l.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
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
