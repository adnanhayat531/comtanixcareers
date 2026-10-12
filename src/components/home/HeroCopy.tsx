"use client";

import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/** Soft card behind description + CTAs only — not full image */
function SoftShade({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-fit max-w-full rounded-2xl bg-[rgba(5,13,24,0.42)] px-4 py-3.5 shadow-[0_8px_32px_rgba(5,13,24,0.25)] ring-1 ring-white/10 backdrop-blur-md sm:px-5 sm:py-4">
      {children}
    </div>
  );
}

export function HeroCopy() {
  return (
    <Container className="relative z-10 flex w-full min-w-0 flex-col items-start justify-center text-left">
      <div className="relative flex w-full max-w-lg flex-col items-start py-3 sm:max-w-xl sm:py-6 md:max-w-2xl">
        <h1 className="type-h1-hero reveal relative z-10 max-w-none text-left text-white [text-shadow:0_2px_14px_rgba(5,13,24,0.7)]">
          <span className="block whitespace-nowrap">
            Build what&apos;s next with AI,
          </span>
          <span className="block">
            technology, and the right{" "}
            <span className="text-[var(--brand-bright)]">expertise</span>.
          </span>
        </h1>

        <div className="mt-4 sm:mt-5">
        <SoftShade>
          <div className="relative">
            <p className="type-lede reveal-delay-1 relative max-w-md text-pretty text-white/95 sm:max-w-lg">
              Comtanix helps you integrate AI, develop software, modernize IT
              systems, and solve complex technical challenges with teams that work
              around your needs.
            </p>

            <div className="reveal-delay-2 relative z-10 mt-5 flex w-full flex-col items-stretch gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Button href="/about#story" variant="outlineLight" className="w-full sm:w-auto">
                Explore <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/careers" variant="primary" className="w-full sm:w-auto">
                Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </SoftShade>
        </div>
      </div>
    </Container>
  );
}
