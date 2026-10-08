"use client";

import { type ReactNode } from "react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { HeadingReveal } from "@/components/motion/Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full min-w-0 max-w-none px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-[var(--section-y)] md:py-[var(--section-y-lg)] ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  compact?: boolean;
}) {
  return (
    <HeadingReveal
      className={`${compact ? "mb-0" : "mb-8 md:mb-10"} max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      } ${className}`}
      duration={1}
    >
      {eyebrow ? (
        <p
          className={`type-eyebrow mb-2 ${
            light ? "text-white/65" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`type-h2 ${light ? "text-white" : "text-ink"}`}>
        <BrandAccentText
          accentClassName={
            light
              ? "text-white underline decoration-white/50 decoration-2 underline-offset-[0.2em]"
              : "text-brand"
          }
        >
          {title}
        </BrandAccentText>
      </h2>
      {description ? (
        <p
          className={`type-body mt-3 max-w-prose ${
            light ? "text-white/78" : "text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </HeadingReveal>
  );
}
