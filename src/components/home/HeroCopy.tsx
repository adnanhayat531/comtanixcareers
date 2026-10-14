"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroCopy() {
  return (
    <div className="relative flex w-full min-w-0 max-w-2xl flex-col items-center text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[135%] w-[130%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 78% 72% at 50% 48%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.58) 36%, rgba(255,255,255,0.28) 58%, rgba(255,255,255,0.08) 74%, transparent 86%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="type-h1-hero reveal w-full px-0.5 text-balance text-center text-ink [text-shadow:0_1px_12px_rgba(255,255,255,0.55)]">
          <span className="block">Build what&apos;s next with AI,</span>
          <span className="block">technology, and the right</span>
          <span className="block text-brand">expertise.</span>
        </h1>

        <p className="reveal-delay-1 type-lede mx-auto mt-4 w-full max-w-xl px-0.5 text-pretty text-ink/75 sm:mt-5">
          Comtanix helps you integrate AI, develop software, modernize IT systems,
          and solve complex technical challenges with teams that work around your
          needs.
        </p>

        <div className="reveal-delay-2 mt-4 flex w-full max-w-md flex-col items-stretch justify-center gap-2.5 min-[400px]:mx-auto min-[400px]:max-w-lg min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center sm:mt-6 sm:gap-3">
          <Button href="/about#story" variant="secondary" className="w-full min-[400px]:w-auto">
            Explore <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/careers" variant="primary" className="w-full min-[400px]:w-auto">
            Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
}
