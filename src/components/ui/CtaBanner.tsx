import { type ReactNode } from "react";
import { Container, Section } from "@/components/ui/Section";

type CtaBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

/** Full-width CTA band used at the end of marketing pages. */
export function CtaBanner({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: CtaBannerProps) {
  return (
    <Section className={`bg-tint ${className}`}>
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-brand px-4 py-6 text-white sm:rounded-[var(--radius-xl)] sm:px-7 sm:py-9 md:px-9 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(ellipse_at_85%_20%,rgba(255,255,255,0.22)_0%,transparent_45%),radial-gradient(ellipse_at_10%_90%,rgba(11,44,53,0.35)_0%,transparent_50%)]"
            aria-hidden
          />
          <div className="relative z-10 grid min-w-0 items-center gap-4 sm:gap-5 md:grid-cols-[minmax(0,1.25fr)_auto] md:gap-8">
            <div className="min-w-0 max-w-xl">
              {eyebrow ? (
                <p className="type-eyebrow mb-2 text-white/75">{eyebrow}</p>
              ) : null}
              <h2 className="type-h2 text-balance text-white">{title}</h2>
              {description ? (
                <p className="type-body mt-2.5 text-pretty text-white/90">{description}</p>
              ) : null}
            </div>
            <div className="flex w-full min-w-0 flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3 [&_a]:w-full sm:[&_a]:w-auto">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
