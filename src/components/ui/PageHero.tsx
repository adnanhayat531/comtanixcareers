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
  /** Prefer light text on photo heroes. Default when image is set. */
  tone?: "dark" | "light";
  children?: ReactNode;
  className?: string;
};

/** Soft brand wash behind copy only — no hard corners, image stays clear */
function TextWash({ children }: { children: ReactNode }) {
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
  tone,
  children,
  className = "",
}: PageHeroProps) {
  const resolvedTone = tone ?? (image ? "dark" : "light");
  const isDark = resolvedTone === "dark";
  const onPhoto = Boolean(image) && isDark;

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

  return (
    <section
      className={`relative flex min-h-[clamp(14rem,38vh,18rem)] flex-col justify-center overflow-hidden sm:min-h-[clamp(16rem,42vh,22rem)] md:min-h-[clamp(18rem,46vh,26rem)] ${className}`}
    >
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
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
        {onPhoto ? <TextWash>{copy}</TextWash> : copy}
      </Container>
    </section>
  );
}
