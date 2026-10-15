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
  /** Soft left→right fade so letterbox edge blends into the hero (no hard cut). */
  imageBlend?: boolean;
  /** Prefer light text on photo heroes. Default when image is set. */
  tone?: "dark" | "light";
  children?: ReactNode;
  className?: string;
};

/** Dark cyan wash for blended photo heroes */
const HERO_BLEND = "#071518";
const HERO_BLEND_RGB = "7,21,24";

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
            background: `radial-gradient(125% 110% at 0% 50%, ${HERO_BLEND}aa 0%, ${HERO_BLEND}66 42%, ${HERO_BLEND}28 68%, transparent 85%)`,
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
            "radial-gradient(115% 95% at 8% 50%, rgba(5, 16, 20, 0.94) 0%, rgba(8, 40, 48, 0.7) 38%, rgba(45, 212, 224, 0.22) 62%, transparent 78%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-y-3 -left-3 right-8 -z-10 sm:-left-5"
        style={{
          background:
            "linear-gradient(90deg, rgba(5, 16, 20, 0.65) 0%, rgba(5, 16, 20, 0.28) 55%, transparent 100%)",
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
        : imagePosition === "faces"
          ? "object-[center_30%]"
          : "object-center";
  const imgStyle =
    imagePosition === "faces"
      ? ({ objectPosition: "center 30%" } as const)
      : undefined;

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
        className={`type-lede mt-3 max-w-xl text-pretty ${
          onPhoto || !image ? "text-white/95" : "text-ink/85"
        }`}
      >
        {description}
      </p>
      {children ? (
        <div className="mt-5 flex w-full max-w-sm flex-col gap-2.5 min-[420px]:max-w-none min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-6 sm:gap-3 [&_a]:w-full min-[420px]:[&_a]:w-auto">
          {children}
        </div>
      ) : null}
    </div>
  );

  const nightBg = Boolean(image) && (imageFit === "contain" || imageBlend);

  return (
    <section
      className={`relative flex min-h-[clamp(16rem,42svh,22rem)] flex-col justify-center overflow-hidden sm:min-h-[clamp(17rem,44svh,24rem)] md:min-h-[clamp(18rem,46svh,26rem)] ${nightBg ? "bg-[#071518]" : "bg-canvas"} ${className}`}
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
          // Native img — fill + class "absolute" so globals.css height:auto rule cannot collapse it
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={imageAlt}
            className={`absolute inset-0 z-0 h-full w-full ${fitClass} ${positionClass}`}
            style={imgStyle}
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

      <Container className="relative z-10 py-8 sm:py-12 md:py-14 lg:py-16">
        {onPhoto ? (
          <TextWash soft={imageBlend}>{copy}</TextWash>
        ) : (
          copy
        )}
      </Container>
    </section>
  );
}
