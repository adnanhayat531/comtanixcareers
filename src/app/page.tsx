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
              <p className="type-eyebrow mb-1.5 text-brand">Who we are</p>
              <h2 className="type-h2 mt-0 text-ink">
                A professional IT company serving businesses worldwide.
              </h2>
              <p className="type-body mt-2 max-w-prose text-muted">
                Comtanix delivers software engineering and IT operations from
                Pakistan, aligned to client tools, hours, and quality standards
                across markets. We build capable teams that work as an extension
                of the businesses we support.
              </p>
            </HeadingReveal>

            <ul className="mb-5 max-w-xl space-y-2">
              {[
                "IT delivery for global enterprise accounts",
                "Shared tools, processes, and accountability",
                "People developed for long-term technical roles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
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
          <HeadingReveal className="mb-6 max-w-xl md:mb-8">
            <p className="type-eyebrow mb-1.5 text-brand">What we do</p>
            <h2 className="type-h2 mt-0 text-ink">
              IT capabilities for global delivery.
            </h2>
            <p className="type-body mt-2 max-w-xl text-muted">
              Focused workstreams that keep businesses worldwide moving — with
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
                    <h3 className="type-h3 mt-3 text-ink">{c.title}</h3>
                    <p className="type-meta mt-1.5 text-muted">{c.body}</p>
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
            <p className="type-eyebrow mb-1.5 text-brand">Why Comtanix</p>
            <h2 className="type-h2 mt-0 text-ink">
              How we work with global clients.
            </h2>
            <p className="type-body mt-2 max-w-xl text-muted">
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
                  <p className="type-eyebrow text-brand">0{i + 1}</p>
                  <h3 className="type-h3 mt-1.5 text-ink">{w.title}</h3>
                  <p className="type-meta mt-1.5 text-muted">{w.body}</p>
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
              <p className="type-eyebrow mb-1.5 text-brand">Careers</p>
              <h2 className="type-h2 mt-0 text-ink">
                Build your career on real global IT work.
              </h2>
              <p className="type-body mt-2 max-w-prose text-muted">
                Structured training, clear progression, and roles that connect you
                to live international delivery — not short-term volume work.
              </p>
            </HeadingReveal>

            <ul className="mt-4 space-y-0 border-t border-line sm:mt-5">
              {[
                "Paid induction and role-specific onboarding",
                "Mentorship with client account leads",
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
                  <span className="type-meta min-w-0 leading-snug text-ink">
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
                href="/submit-cv"
                variant="secondary"
                className="w-full justify-center sm:w-auto"
              >
                Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
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
              <p className="type-eyebrow mb-1.5 text-brand">Life at Comtanix</p>
              <h2 className="type-h2 mt-0 text-ink">
                People, culture, and growth around the work.
              </h2>
              <p className="type-body mt-2 max-w-xl text-muted">
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
                  <h3 className="type-h3 text-ink">{item.title}</h3>
                  <p className="type-meta mt-1.5 text-muted">{item.body}</p>
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
              <p className="type-eyebrow mb-1.5 text-brand">Opportunities</p>
              <h2 className="type-h2 text-ink">
                Open roles across engineering and IT support.
              </h2>
              <p className="type-body mt-2 text-muted">
                Review current openings, or explore how we train and grow people
                inside live client accounts.
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
    </>
  );
}
