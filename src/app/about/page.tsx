import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { OfficeIllustration } from "@/components/ui/OfficeIllustration";
import { LEARNING, VALUES } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our story, core values, and learning pathways at Comtanix — building careers that serve global enterprises.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="About Comtanix"
        description="Pakistan delivery teams supporting global enterprise software and IT operations."
        image="/hero-comtanix.png"
        imageAlt="Comtanix office building at night"
      >
        <Button href="/careers#openings" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/contact" variant="outlineLight">
          Contact us <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section id="story" className="scroll-mt-24 bg-white md:scroll-mt-28">
        <Container className="grid min-w-0 items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="order-2 min-w-0 lg:order-1">
            <SectionHeading
              compact
              eyebrow="Our story"
              title="Embedded teams for global IT delivery"
              description="Pakistan delivery teams supporting global enterprise software and IT operations."
              className="mb-6"
            />
            <div className="type-body space-y-4 text-muted">
              <p>
                Comtanix builds IT and engineering capacity for clients worldwide that need
                embedded teams — not transactional call-center volume. Delivery
                follows the client&apos;s tools, processes, and quality bar.
              </p>
              <p>
                Associates are trained to that standard before going live. Retention
                on both sides comes from fit, not slogans.
              </p>
            </div>
            <Button href="/careers#openings" className="mt-7 w-full sm:w-auto">
              View openings <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <div className="order-1 min-w-0 w-full lg:order-2">
            <OfficeIllustration caption="Comtanix office — Bahria Town Phase 8" />
          </div>
        </Container>
      </Section>

      <Section id="values" className="scroll-mt-24 bg-tint md:scroll-mt-28">
        <Container>
          <SectionHeading
            eyebrow="Values"
            title="Operating principles"
            description="Standards we hold for hiring, training, and client delivery."
          />
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {VALUES.map((v, i) => (
              <li key={v.title} className="group">
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-white">
                  <Image
                    src={v.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="type-eyebrow absolute bottom-3 left-3 z-10 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="type-h3 text-ink">
                  <BrandAccentText>{v.title}</BrandAccentText>
                </h3>
                <p className="type-meta mt-2 text-muted">{v.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="learning" className="scroll-mt-24 bg-white md:scroll-mt-28">
        <Container>
          <SectionHeading
            eyebrow="Training"
            title="Learning path"
            description="From paid induction through tooling and leadership tracks."
          />
          <div className="relative space-y-0 border-l-2 border-brand/25 pl-5 md:pl-7">
            {LEARNING.map((l, i) => (
              <div key={l.title} className="relative pb-7 last:pb-0">
                <span
                  className="type-eyebrow absolute top-0 -left-[1.65rem] grid h-5 w-5 place-items-center rounded-[var(--radius-sm)] bg-brand !normal-case !tracking-normal text-white md:-left-[1.9rem]"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="type-h3 text-ink">
                  <BrandAccentText>{l.title}</BrandAccentText>
                </h3>
                <p className="type-meta mt-1.5 max-w-2xl text-muted">{l.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Careers"
        title="Ready to grow with Comtanix?"
        description="Explore open roles or submit your CV for future opportunities."
      >
        <Button href="/careers" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/submit-cv" variant="outlineLight">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </CtaBanner>
    </>
  );
}
