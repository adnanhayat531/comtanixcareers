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
import { HeroNetwork } from "@/components/home/HeroNetwork";
import { HeroCopy } from "@/components/home/HeroCopy";
import { StatsBar } from "@/components/home/StatsBar";
import { GetInTouch } from "@/components/layout/GetInTouch";
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
      <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden bg-brand md:min-h-[calc(100svh-4rem)]">
        <HeroNetwork />
        <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center">
          <HeroCopy />
        </div>
        <StatsBar />
      </section>

      {/* Who We Are — real office */}
      <Section className="bg-tint">
        <Container className="grid min-w-0 items-center gap-7 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="order-2 min-w-0 text-left lg:order-1">
            <HeadingReveal className="mb-4 max-w-xl">
              <p className="mb-1.5 text-[11px] font-semibold tracking-[0.08em] text-brand uppercase">
                Who we are
              </p>
              <h2 className="mt-0 font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold tracking-tight text-ink leading-[1.25]">
                A professional IT company serving American businesses.
              </h2>
              <p className="mt-2 max-w-prose text-[15px] leading-[1.55] text-muted md:text-base">
                Comtanix delivers software engineering and IT operations from
                Pakistan, aligned to US client tools, hours, and quality
                standards. We build capable teams that work as an extension of
                the businesses we support.
              </p>
            </HeadingReveal>

            <ul className="mb-5 max-w-xl space-y-2">
              {[
                "IT delivery for US enterprise accounts",
                "Shared tools, processes, and accountability",
                "People developed for long-term technical roles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  <span className="text-sm leading-snug text-ink md:text-[15px]">
                    {item}
                  </span>
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
          <HeadingReveal className="mb-6 max-w-xl md:mb-8">
            <p className="mb-1.5 text-[11px] font-semibold tracking-[0.08em] text-brand uppercase">
              What we do
            </p>
            <h2 className="mt-0 font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold tracking-tight text-ink leading-[1.25]">
              IT capabilities for US-facing delivery.
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-[1.55] text-muted md:text-base">
              Focused workstreams that keep American businesses moving — with
              the people and discipline to match.
            </p>
          </HeadingReveal>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {CAPABILITIES.map((c, i) => {
              const Icon = CAPABILITY_ICONS[i] ?? Code2;
              return (
                <li
                  key={c.title}
                  className="min-w-0 overflow-hidden rounded-md border border-line bg-tint/40"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <h3 className="mt-3 font-display text-[15px] font-bold tracking-tight text-ink md:text-base">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.55] text-muted">
                      {c.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Why Comtanix */}
      <Section className="bg-on-sea">
        <Container>
          <HeadingReveal className="mb-6 max-w-xl md:mb-8">
            <p className="mb-1.5 text-[11px] font-semibold tracking-[0.08em] text-brand uppercase">
              Why Comtanix
            </p>
            <h2 className="mt-0 font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold tracking-tight text-ink leading-[1.25]">
              How we work with US accounts.
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-[1.55] text-muted md:text-base">
              Clear standards for quality, security, and partnership — without
              the noise.
            </p>
          </HeadingReveal>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {WHY_COMTANIX.map((w, i) => (
              <li
                key={w.title}
                className="min-w-0 overflow-hidden rounded-md border border-line bg-white"
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
                <div className="px-4 py-4 md:px-5 md:py-5">
                  <p className="font-display text-xs font-bold tracking-[0.08em] text-brand uppercase">
                    0{i + 1}
                  </p>
                  <h3 className="mt-1.5 font-display text-base font-bold tracking-tight text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.55] text-muted">
                    {w.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Careers — text left, image right on all breakpoints that fit */}
      <Section className="bg-tint">
        <Container className="grid min-w-0 grid-cols-1 items-center gap-6 sm:gap-7 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="min-w-0 max-w-xl text-left md:max-w-none">
            <HeadingReveal className="max-w-xl">
              <p className="mb-1.5 text-[11px] font-semibold tracking-[0.08em] text-brand uppercase">
                Careers
              </p>
              <h2 className="mt-0 font-display text-[clamp(1.35rem,3.2vw,2.15rem)] font-bold tracking-tight text-ink leading-[1.25]">
                Build your career on US-facing IT work.
              </h2>
              <p className="mt-2 max-w-prose text-[15px] leading-[1.55] text-muted md:text-base">
                Structured training, clear progression, and roles that connect you
                to real American business delivery — not short-term volume work.
              </p>
            </HeadingReveal>

            <ul className="mt-4 space-y-0 border-t border-line sm:mt-5">
              {[
                "Paid induction and role-specific onboarding",
                "Mentorship with US account leads",
                "Defined paths from associate to leadership",
                "Fixed shift patterns with night-shift allowance",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 border-b border-line py-2.5 sm:py-3"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  <span className="min-w-0 text-sm leading-snug text-ink md:text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button href="/careers" className="w-full justify-center sm:w-auto">
                View openings <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href="/apply"
                variant="secondary"
                className="w-full justify-center sm:w-auto"
              >
                Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>

          <div className="w-full min-w-0">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-md border border-line bg-white md:mx-0 md:max-w-none md:aspect-[5/4] lg:aspect-[4/3]">
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
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
            <HeadingReveal className="max-w-xl">
              <p className="mb-1.5 text-[11px] font-semibold tracking-[0.08em] text-brand uppercase">
                Life at Comtanix
              </p>
              <h2 className="mt-0 font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold tracking-tight text-ink leading-[1.25]">
                People, culture, and growth around the work.
              </h2>
              <p className="mt-2 max-w-xl text-[15px] leading-[1.55] text-muted md:text-base">
                Teams that deliver for US hours also need balance, recognition,
                and room to learn.
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

          <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {LIFE_PREVIEW.map((item) => (
              <li
                key={item.title}
                className="min-w-0 overflow-hidden rounded-md border border-line bg-tint/30"
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
                <div className="px-4 py-4">
                  <h3 className="font-display text-[15px] font-bold tracking-tight text-ink md:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.55] text-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Opportunities */}
      <Section className="bg-tint">
        <Container>
          <div className="grid min-w-0 items-center gap-6 rounded-md border border-line bg-white px-5 py-7 sm:px-7 sm:py-8 md:grid-cols-[1.2fr_auto] md:gap-10 md:px-10 md:py-9">
            <div className="min-w-0 max-w-xl">
              <p className="mb-1.5 text-[11px] font-semibold tracking-[0.08em] text-brand uppercase">
                Opportunities
              </p>
              <h2 className="font-display text-[clamp(1.35rem,2.5vw,1.85rem)] font-bold tracking-tight text-ink leading-[1.25]">
                Open roles across engineering and IT support.
              </h2>
              <p className="mt-2 text-[15px] leading-[1.55] text-muted md:text-base">
                Review current openings, or explore how we train and grow people
                inside live US accounts.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button href="/careers">
                View openings <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/about#learning" variant="secondary">
                Learning path <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="relative overflow-hidden bg-brand">
        <Image
          src="/cta-opportunity.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-brand/90" aria-hidden />
        <Container className="relative z-10">
          <HeadingReveal className="max-w-xl">
            <h2 className="font-display text-[clamp(1.4rem,3.5vw,2rem)] font-bold tracking-tight text-white leading-[1.25]">
              Technology for American businesses. Careers that grow with it.
            </h2>
            <p className="mt-2.5 max-w-lg text-[15px] leading-[1.55] text-white/80 md:text-base">
              Learn how Comtanix works — or take the next step in your career
              with us.
            </p>
            <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Button href="/about#story" variant="white">
                Explore Comtanix <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/careers" variant="outlineLight">
                Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </HeadingReveal>
        </Container>
      </Section>

      <GetInTouch />
    </>
  );
}
