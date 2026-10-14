import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  Cloud,
  Code2,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { HeroNetwork } from "@/components/home/HeroNetwork";
import { HeroCopy } from "@/components/home/HeroCopy";
import { StatsBar } from "@/components/home/StatsBar";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { HeadingReveal } from "@/components/motion/Reveal";
import { CAPABILITIES, WHY_COMTANIX } from "@/lib/data/content";

const CAPABILITY_ICONS = [
  Sparkles,
  Code2,
  ShieldCheck,
  Cloud,
  ShoppingBag,
  Calculator,
  TrendingUp,
  Megaphone,
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[var(--hero-min-h)] flex-col overflow-hidden bg-[#050a0a] supports-[height:100svh]:min-h-[var(--hero-min-h)]">
        <HeroNetwork />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center px-[var(--container-pad-x)] pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-[calc(var(--header-h)+clamp(1.25rem,4vh,2.5rem))] sm:pb-[clamp(3rem,8vh,5rem)]">
          <HeroCopy />
        </div>
      </section>

      <StatsBar />

      <WhoWeAre />

      {/* What We Do */}
      <Section
        id="services"
        className="home-dark-section scroll-mt-24 md:scroll-mt-28"
      >
        <Container>
          <HeadingReveal className="mb-5 max-w-2xl md:mb-6">
            <p className="type-eyebrow mb-2 text-cyan-300">What We Do</p>
            <h2 className="type-h2 mt-0 text-white">
              From emerging technology to everyday{" "}
              <span className="text-cyan-300">business operations.</span>
            </h2>
            <p className="type-body mt-2.5 max-w-2xl text-white/70">
              Whether you need to automate tasks, build software, manage
              finances, or grow your business, we partner with you to get it
              done.
            </p>
          </HeadingReveal>

          <ul className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
            {CAPABILITIES.map((c, i) => {
              const Icon = CAPABILITY_ICONS[i] ?? Code2;
              return (
                <li
                  key={c.title}
                  className="group min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-cyan-300/20 bg-white/[0.04] shadow-[0_0_28px_-18px_rgba(34,211,238,0.55)] backdrop-blur-sm transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a0a]/85 via-[#050a0a]/25 to-transparent" />
                  </div>
                  <div className="px-4 py-3.5 sm:px-4 sm:py-4">
                    <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-md)] border border-cyan-300/35 bg-cyan-400/15 text-cyan-300 shadow-[0_0_16px_-4px_rgba(34,211,238,0.7)]">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <h3 className="type-h3 mt-2.5 text-white">{c.title}</h3>
                    <p className="type-meta mt-1.5 text-white/65">{c.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Why Comtanix */}
      <Section className="home-dark-section !pt-2 md:!pt-4">
        <Container>
          <HeadingReveal className="mb-5 max-w-2xl md:mb-6">
            <p className="type-eyebrow mb-2 text-cyan-300">Why Comtanix</p>
            <h2 className="type-h2 mt-0 text-white">
              Beyond technology, a partnership built on{" "}
              <span className="text-cyan-300">trust.</span>
            </h2>
            <p className="type-body mt-2.5 max-w-2xl text-white/70">
              We bring strategic thinking, technical expertise, and clear
              accountability together to solve complex challenges and deliver
              meaningful business outcomes.
            </p>
          </HeadingReveal>

          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {WHY_COMTANIX.map((w, i) => (
              <li
                key={w.title}
                className="min-w-0 overflow-hidden rounded-[1.1rem] border border-cyan-300/25 bg-[linear-gradient(160deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] shadow-[0_0_36px_-16px_rgba(34,211,238,0.45)] backdrop-blur-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={w.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071218] via-[#071218]/40 to-transparent" />
                </div>
                <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                  <p className="type-eyebrow text-cyan-300">0{i + 1}</p>
                  <h3 className="type-h3 mt-1.5 text-white">{w.title}</h3>
                  <p className="type-meta mt-1.5 text-white/65">{w.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBanner
        className="!bg-[#050a0a]"
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
