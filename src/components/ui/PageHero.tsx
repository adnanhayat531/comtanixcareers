import { type ReactNode } from "react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Container } from "@/components/ui/Section";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  /** cover crops to fill; contain shows the full original (no zoom). */
  imageFit?: "cover" | "contain";
  /** object-position for the photo. */
  imagePosition?: "center" | "right" | "left";
  /** Soft left→right fade so letterbox edge blends into the hero (no hard cut). */
  imageBlend?: boolean;
  /** Prefer light text on photo heroes. Default when image is set. */
  tone?: "dark" | "light";
  children?: ReactNode;
  className?: string;
};

/** Brand teal wash for blended photo heroes (not black) */
const HERO_BLEND = "#1e5f68";
const HERO_BLEND_RGB = "30,95,104";

/** Soft brand wash behind copy only — no hard corners, image stays clear */
function TextWash({
  children,
  soft,
}: {
  children: ReactNode;
  soft?: boolean;
}) {
  if (soft) {
    return (
      <div className="relative w-fit max-w-full">
        <div
          className="pointer-events-none absolute -inset-y-10 -left-10 -right-6 -z-10 sm:-inset-y-12 sm:-left-14 sm:-right-10"
          style={{
            background: `radial-gradient(125% 110% at 0% 50%, ${HERO_BLEND}ee 0%, ${HERO_BLEND}99 42%, ${HERO_BLEND}33 68%, transparent 82%)`,
          }}
          aria-hidden
        />
        {children}
      </div>
    );
  }

  return (
    <div className="relative w-fit max-w-full">
      <div
        className="pointer-events-none absolute -inset-y-6 -left-6 -right-2 -z-10 sm:-inset-y-8 sm:-left-10 sm:-right-6"
        style={{
          background:
            "radial-gradient(115% 95% at 8% 50%, rgba(22, 74, 81, 0.92) 0%, rgba(47, 122, 132, 0.62) 38%, rgba(73, 164, 174, 0.28) 62%, transparent 78%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-y-3 -left-3 right-8 -z-10 sm:-left-5"
        style={{
          background:
            "linear-gradient(90deg, rgba(22, 74, 81, 0.55) 0%, rgba(22, 74, 81, 0.22) 55%, transparent 100%)",
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}

/**
 * Shared internal-page hero (About, Careers, Life, Contact, CV, Apply).
 * Full-bleed photo stays clear; logo-teal wash sits only behind the text.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  imageFit = "cover",
  imagePosition = "center",
  imageBlend = false,
  tone,
  children,
  className = "",
}: PageHeroProps) {
  const resolvedTone = tone ?? (image ? "dark" : "light");
  const isDark = resolvedTone === "dark";
  const onPhoto = Boolean(image) && isDark;
  const fitClass =
    imageFit === "contain" ? "object-contain" : "object-cover";
  const positionClass =
    imagePosition === "right"
      ? "object-right"
      : imagePosition === "left"
        ? "object-left"
        : "object-center";

  const copy = (
    <div className="max-w-2xl min-w-0 px-0.5 py-0.5">
      <p
        className={`type-eyebrow mb-2 ${
          onPhoto || !image ? "text-white/90" : "text-brand"
        }`}
      >
        {eyebrow}
      </p>
      <h1
        className={`type-h1 text-balance ${
          onPhoto || !image ? "text-white" : "text-ink"
        }`}
      >
        <BrandAccentText
          accentClassName={
            onPhoto || !image ? "text-[#9fe0e6]" : "text-brand"
          }
        >
          {title}
        </BrandAccentText>
      </h1>
      <p
        className={`type-lede mt-3 max-w-xl text-pretty ${
          onPhoto || !image ? "text-white/95" : "text-ink/85"
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
  );

  const nightBg = Boolean(image) && (imageFit === "contain" || imageBlend);

  return (
    <section
      className={`relative flex min-h-[clamp(14rem,38vh,18rem)] flex-col justify-center overflow-hidden sm:min-h-[clamp(16rem,42vh,22rem)] md:min-h-[clamp(18rem,46vh,26rem)] ${nightBg ? "bg-[#1e5f68]" : ""} ${className}`}
    >
      {image ? (
        imageBlend && imagePosition === "right" ? (
          <>
            {/* Right-anchored original — fade only left of Comtanix sign; logo stays full light */}
            <div className="absolute top-0 right-0 z-0 h-full w-auto max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={imageAlt}
                className="h-full w-auto max-w-none"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 10%, rgba(0,0,0,0.75) 22%, #000 34%, #000 100%)",
                  maskImage:
                    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 10%, rgba(0,0,0,0.75) 22%, #000 34%, #000 100%)",
                }}
                fetchPriority="high"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, ${HERO_BLEND} 0%, rgba(${HERO_BLEND_RGB},0.7) 12%, rgba(${HERO_BLEND_RGB},0.25) 24%, transparent 34%)`,
                }}
                aria-hidden
              />
            </div>
          </>
        ) : (
          // Native img — fill + class "absolute" so globals.css height:auto rule cannot collapse it
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={imageAlt}
            className={`absolute inset-0 z-0 h-full w-full ${fitClass} ${positionClass}`}
            fetchPriority="high"
            decoding="async"
          />
        )
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
        {onPhoto ? (
          <TextWash soft={imageBlend}>{copy}</TextWash>
        ) : (
          copy
        )}
      </Container>
    </section>
  );
}
