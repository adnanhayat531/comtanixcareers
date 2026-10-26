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
  /** object-position for the photo. `faces` keeps heads in frame while filling. */
  imagePosition?: "center" | "right" | "left" | "faces";
  /** Optional CSS object-position override (e.g. "center 55%"). */
  objectPosition?: string;
  /** Soft left→right fade so letterbox edge blends into the hero (no hard cut). */
  imageBlend?: boolean;
  /**
   * With contain: fill side gaps with a blurred cover of the same photo
   * so width looks full without zooming the sharp image.
   */
  fillLetterbox?: boolean;
  /** Prefer light text on photo heroes. Default when image is set. */
  tone?: "dark" | "light";
  children?: ReactNode;
  className?: string;
};

/** Dark cyan wash for blended photo heroes */
const HERO_BLEND = "#071518";
const HERO_BLEND_RGB = "7,21,24";

/** Single soft wash behind copy — one layer only (no double transparent). */
function TextWash({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-fit max-w-full">
      <div
        className="pointer-events-none absolute -inset-y-8 -left-8 -right-4 -z-10 sm:-inset-y-10 sm:-left-12 sm:-right-8"
        style={{
          background: `radial-gradient(120% 100% at 0% 50%, ${HERO_BLEND}cc 0%, ${HERO_BLEND}88 36%, ${HERO_BLEND}33 62%, transparent 82%)`,
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
  objectPosition,
  imageBlend = false,
  fillLetterbox = false,
  tone,
  children,
  className = "",
}: PageHeroProps) {
  const resolvedTone = tone ?? (image ? "dark" : "light");
  const isDark = resolvedTone === "dark";
  const onPhoto = Boolean(image) && isDark;
  const fitClass =
    imageFit === "contain" ? "object-contain" : "object-cover";
  const resolvedObjectPosition =
    objectPosition ??
    (imagePosition === "faces"
      ? "center 22%"
      : imagePosition === "right"
        ? "right 22%"
        : imagePosition === "left"
          ? "left 22%"
          : "center 22%");
  const positionClass =
    objectPosition || imagePosition === "faces"
      ? ""
      : imagePosition === "right"
        ? "object-right"
        : imagePosition === "left"
          ? "object-left"
          : "object-center";
  /** Mobile centers faces; sm+ uses the page-specific focal point. */
  const imgStyle = {
    ["--hero-pos" as string]: resolvedObjectPosition,
  };

  const copy = (
    <div className="max-w-2xl min-w-0 px-0.5 py-0.5">
      <p
        className={`type-eyebrow mb-1.5 sm:mb-2 ${
          onPhoto || !image ? "text-white/90" : "text-brand"
        }`}
      >
        {eyebrow}
      </p>
      <h1
        className={`type-h1 text-pretty text-balance ${
          onPhoto || !image
            ? "text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]"
            : "text-ink"
        }`}
      >
        <BrandAccentText
          accentClassName={
            onPhoto || !image
              ? "inline-block text-brand-bright [text-shadow:0_2px_16px_rgba(0,0,0,0.9),0_0_2px_rgba(0,0,0,1)]"
              : "text-brand"
          }
        >
          {title}
        </BrandAccentText>
      </h1>
      <p
        className={`type-lede mt-2 max-w-xl text-pretty sm:mt-3 line-clamp-3 sm:line-clamp-none ${
          onPhoto || !image ? "text-white/95" : "text-ink/85"
        }`}
      >
        {description}
      </p>
      {children ? (
        <div className="mt-3.5 flex w-full max-w-sm flex-col gap-2 min-[420px]:max-w-none min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-5 sm:gap-3 [&_a]:w-full min-[420px]:[&_a]:w-auto">
          {children}
        </div>
      ) : null}
    </div>
  );

  const nightBg = Boolean(image) && (imageFit === "contain" || imageBlend);

  return (
    <section
      className={`relative flex w-full min-w-0 flex-col justify-center overflow-hidden min-h-[clamp(13.5rem,42svh,22rem)] sm:min-h-[clamp(15rem,44svh,24rem)] md:min-h-[clamp(16rem,46svh,26rem)] ${nightBg ? "site-petrol-gradient" : "bg-canvas"} ${className}`}
    >
      {image ? (
        imageBlend && imagePosition === "right" ? (
          <>
            {/* Right-anchored original — fade only left of Comtanix sign; logo stays full light */}
            <div className="absolute inset-y-0 right-0 z-0 h-full w-[min(100%,52rem)] max-w-full sm:w-auto sm:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={imageAlt}
                className="h-full w-full object-cover object-right sm:w-auto sm:max-w-none sm:object-contain"
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
                  background: `linear-gradient(90deg, rgba(${HERO_BLEND_RGB},0.72) 0%, rgba(${HERO_BLEND_RGB},0.42) 14%, rgba(${HERO_BLEND_RGB},0.16) 28%, transparent 42%)`,
                }}
                aria-hidden
              />
            </div>
          </>
        ) : (
          <>
            {fillLetterbox && imageFit === "contain" ? (
              // Soft side fill — full width look without zooming the sharp photo
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt=""
                aria-hidden
                className="absolute inset-0 z-0 h-full w-full scale-110 object-cover opacity-80 blur-2xl"
                fetchPriority="high"
                decoding="async"
              />
            ) : null}
            {/* Native img — fill + class "absolute" so globals.css height:auto rule cannot collapse it */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              className={`absolute inset-0 z-[1] h-full w-full ${fitClass} ${positionClass} [object-position:var(--hero-pos,center_42%)] max-sm:[object-position:center_28%] sm:[object-position:var(--hero-pos)]`}
              style={imgStyle}
              fetchPriority="high"
              decoding="async"
            />
          </>
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

      <Container className="relative z-10 py-5 sm:py-7 md:py-10 lg:py-12">
        {onPhoto ? <TextWash>{copy}</TextWash> : copy}
      </Container>
    </section>
  );
}
