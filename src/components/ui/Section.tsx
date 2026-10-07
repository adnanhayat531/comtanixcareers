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
          className={`type-eyebrow mb-1.5 ${
            light ? "text-white/65" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`type-h2 ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description ? (
        <p
          className={`type-body mt-2 max-w-prose ${
            light ? "text-white/78" : "text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </HeadingReveal>
  );
}
