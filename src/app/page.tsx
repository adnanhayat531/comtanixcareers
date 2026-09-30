import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { OfficeIllustration } from "@/components/ui/OfficeIllustration";
import { HeroNetwork } from "@/components/home/HeroNetwork";
import { HeroCopy } from "@/components/home/HeroCopy";
import { StatsBar } from "@/components/home/StatsBar";
import { GoalCard } from "@/components/home/GoalCard";
import { CultureCard } from "@/components/home/CultureCard";
import { TestimonialsSlider } from "@/components/home/Testimonials";
import { GetInTouch } from "@/components/layout/GetInTouch";
import { HeadingReveal } from "@/components/motion/Reveal";
import { CULTURE_TILES, GOALS } from "@/lib/data/content";

export default function HomePage() {
  return (
    <>
      {/* Hero + numbers in first viewport (no scroll needed) */}
      <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden bg-brand md:min-h-[calc(100svh-4rem)]">
        <HeroNetwork />
        <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center">
          <HeroCopy />
        </div>
        <StatsBar />
      </section>

      {/* Careers split */}
      <Section className="bg-tint">
        <Container className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 min-w-0 text-left lg:order-1">
            <HeadingReveal className="mb-5 max-w-2xl md:mb-6" duration={1}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                Careers at Comtanix
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.65rem)] font-extrabold tracking-tight text-ink leading-[1.2] text-balance">
                A home for sustainable,{" "}
                <span className="text-brand">high-growth careers</span> in IT.
              </h2>
              <p className="mt-2.5 max-w-prose text-base leading-[1.65] text-muted md:text-[17px]">
                Comtanix teams adjust to each client&apos;s tools, processes and
                standards. We train our people to match, and we grow them into the
                next role.
              </p>
            </HeadingReveal>

            <ul className="mb-6 max-w-xl space-y-2">
              {[
                "100% Paid training and onboarding program",
                "Direct mentorship with US account managers",
                "Predictable shift schedules with premium night allowances",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-transparent bg-white/80 px-3 py-2.5 transition-colors hover:border-line hover:bg-white"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-[15px] font-medium leading-snug text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Button href="/careers">
              Explore Openings <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <div className="order-1 w-full min-w-0 lg:order-2">
            <OfficeIllustration caption="Comtanix office — secure, modern floor" />
          </div>
        </Container>
      </Section>

      {/* Goals */}
      <Section className="bg-on-sea">
        <Container>
          <HeadingReveal className="mb-7 md:mb-8" duration={1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Our philosophy
            </span>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold tracking-tight text-ink leading-[1.2]">
              Our Goals as an{" "}
              <span className="text-brand">Enterprise</span>
            </h2>
            <p className="mt-2.5 max-w-xl text-base leading-[1.65] text-muted md:text-[17px]">
              To build strong careers by delivering dependable IT work for US
              businesses.
            </p>
          </HeadingReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {GOALS.map((g, i) => (
              <GoalCard
                key={g.title}
                title={g.title}
                body={g.body}
                image={g.image}
                tag={g.tag}
                index={i}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Culture */}
      <Section className="bg-white">
        <Container>
          <HeadingReveal className="mb-7 md:mb-8" duration={1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Life at Comtanix
            </span>
            <h2 className="mt-3 font-display text-[1.75rem] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.35rem]">
              What Makes Us Comtanix
            </h2>
            <p className="mt-2 text-base text-muted md:text-lg">
              We work to give you the work-life balance you deserve.
            </p>
          </HeadingReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {CULTURE_TILES.map((c, i) => (
              <CultureCard
                key={c.title}
                title={c.title}
                body={c.body}
                image={c.image}
                index={i}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col items-stretch gap-5 rounded-2xl bg-brand px-5 py-7 sm:items-start sm:px-7 sm:py-8 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-6 md:px-10 md:py-9">
            <div className="min-w-0 max-w-xl">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/35 px-3 py-1 text-xs font-medium text-white md:mb-4">
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                Upskilling & Professional Growth
              </span>
              <h3 className="font-display text-lg font-semibold text-white sm:text-xl md:text-2xl">
                Continuous Learning & Accent Neutralization
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80 md:text-[15px]">
                Dedicated corporate trainers coach weekly on American business
                idioms, client negotiations, and cloud architectural patterns.
              </p>
            </div>
            <Button href="/careers" variant="white" className="w-full shrink-0 sm:w-auto">
              View Openings <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-tint">
        <Container>
          <TestimonialsSlider />
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-brand">
        <Image
          src="/cta-opportunity.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-brand/88"
          aria-hidden
        />
        <Container className="relative z-10">
          <HeadingReveal className="max-w-2xl" duration={1.1}>
            <h2 className="font-display text-[clamp(1.6rem,5.5vw,2.75rem)] font-extrabold tracking-tight text-white text-balance lg:leading-[1.15]">
              Your next opportunity could start here.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/80 sm:mt-5 sm:text-base md:text-lg">
              Ready to represent premier US enterprise brands and collaborate with
              high-performing global peers?
            </p>
            <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button href="/apply" variant="white">
                Join us now <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/careers" variant="outlineLight">
                Explore open roles <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </HeadingReveal>
        </Container>
      </Section>

      <GetInTouch />
    </>
  );
}
