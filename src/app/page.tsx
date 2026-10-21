import Image from "next/image";
import {
  Calculator,
  Cloud,
  Code2,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
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
      <section className="relative flex h-[var(--hero-min-h)] min-h-[100svh] flex-col overflow-hidden bg-canvas supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:min-h-[100dvh]">
        <HeroNetwork />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center px-[var(--container-pad-x)] pb-4 pt-[calc(var(--header-h)+clamp(1.25rem,4vh,2.5rem))] sm:pb-5">
          <HeroCopy />
        </div>
        <div
          className="relative z-20 mt-auto h-fit max-h-fit w-full flex-none self-end pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]"
          style={{ height: "max-content" }}
        >
          <StatsBar />
        </div>
      </section>

      <WhoWeAre />

      {/* What We Do */}
      <Section
        id="services"
        className="home-dark-section scroll-mt-24 md:scroll-mt-28"
      >
        <Container>
          <HeadingReveal className="mb-5 max-w-2xl md:mb-6">
            <p className="type-eyebrow mb-2 text-brand">What We Do</p>
            <h2 className="type-h2 mt-0 text-ink">
              From emerging technology to everyday{" "}
              <span className="text-brand">business operations.</span>
            </h2>
            <p className="type-body mt-2.5 max-w-2xl text-muted">
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
                  className="glass-card group min-w-0 overflow-hidden rounded-[var(--radius-lg)] transition hover:shadow-[0_0_0_1px_var(--glow),var(--glow-cyan)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      quality={100}
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-4 py-3.5 sm:px-4 sm:py-4">
                    <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-md)] border border-line bg-[var(--icon-bg)] text-brand shadow-[0_0_16px_-4px_rgba(0,238,234,0.35)]">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <h3 className="type-h3 mt-2.5 text-ink">{c.title}</h3>
                    <p className="type-meta mt-1.5 text-muted">{c.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Why Comtanix — white after dark What We Do */}
      <Section className="theme-light site-light-section !pt-2 md:!pt-4">
        <Container>
          <HeadingReveal className="mb-5 max-w-2xl md:mb-6">
            <p className="type-eyebrow mb-2 text-brand">Why Comtanix</p>
            <h2 className="type-h2 mt-0 text-ink">
              Beyond technology, a partnership built on{" "}
              <span className="text-brand">trust.</span>
            </h2>
            <p className="type-body mt-2.5 max-w-2xl text-muted">
              We bring strategic thinking, technical expertise, and clear
              accountability together to solve complex challenges and deliver
              meaningful business outcomes.
            </p>
          </HeadingReveal>

          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {WHY_COMTANIX.map((w) => (
              <li
                key={w.title}
                className="glass-card group min-w-0 overflow-hidden rounded-[1.1rem] transition hover:shadow-[0_0_0_1px_var(--glow),var(--glow-cyan)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                  <Image
                    src={w.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                  <h3 className="type-h3 text-ink">{w.title}</h3>
                  <p className="type-meta mt-1.5 text-muted">{w.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
