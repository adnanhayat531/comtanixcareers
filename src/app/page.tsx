import Image from "next/image";
import {
  ArrowRight,
  Cloud,
  Code2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { HeroNetwork } from "@/components/home/HeroNetwork";
import { HeroCopy } from "@/components/home/HeroCopy";
import { StatsBar } from "@/components/home/StatsBar";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { HeadingReveal } from "@/components/motion/Reveal";
import { CAPABILITIES, WHY_COMTANIX } from "@/lib/data/content";

const CAPABILITY_ICONS = [Sparkles, Code2, Cloud, ShieldCheck] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative flex h-[90svh] min-h-[90svh] flex-col overflow-hidden">
        <HeroNetwork />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center px-[var(--container-pad-x)] pb-[clamp(2.5rem,6vh,4rem)] pt-[calc(var(--header-h)+clamp(1rem,3vh,1.75rem))] text-center">
          <HeroCopy />
        </div>
      </section>

      <StatsBar />

      <WhoWeAre />

      {/* What We Do */}
      <Section id="services" className="scroll-mt-24 bg-canvas md:scroll-mt-28">
        <Container>
          <HeadingReveal className="mb-5 max-w-xl md:mb-6">
            <p className="type-eyebrow mb-2 text-brand">What We Do</p>
            <h2 className="type-h2 mt-0 text-ink">
              <BrandAccentText>
                From emerging technology to everyday IT.
              </BrandAccentText>
            </h2>
            <p className="type-body mt-2.5 max-w-xl text-muted">
              Whether you need to automate work, build software, strengthen
              infrastructure, or protect your data, we work with you to get it
              done.
            </p>
          </HeadingReveal>

          <ul className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
            {CAPABILITIES.map((c, i) => {
              const Icon = CAPABILITY_ICONS[i] ?? Code2;
              return (
                <li
                  key={c.title}
                  className="card-lift group min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-4 py-3.5 sm:px-4 sm:py-4">
                    <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-md)] bg-brand text-white">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <h3 className="type-h3 mt-2.5 text-ink">
                      <BrandAccentText>{c.title}</BrandAccentText>
                    </h3>
                    <p className="type-meta mt-1.5 text-muted">{c.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Why Comtanix */}
      <Section className="bg-white">
        <Container>
          <HeadingReveal className="mb-5 max-w-xl md:mb-6">
            <p className="type-eyebrow mb-2 text-brand">Why Comtanix</p>
            <h2 className="type-h2 mt-0 text-ink">
              <BrandAccentText>
                Clear communication. Shared responsibility.
              </BrandAccentText>
            </h2>
            <p className="type-body mt-2.5 max-w-xl text-muted">
              We work closely with you, take ownership of our work, and keep you
              informed at every stage.
            </p>
          </HeadingReveal>

          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {WHY_COMTANIX.map((w, i) => (
              <li
                key={w.title}
                className="card-lift min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-canvas/60"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint">
                  <Image
                    src={w.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="px-4 py-3.5 sm:px-4 sm:py-4">
                  <p className="type-eyebrow text-brand">0{i + 1}</p>
                  <h3 className="type-h3 mt-1.5 text-ink">
                    <BrandAccentText>{w.title}</BrandAccentText>
                  </h3>
                  <p className="type-meta mt-1.5 text-muted">{w.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Opportunities"
        title="Build your future with Comtanix."
        description="Explore current openings or submit your CV for consideration for future opportunities."
      >
        <Button href="/careers" variant="white">
          View Openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/submit-cv" variant="outlineLight">
          Submit Your CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </CtaBanner>
    </>
  );
}
