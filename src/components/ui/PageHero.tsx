import Image from "next/image";
import { type ReactNode } from "react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Container } from "@/components/ui/Section";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  /** Prefer dark overlay + light text (Contour-style). Default when image is set. */
  tone?: "dark" | "light";
  children?: ReactNode;
  className?: string;
};

/**
 * Shared internal-page hero: full-bleed visual, clear hierarchy, CTA slot.
 * Preserves page-specific CTAs via children.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  tone,
  children,
  className = "",
}: PageHeroProps) {
  const resolvedTone = tone ?? (image ? "dark" : "light");
  const isDark = resolvedTone === "dark";

  return (
    <section
      className={`relative flex min-h-[min(38vh,16rem)] flex-col justify-center overflow-hidden sm:min-h-[min(42vh,20rem)] md:min-h-[min(46vh,24rem)] ${className}`}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
          {isDark ? (
            <>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/70"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(73,164,174,0.35)_0%,transparent_55%)]"
                aria-hidden
              />
            </>
          ) : (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-3xl bg-gradient-to-r from-white/80 via-white/45 to-transparent"
              aria-hidden
            />
          )}
        </>
      ) : (
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,var(--deep)_0%,var(--brand)_48%,var(--brand-bright)_100%)]"
          aria-hidden
        >
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18)_0%,transparent_42%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.1)_0%,transparent_40%)]" />
          <div className="geometric-mesh absolute inset-0 opacity-30" />
        </div>
      )}

      <Container className="relative z-10 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="max-w-2xl min-w-0">
          <p
            className={`type-eyebrow mb-2 ${
              isDark || !image ? "text-white/80" : "text-brand"
            }`}
          >
            {eyebrow}
          </p>
          <h1
            className={`type-h1 text-balance ${
              isDark || !image ? "text-white" : "text-ink"
            }`}
          >
            <BrandAccentText
              accentClassName={
                isDark || !image
                  ? "text-white underline decoration-white/50 decoration-2 underline-offset-[0.2em]"
                  : "text-brand"
              }
            >
              {title}
            </BrandAccentText>
          </h1>
          <p
            className={`type-lede mt-3 max-w-xl text-pretty ${
              isDark || !image ? "text-white/90" : "text-ink/85"
            }`}
          >
            {description}
          </p>
          {children ? (
            <div className="mt-5 flex w-full max-w-sm flex-col gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-3 [&_a]:w-full sm:[&_a]:w-auto">
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
