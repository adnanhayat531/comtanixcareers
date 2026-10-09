import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
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
import {
  CAPABILITIES,
  CAREER_POINTS,
  LIFE_PREVIEW,
  WHY_COMTANIX,
} from "@/lib/data/content";

const CAPABILITY_ICONS = [Sparkles, Code2, Cloud, ShieldCheck] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[var(--hero-min-h)] flex-col overflow-hidden bg-[#0b1520]">
        <HeroNetwork />
        <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-center px-0 pb-[clamp(2.5rem,6vh,4rem)] pt-[calc(var(--header-h)+clamp(1rem,3vh,1.75rem))]">
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
              Focused technology services across AI, software, cloud, and
              cybersecurity for growing and established businesses worldwide.
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
              <BrandAccentText>How we work with clients.</BrandAccentText>
            </h2>
            <p className="type-body mt-2.5 max-w-xl text-muted">
              A straightforward delivery model built around alignment,
              accountability, security, and consistent communication.
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

      {/* Careers */}
      <Section className="bg-tint">
        <Container className="grid min-w-0 grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0 max-w-xl text-left lg:max-w-none">
            <HeadingReveal className="max-w-xl">
              <p className="type-eyebrow mb-2 text-brand">Career</p>
              <h2 className="type-h2 mt-0 text-ink">
                <BrandAccentText>
                  Grow your career on work that’s real.
                </BrandAccentText>
              </h2>
              <p className="type-body mt-2.5 max-w-prose text-muted">
                Work on real-world technology projects, develop in-demand
                skills, and grow alongside people who know the work and are
                invested in your progress.
              </p>
            </HeadingReveal>

            <ul className="mt-5 space-y-0 border-t border-line">
              {CAREER_POINTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 border-b border-line py-2.5"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  <span className="type-meta min-w-0 leading-snug text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Button href="/careers" className="w-full justify-center sm:w-auto">
                View openings <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href="/submit-cv"
                variant="secondary"
                className="w-full justify-center sm:w-auto"
              >
                Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>

          <div className="w-full min-w-0">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-[var(--radius-xl)] bg-tint lg:mx-0 lg:max-w-none">
              <Image
                src="/careers-team.jpg"
                alt="Comtanix technology teams collaborating"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-[center_25%]"
                priority={false}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Life at Comtanix */}
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
            <HeadingReveal className="max-w-xl">
              <p className="type-eyebrow mb-2 text-brand">Life at Comtanix</p>
              <h2 className="type-h2 mt-0 text-ink">
                <BrandAccentText>
                  A Culture Built Around People and Growth
                </BrandAccentText>
              </h2>
              <p className="type-body mt-2.5 max-w-xl text-muted">
                The best work comes from people who have room to collaborate,
                learn, contribute, and grow. Life at Comtanix brings that
                balance into the everyday experience.
              </p>
            </HeadingReveal>
            <Button
              href="/life"
              variant="secondary"
              className="shrink-0 self-start md:self-auto"
            >
              Life at Comtanix <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {LIFE_PREVIEW.map((item) => (
              <li
                key={item.title}
                className="card-lift min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-canvas/60"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-tint">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="px-4 py-3.5">
                  <h3 className="type-h3 text-ink">
                    <BrandAccentText>{item.title}</BrandAccentText>
                  </h3>
                  <p className="type-meta mt-1.5 text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Opportunities"
        title="Grow your career on work that’s real."
        description="Review current openings, or submit your CV for future technology roles."
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
