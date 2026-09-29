"use client";

import { type ReactNode } from "react";
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
      className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 ${className}`}
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
    <section id={id} className={`py-10 md:py-14 lg:py-16 ${className}`}>
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
          className={`mb-2.5 font-body text-[11px] font-semibold tracking-[0.12em] uppercase md:text-xs ${
            light ? "text-white/65" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-[clamp(1.5rem,5.5vw,2.75rem)] font-extrabold tracking-tight text-balance leading-[1.2] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 max-w-prose text-base leading-[1.7] md:text-[17px] ${
            light ? "text-white/78" : "text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </HeadingReveal>
  );
}

/** Page intro band for inner routes */
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-surface pt-8 pb-7 md:pt-12 md:pb-10">
      <Container className="min-w-0">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          compact
          className="mb-0"
        />
        {children}
      </Container>
    </div>
  );
}
