"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export function HeroCopy() {
  return (
    <Container className="relative z-10 flex w-full flex-col items-center justify-center px-1 text-center sm:px-2">
      <div className="relative flex w-full max-w-5xl flex-col items-center px-4 py-8 sm:px-8 sm:py-10">
        {/* Soft blackish wash behind copy — fades out, no hard corners */}
        <div
          className="pointer-events-none absolute -inset-[20%] -z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.48)_40%,rgba(0,0,0,0.18)_62%,transparent_76%)]"
          aria-hidden
        />

        <h1 className="type-h1-hero reveal relative z-10 text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
          <span className="block whitespace-nowrap">
            Build what’s next with AI, technology,
          </span>
          <span className="block whitespace-nowrap">
            and the right <span className="text-brand">expertise</span>.
          </span>
        </h1>

        <p className="type-lede reveal-delay-1 relative z-10 mt-4 max-w-xl text-pretty text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] sm:max-w-2xl">
          We help businesses harness AI, modernize technology, solve complex
          challenges, and move forward with highly capable technical teams.
        </p>

        <div className="reveal-delay-2 relative z-10 mt-6 flex w-full max-w-sm flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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
