"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroCopy() {
  return (
    <div className="relative flex w-full min-w-0 max-w-2xl flex-col items-center text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(8, 24, 32, 0.55) 0%, rgba(8, 24, 32, 0.28) 42%, transparent 72%)",
        }}
        aria-hidden
      />
      <h1 className="type-h1-hero reveal relative z-10 w-full px-0.5 text-balance text-center text-white [text-shadow:0_1px_2px_rgba(5,13,24,0.45),0_4px_24px_rgba(5,13,24,0.35)]">
        <span className="block">Build what&apos;s next with AI,</span>
        <span className="block">technology, and the right</span>
        <span className="block text-[var(--brand-bright)]">expertise.</span>
      </h1>

      <p className="reveal-delay-1 type-lede relative z-10 mx-auto mt-4 w-full max-w-xl px-0.5 text-pretty !text-white [text-shadow:0_1px_2px_rgba(5,13,24,0.4),0_3px_18px_rgba(5,13,24,0.3)] sm:mt-6">
        Comtanix helps you integrate AI, develop software, modernize IT systems,
        and solve complex technical challenges with teams that work around your
        needs.
      </p>

      <div className="reveal-delay-2 relative z-10 mt-4 flex w-full max-w-md flex-col items-stretch justify-center gap-2.5 min-[400px]:max-w-lg min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center sm:mt-6 sm:gap-3">
        <Button href="/about#story" variant="outlineLight" className="w-full min-[400px]:w-auto">
          Explore <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/careers" variant="primary" className="w-full min-[400px]:w-auto">
          Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
