import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { HeroNetwork } from "@/components/home/HeroNetwork";
import { HeroCopy } from "@/components/home/HeroCopy";
import { StatsBar } from "@/components/home/StatsBar";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { HeadingReveal } from "@/components/motion/Reveal";
import { CAPABILITIES, WHY_COMTANIX } from "@/lib/data/content";

export default function HomePage() {
  return (
    <>
      <section className="relative flex h-[100svh] min-h-[100svh] w-full flex-col overflow-hidden supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:min-h-[100dvh]">
        <HeroNetwork />
        {/* Copy sits upper-left over the wash; stats float at bottom */}
        <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-none flex-1 flex-col items-start justify-start px-[var(--container-pad-x)] pt-[calc(var(--header-h)+clamp(2.5rem,8vh,6.5rem))]">
          <HeroCopy />
        </div>
        <div className="relative z-20 mt-auto w-full min-w-0 flex-none">
          <StatsBar />
        </div>
      </section>

      <WhoWeAre />

      {/* What We Do — compact editorial cards */}
      <Section
        id="services"
        className="services-gradient-section !py-6 scroll-mt-24 md:!py-8 md:scroll-mt-28"
      >
        <Container>
          <HeadingReveal className="mb-4 max-w-2xl md:mb-5">
            <p className="type-eyebrow mb-1.5 text-brand">What We Do</p>
            <h2 className="type-h2 mt-0 text-ink">
              From emerging technology to everyday{" "}
              <span className="text-brand">business operations.</span>
            </h2>
            <p className="type-body mt-2 max-w-2xl text-muted">
              Whether you need to automate tasks, build software, manage
              finances, or grow your business, we partner with you to get it
              done.
            </p>
          </HeadingReveal>

          <ul className="grid w-full grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 xl:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <li
                key={c.title}
                className="group flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[0.9rem] border border-white/12 bg-[rgba(4,22,28,0.55)] shadow-[0_10px_28px_-18px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_14px_32px_-14px_rgba(0,238,234,0.2)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    quality={90}
                    className="object-cover object-[center_35%] brightness-[1.04] contrast-[1.05] saturate-[0.92] transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041216]/25 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 px-3.5 py-3 sm:px-4 sm:py-3.5">
                  <h3 className="type-h3 text-ink">{c.title}</h3>
                  <p className="type-meta leading-snug text-white/70">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Why Comtanix — compact editorial cards */}
      <Section className="theme-light site-light-section !py-6 md:!py-8">
        <Container>
          <HeadingReveal className="mb-4 max-w-2xl md:mb-5">
            <p className="type-eyebrow mb-1.5 text-brand">Why Comtanix</p>
            <h2 className="type-h2 mt-0 text-ink">
              Beyond technology, a partnership built on{" "}
              <span className="text-brand">trust.</span>
            </h2>
            <p className="type-body mt-2 max-w-2xl text-muted">
              We bring strategic thinking, technical expertise, and clear
              accountability together to solve complex challenges and deliver
              meaningful business outcomes.
            </p>
          </HeadingReveal>

          <ul className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-3.5">
            {WHY_COMTANIX.map((w) => (
              <li
                key={w.title}
                className="group flex min-w-0 flex-col overflow-hidden rounded-[0.9rem] border border-[#0b2c35]/10 bg-white shadow-[0_10px_28px_-20px_rgba(11,44,53,0.25)] transition duration-300 hover:-translate-y-0.5 hover:border-[#49a4ae]/45 hover:shadow-[0_14px_32px_-14px_rgba(73,164,174,0.28)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={w.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={90}
                    className="object-cover object-[center_40%] brightness-[1.03] contrast-[1.04] saturate-[0.94] transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 px-4 py-3.5 sm:px-5 sm:py-4">
                  <h3 className="type-h3 text-[#0b2c35]">{w.title}</h3>
                  <p className="type-meta leading-snug text-[#3a8a93]">{w.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
