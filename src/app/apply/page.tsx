import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { GetInTouch } from "@/components/layout/GetInTouch";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Apply Now",
  description:
    "Apply to Comtanix in minutes. Share your details and CV with our hiring team.",
};

const STEPS = [
  {
    n: "01",
    title: "Screening",
    body: "Background review within two business days.",
  },
  {
    n: "02",
    title: "Communication check",
    body: "Short spoken-English and situational assessment.",
  },
  {
    n: "03",
    title: "Interview & offer",
    body: "Panel interview, written offer, and onboarding date.",
  },
] as const;

export default function ApplyPage() {
  return (
    <>
      {/* Half hero — matches careers / contact */}
      <section className="relative flex min-h-[42vh] flex-col justify-end overflow-hidden sm:min-h-[46vh] md:min-h-[50vh] lg:min-h-[52vh]">
        <Image
          src="/careers-team.jpg"
          alt="Apply to Comtanix — join our US delivery teams"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-3xl bg-gradient-to-r from-white/75 via-white/40 to-transparent"
          aria-hidden
        />

        <Container className="relative z-10 py-8 sm:py-10 md:py-12">
          <div className="max-w-xl">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.1em] text-ink uppercase">
              Application
            </p>
            <h1 className="font-display text-[clamp(1.5rem,4.5vw,2.5rem)] font-bold tracking-tight text-ink leading-[1.15]">
              Start your application.
            </h1>
            <p className="mt-2.5 max-w-md text-[14px] font-medium leading-[1.55] text-ink/85 sm:mt-3 sm:text-[15px] md:text-base">
              Tell us about yourself and the role you want. Our hiring team
              reviews every submission and follows up promptly.
            </p>
            <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                href="#application"
                className="!bg-[#55ACB5] text-white hover:!brightness-110"
              >
                Fill the form <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                href="/careers"
                className="!border-0 !bg-white !text-ink shadow-soft hover:!bg-white/95"
              >
                Browse openings <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section id="application" className="scroll-mt-20 md:scroll-mt-28">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 xl:gap-16">
            <div className="min-w-0">
              <SectionHeading
                compact
                eyebrow="Your details"
                title="Application form"
                description="Required fields take about two minutes. Attach a PDF or Word CV to continue."
                className="mb-6 md:mb-8"
              />
              <Suspense
                fallback={
                  <p className="text-muted" role="status">
                    Loading form…
                  </p>
                }
              >
                <ApplyForm />
              </Suspense>
            </div>

            <aside className="min-w-0 lg:pt-2">
              <p className="font-display text-xs font-bold tracking-[0.08em] text-brand uppercase">
                What happens next
              </p>
              <h2 className="mt-1.5 font-display text-[clamp(1.25rem,2.5vw,1.65rem)] font-bold tracking-tight text-ink leading-[1.25]">
                From apply to offer
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                Typical path after you submit. Prefer to talk first?{" "}
                <a
                  href={waLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:underline"
                >
                  WhatsApp hiring
                </a>
                .
              </p>
              <ol className="mt-6 space-y-5 border-t border-line pt-6">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="font-display text-xs font-bold tracking-[0.08em] text-brand uppercase">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold text-ink">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </Container>
      </Section>

      <GetInTouch />
    </>
  );
}
