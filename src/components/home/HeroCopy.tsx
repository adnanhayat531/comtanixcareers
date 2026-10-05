"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

const HERO_HEADING = "Technology. People. Progress.";

export function HeroCopy() {
  return (
    <Container className="relative z-10 flex min-h-full w-full flex-col items-center justify-center px-4 py-10 text-center sm:px-5 sm:py-12">
      <div className="relative flex w-full max-w-2xl flex-col items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[130%] w-[105%] max-w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.22)_45%,transparent_72%)]"
        />

        <h1 className="relative z-10 font-display text-[clamp(1.45rem,5.5vw,2.75rem)] font-bold tracking-tight text-white leading-[1.2] [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
          {HERO_HEADING}
        </h1>

        <p className="relative z-10 mt-3 max-w-md text-[14px] leading-[1.55] text-white/95 sm:mt-4 sm:max-w-lg sm:text-[15px] md:text-base [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]">
          Comtanix is an IT company helping American businesses move forward
          through technology and talented people.
        </p>

        <div className="relative z-10 mt-5 flex w-full max-w-sm flex-col items-stretch justify-center gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <Button href="/about#story">
            Explore Comtanix <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/careers" variant="outlineLight">
            Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </Container>
  );
}
