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
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 ${className}`}
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
    <section id={id} className={`py-8 md:py-11 lg:py-12 ${className}`}>
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
      className={`${compact ? "mb-0" : "mb-5 md:mb-6"} max-w-xl ${
        align === "center" ? "mx-auto text-center" : ""
      } ${className}`}
      duration={1}
    >
      {eyebrow ? (
        <p
          className={`mb-1.5 font-body text-[11px] font-semibold tracking-[0.08em] uppercase ${
            light ? "text-white/65" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-[clamp(1.4rem,3.2vw,2.15rem)] font-bold tracking-tight leading-[1.25] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-2 max-w-prose text-[15px] leading-[1.55] md:text-base ${
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
