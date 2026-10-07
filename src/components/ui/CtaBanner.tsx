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
        <div className="relative overflow-hidden rounded-2xl bg-brand px-6 py-10 text-white sm:px-8 sm:py-12 md:px-12 md:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(ellipse_at_85%_20%,rgba(255,255,255,0.22)_0%,transparent_45%),radial-gradient(ellipse_at_10%_90%,rgba(11,44,53,0.35)_0%,transparent_50%)]"
            aria-hidden
          />
          <div className="relative z-10 grid min-w-0 items-center gap-6 md:grid-cols-[1.25fr_auto] md:gap-10">
            <div className="min-w-0 max-w-xl">
              {eyebrow ? (
                <p className="type-eyebrow mb-2 text-white/75">{eyebrow}</p>
              ) : null}
              <h2 className="type-h2 text-white">{title}</h2>
              {description ? (
                <p className="type-body mt-3 text-white/90">{description}</p>
              ) : null}
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
