"use client";

import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/** Soft black glow behind text only — blurred oval, no hard corners */
function TextGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative mx-auto block w-fit max-w-full ${className}`}>
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[160%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-black/70 blur-2xl"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[120%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-black/55 blur-md"
        aria-hidden
      />
      {children}
    </span>
  );
}

export function HeroCopy() {
  return (
    <Container className="relative z-10 flex w-full min-w-0 flex-col items-center justify-center text-center">
      <div className="relative flex w-full max-w-3xl flex-col items-center px-0 py-3 sm:py-6">
        <h1 className="type-h1-hero reveal relative z-10 max-w-[22rem] text-balance text-center text-white min-[400px]:max-w-none [text-shadow:0_2px_4px_rgba(0,0,0,0.9),0_4px_16px_rgba(0,0,0,0.65)]">
          <TextGlow className="px-1 py-1 sm:px-2">
            Build what&apos;s next with AI, technology, and the right{" "}
            <span className="text-[var(--brand-bright)]">expertise</span>.
          </TextGlow>
        </h1>

        <TextGlow className="mt-3 max-w-[20rem] px-2 py-1.5 min-[400px]:max-w-xl sm:max-w-2xl sm:px-3">
          <p className="type-lede reveal-delay-1 relative text-pretty text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.85),0_3px_12px_rgba(0,0,0,0.55)]">
            Comtanix helps you integrate AI, develop software, modernize IT
            systems, and solve complex technical challenges with teams that work
            around your needs.
          </p>
        </TextGlow>

        <div className="reveal-delay-2 relative z-10 mt-5 flex w-full max-w-xs flex-col items-stretch justify-center gap-2.5 min-[400px]:max-w-sm sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <Button href="/about#story" variant="outlineLight" className="w-full sm:w-auto">
            Explore <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/careers" variant="primary" className="w-full sm:w-auto">
            Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </Container>
  );
}
