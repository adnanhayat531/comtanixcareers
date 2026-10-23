import Image from "next/image";
import {
  CAPABILITY_ILLUSTRATIONS,
  WHY_ILLUSTRATIONS,
} from "@/components/home/CapabilityIcons";
import { Container, Section } from "@/components/ui/Section";
import { HeroNetwork } from "@/components/home/HeroNetwork";
import { HeroCopy } from "@/components/home/HeroCopy";
import { StatsBar } from "@/components/home/StatsBar";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { HeadingReveal } from "@/components/motion/Reveal";
import { CAPABILITIES, WHY_COMTANIX } from "@/lib/data/content";

const CAPABILITY_PHOTOS: Partial<Record<string, string>> = {
  "Business Development": "/capabilities/business-development.jpg",
};

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

      {/* What We Do — illustrative duotone icons */}
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
              const photo = CAPABILITY_PHOTOS[c.title];
              const Illustration = CAPABILITY_ILLUSTRATIONS[i];

              if (photo) {
                return (
                  <li
                    key={c.title}
                    className="group relative min-h-[14.5rem] min-w-0 overflow-hidden rounded-[1rem] border border-[#0b2c35]/12 shadow-[0_10px_28px_-18px_rgba(11,44,53,0.4)] transition duration-300 hover:-translate-y-0.5 hover:border-[#49a4ae]/4 hover:shadow-[0_16px_32px_-14px_rgba(73,164,174,0.45)] sm:min-h-[15.5rem]"
                  >
                    <Image
                      src={photo}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      quality={90}
                      className="object-cover object-[center_20%] transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#041216]/92 via-[#041216]/45 to-[#041216]/15"
                      aria-hidden
                    />
                    <div className="relative z-10 flex h-full min-h-[14.5rem] flex-col justify-end px-5 py-5 sm:min-h-[15.5rem] sm:px-5 sm:py-6">
                      <h3 className="type-h3 text-white">{c.title}</h3>
                      <p className="type-meta mt-1.5 leading-snug text-white/85">
                        {c.body}
                      </p>
                    </div>
                  </li>
                );
              }

              return (
                <li
                  key={c.title}
                  className="theme-light group flex min-w-0 flex-col rounded-[1rem] border border-[#0b2c35]/12 bg-white px-5 py-5 shadow-[0_10px_28px_-18px_rgba(11,44,53,0.4)] transition duration-300 hover:-translate-y-0.5 hover:border-[#49a4ae]/4 hover:shadow-[0_16px_32px_-14px_rgba(73,164,174,0.45)] sm:px-5 sm:py-6"
                >
                  {Illustration ? (
                    <Illustration className="mb-5 h-[5.25rem] w-full max-w-[8.5rem] shrink-0 self-start" />
                  ) : null}
                  <h3 className="type-h3 text-[#0b2c35]">{c.title}</h3>
                  <p className="type-meta mt-1.5 leading-snug text-[#3a8a93]">
                    {c.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Why Comtanix — white band + illustrative icons */}
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

          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {WHY_COMTANIX.map((w, i) => {
              const Illustration = WHY_ILLUSTRATIONS[i];
              return (
                <li
                  key={w.title}
                  className="group flex min-w-0 flex-col rounded-[1rem] border border-[#0b2c35]/12 bg-[#f4fafb] px-5 py-5 shadow-[0_10px_28px_-18px_rgba(11,44,53,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-[#49a4ae]/4 hover:shadow-[0_16px_32px_-14px_rgba(73,164,174,0.35)] sm:px-5 sm:py-6"
                >
                  {Illustration ? (
                    <Illustration className="mb-5 h-[5.25rem] w-full max-w-[8.5rem] shrink-0 self-start" />
                  ) : null}
                  <h3 className="type-h3 text-ink">{w.title}</h3>
                  <p className="type-meta mt-1.5 leading-snug text-muted">{w.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </>
  );
}
