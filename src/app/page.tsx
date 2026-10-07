import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Headphones,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { HeroNetwork } from "@/components/home/HeroNetwork";
import { HeroCopy } from "@/components/home/HeroCopy";
import { StatsBar } from "@/components/home/StatsBar";
import { HeadingReveal } from "@/components/motion/Reveal";
import { OfficeIllustration } from "@/components/ui/OfficeIllustration";
import {
  CAPABILITIES,
  LIFE_PREVIEW,
  WHY_COMTANIX,
} from "@/lib/data/content";

const CAPABILITY_ICONS = [Code2, Headphones, Globe2, ShieldCheck] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-deep">
        <HeroNetwork />
        <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center pt-14 sm:pt-16 md:pt-[4.25rem] lg:pt-[4.5rem]">
          <HeroCopy />
        </div>
        {/* Spacer so overlapping stats sit partly on the hero */}
        <div className="relative z-10 h-12 shrink-0 sm:h-16 md:h-20 lg:h-24" aria-hidden />
      </section>

      <StatsBar />

      {/* Who We Are */}
      <Section className="bg-canvas pt-10 md:pt-14">
        <Container className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="order-2 min-w-0 text-left lg:order-1">
            <HeadingReveal className="mb-5 max-w-xl">
              <p className="type-eyebrow mb-2 text-brand">Who we are</p>
              <h2 className="type-h2 mt-0 text-ink">
                A professional IT company serving businesses worldwide.
              </h2>
              <p className="type-body mt-3 max-w-prose text-muted">
                Comtanix delivers software engineering and IT operations from
                Pakistan, aligned to client tools, hours, and quality standards
                across markets. We build capable teams that work as an extension
                of the businesses we support.
              </p>
            </HeadingReveal>

            <ul className="mb-7 max-w-xl space-y-3">
              {[
                "IT delivery for global enterprise accounts",
                "Shared tools, processes, and accountability",
                "People developed for long-term technical roles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  <span className="type-meta leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/about#story" variant="secondary">
              Explore Comtanix <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <div className="order-1 w-full min-w-0 lg:order-2">
            <OfficeIllustration caption="Comtanix office" />
          </div>
        </Container>
      </Section>

      {/* IT Capabilities */}
      <Section className="bg-white">
        <Container>
          <HeadingReveal className="mb-8 max-w-xl md:mb-10">
            <p className="type-eyebrow mb-2 text-brand">What we do</p>
            <h2 className="type-h2 mt-0 text-ink">
              IT capabilities for global delivery.
            </h2>
            <p className="type-body mt-3 max-w-xl text-muted">
              Focused workstreams that keep businesses worldwide moving — with
              the people and discipline to match.
            </p>
          </HeadingReveal>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {CAPABILITIES.map((c, i) => {
              const Icon = CAPABILITY_ICONS[i] ?? Code2;
              return (
                <li
                  key={c.title}
                  className="card-lift group min-w-0 overflow-hidden rounded-xl border border-line bg-canvas/60"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-5 py-5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="type-h3 mt-4 text-ink">{c.title}</h3>
                    <p className="type-meta mt-2 text-muted">{c.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Why Comtanix */}
      <Section className="bg-tint">
        <Container>
          <HeadingReveal className="mb-8 max-w-xl md:mb-10">
            <p className="type-eyebrow mb-2 text-brand">Why Comtanix</p>
            <h2 className="type-h2 mt-0 text-ink">
              How we work with global clients.
            </h2>
            <p className="type-body mt-3 max-w-xl text-muted">
              Clear standards for quality, security, and partnership — without
              the noise.
            </p>
          </HeadingReveal>

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {WHY_COMTANIX.map((w, i) => (
              <li
                key={w.title}
                className="card-lift min-w-0 overflow-hidden rounded-xl border border-line bg-white"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint">
                  <Image
                    src={w.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="px-5 py-5 md:px-6 md:py-6">
                  <p className="type-eyebrow text-brand">0{i + 1}</p>
                  <h3 className="type-h3 mt-2 text-ink">{w.title}</h3>
                  <p className="type-meta mt-2 text-muted">{w.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Careers */}
      <Section className="bg-white">
        <Container className="grid min-w-0 grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 lg:gap-14">
          <div className="min-w-0 max-w-xl text-left md:max-w-none">
            <HeadingReveal className="max-w-xl">
              <p className="type-eyebrow mb-2 text-brand">Careers</p>
              <h2 className="type-h2 mt-0 text-ink">
                Build your career on real global IT work.
              </h2>
              <p className="type-body mt-3 max-w-prose text-muted">
                Structured training, clear progression, and roles that connect you
                to live international delivery — not short-term volume work.
              </p>
            </HeadingReveal>

            <ul className="mt-6 space-y-0 border-t border-line">
              {[
                "Paid induction and role-specific onboarding",
                "Mentorship with client account leads",
                "Defined paths from associate to leadership",
                "Fixed shift patterns with night-shift allowance",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 border-b border-line py-3.5"
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
            <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl bg-tint md:mx-0 md:max-w-none md:aspect-[5/4] lg:aspect-[4/3]">
              <Image
                src="/careers-team.jpg"
                alt="Comtanix engineers collaborating in the office"
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover object-[center_25%]"
                priority={false}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Life at Comtanix */}
      <Section className="bg-tint">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <HeadingReveal className="max-w-xl">
              <p className="type-eyebrow mb-2 text-brand">Life at Comtanix</p>
              <h2 className="type-h2 mt-0 text-ink">
                People, culture, and growth around the work.
              </h2>
              <p className="type-body mt-3 max-w-xl text-muted">
                Teams that deliver across time zones also need balance,
                recognition, and room to learn.
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

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {LIFE_PREVIEW.map((item) => (
              <li
                key={item.title}
                className="card-lift min-w-0 overflow-hidden rounded-xl border border-line bg-white"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-tint">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="px-5 py-5">
                  <h3 className="type-h3 text-ink">{item.title}</h3>
                  <p className="type-meta mt-2 text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Opportunities"
        title="Open roles across engineering and IT support."
        description="Review current openings, or explore how we train and grow people inside live client accounts."
      >
        <Button href="/careers" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/about#learning" variant="outlineLight">
          Learning path <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </CtaBanner>
    </>
  );
}
