import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { WHO_WE_ARE_POINTS } from "@/lib/data/content";

/**
 * Who We Are — white text panel + teal-lit photo.
 */
export function WhoWeAre() {
  return (
    <Section
      id="who-we-are"
      className="theme-light site-light-section relative scroll-mt-24 overflow-x-clip !py-6 md:scroll-mt-28 md:!py-8"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -bottom-1 -left-[10%] flex w-[min(38%,18rem)] origin-bottom-left -rotate-[28deg] flex-col gap-2 sm:-left-[6%]">
          <span className="h-5 w-full rounded-full bg-brand/15 sm:h-6" />
          <span className="ml-[12%] h-4 w-[86%] rounded-full bg-brand/25 sm:h-5" />
        </div>
        <div className="absolute -right-[8%] bottom-0 flex w-[min(42%,20rem)] origin-bottom-right rotate-[30deg] flex-col gap-2 sm:-right-[4%] lg:right-0">
          <span className="ml-[14%] h-4 w-[78%] rounded-full bg-brand/12 sm:h-5" />
          <span className="h-6 w-full rounded-full bg-brand/25 sm:h-7" />
          <span className="ml-[8%] h-4 w-[88%] rounded-full bg-brand/16 sm:h-5" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="grid min-w-0 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0 max-w-xl text-left lg:max-w-none">
            <p className="type-eyebrow mb-2 text-brand">Who we are</p>

            <h2 className="type-h2 text-ink">
              A global technology company built around{" "}
              <span className="text-brand">capability</span>.
            </h2>

            <p className="type-meta mt-3 max-w-prose text-muted">
              From software and AI to everyday IT, we help you manage critical
              technology needs with skilled professionals and AI-enabled
              solutions. Our teams work with your people, systems, and processes
              to support your operations and keep projects on track.
            </p>

            <ul className="mt-4 space-y-2.5 sm:mt-5">
              {WHO_WE_ARE_POINTS.map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  <span className="type-meta min-w-0 leading-snug font-medium text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <Button
                href="#services"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Explore Our Services
                <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </Button>
            </div>
          </div>

          <div className="relative w-full min-w-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-lg)] bg-tint ring-1 ring-line/70 sm:rounded-[var(--radius-xl)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/who-we-are-office.jpg"
                alt="Bright modern Comtanix workspace with open desks and glass meeting room"
                width={1920}
                height={1080}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[center_45%] brightness-[0.72] contrast-[1.1] saturate-[0.9]"
              />
              {/* Same image — teal cinematic lighting only */}
              <div
                className="absolute inset-0 bg-[#0a3d48]/50 mix-blend-color"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_35%,rgba(34,211,238,0.4)_0%,transparent_50%)] mix-blend-screen opacity-70"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,24,32,0.55)_0%,rgba(0,90,100,0.2)_40%,rgba(0,16,22,0.5)_100%)]"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
