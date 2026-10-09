import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { WHO_WE_ARE_POINTS } from "@/lib/data/content";

/**
 * Who We Are — compact two-column block under StatsBar.
 */
export function WhoWeAre() {
  return (
    <Section
      id="who-we-are"
      className="relative scroll-mt-24 overflow-x-clip !py-6 bg-white md:scroll-mt-28 md:!py-8"
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
            <p className="type-eyebrow mb-2 inline-flex items-center gap-2 text-brand">
              Who we are
              <span className="block h-px w-6 bg-brand" aria-hidden />
            </p>

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
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-lg)] sm:rounded-[var(--radius-xl)]">
              <Image
                src="/office-comtanix.jpg"
                alt="Comtanix office building at night — Bahria Town Phase 8, Rawalpindi"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
