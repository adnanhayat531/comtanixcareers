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
      className={`mx-auto w-full min-w-0 max-w-none px-[var(--container-pad-x)] ${className}`}
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
      className={`min-w-0 overflow-x-clip py-[var(--section-y)] md:py-[var(--section-y-lg)] ${className}`}
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
      className={`${compact ? "mb-0" : "mb-6 md:mb-8"} max-w-2xl ${
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
          className={`type-body mt-2.5 max-w-prose ${
            light ? "text-white/78" : "text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </HeadingReveal>
  );
}
