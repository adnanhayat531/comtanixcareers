import { type ReactNode } from "react";
import { Container, Section } from "@/components/ui/Section";

type CtaBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Outer band tone for teal/white page rhythm. Default dark. */
  tone?: "dark" | "light";
};

/** Full-width CTA band used at the end of marketing pages. */
export function CtaBanner({
  eyebrow,
  title,
  description,
  children,
  className = "",
  tone = "dark",
}: CtaBannerProps) {
  const band =
    tone === "light"
      ? "theme-light site-light-section"
      : "site-dark-section";
  return (
    <Section className={`${band} ${className}`}>
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[linear-gradient(115deg,#05222B_0%,#06343B_45%,#08353D_100%)] px-4 py-6 text-[#F5FFFF] shadow-[0_0_0_1px_rgba(0,238,234,0.12),0_0_40px_-14px_rgba(0,238,234,0.12)] ring-1 ring-[rgba(0,238,234,0.48)] sm:rounded-[var(--radius-xl)] sm:px-7 sm:py-9 md:px-9 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(ellipse_at_85%_20%,rgba(255,255,255,0.22)_0%,transparent_45%),radial-gradient(ellipse_at_10%_90%,rgba(11,44,53,0.35)_0%,transparent_50%)]"
            aria-hidden
          />
          <div className="relative z-10 grid min-w-0 items-center gap-4 sm:gap-5 md:grid-cols-[minmax(0,1.25fr)_auto] md:gap-8">
            <div className="min-w-0 max-w-xl">
              {eyebrow ? (
                <p className="type-eyebrow mb-2 text-brand">{eyebrow}</p>
              ) : null}
              <h2 className="type-h2 text-balance text-ink">{title}</h2>
              {description ? (
                <p className="type-body mt-2.5 text-pretty text-muted">{description}</p>
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
