import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
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
      <section className="relative flex min-h-svh flex-col overflow-hidden bg-[#1a4545]">
        <HeroNetwork />
        <div className="relative z-10 flex flex-1 flex-col justify-center">
          <HeroCopy />
        </div>
        <StatsBar />
      </section>

      {/* Careers split */}
      <Section className="bg-surface">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              compact
              title="A home for sustainable, high-growth careers in IT."
              description="Comtanix teams adjust to each client's tools, processes and standards. We train our people to match, and we grow them into the next role."
              className="mb-8"
            />
            <ul className="mb-8 space-y-3.5">
              {[
                "100% Paid training and onboarding program",
                "Direct mentorship with US account managers",
                "Predictable shift schedules with premium night allowances",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button href="/careers">Explore Openings</Button>
          </div>
          <OfficeIllustration caption="Comtanix office — secure, modern floor" />
        </Container>
      </Section>

      {/* Goals */}
      <Section className="bg-[#f4f8f8]">
        <Container>
          <HeadingReveal className="mb-10 md:mb-12" duration={1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-sea uppercase shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Our philosophy
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold tracking-tight text-ink leading-[1.2]">
              Our Goals as an{" "}
              <span className="text-sea">Enterprise</span>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-[1.7] text-muted md:text-[17px]">
              To build strong careers by delivering dependable IT work for US
              businesses.
            </p>
          </HeadingReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
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
          <HeadingReveal className="mb-10 md:mb-12" duration={1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-sea uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-sea" aria-hidden />
              Life at Comtanix
            </span>
            <h2 className="mt-4 font-display text-[1.75rem] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.35rem]">
              What Makes Us Comtanix
            </h2>
            <p className="mt-2 text-base text-muted md:text-lg">
              We work to give you the work-life balance you deserve.
            </p>
          </HeadingReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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

          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl bg-gradient-to-r from-deep via-sea to-[#2a6e6e] px-7 py-8 sm:flex-row sm:items-center md:mt-8 md:px-10 md:py-9">
            <div className="max-w-xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/35 px-3 py-1 text-xs font-medium text-white">
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                Upskilling & Professional Growth
              </span>
              <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                Continuous Learning & Accent Neutralization
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80 md:text-[15px]">
                Dedicated corporate trainers coach weekly on American business
                idioms, client negotiations, and cloud architectural patterns.
              </p>
            </div>
            <Button href="/careers" variant="white" className="shrink-0">
              View Openings <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f5f7f7]">
        <Container>
          <TestimonialsSlider />
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-[#0a2222]">
        <Image
          src="/cta-opportunity.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0a2222]/92 via-[#163a3a]/82 to-[#0a2222]/70"
          aria-hidden
        />
        <Container className="relative z-10">
          <HeadingReveal className="max-w-2xl" duration={1.1}>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white text-balance md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Your next opportunity could start here.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              Ready to represent premier US enterprise brands and collaborate with
              high-performing global peers?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
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
