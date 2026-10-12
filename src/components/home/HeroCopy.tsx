"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroCopy() {
  return (
    <div className="flex w-full min-w-0 max-w-xl flex-col items-start text-left lg:max-w-2xl">
      <h1 className="type-h1-hero reveal relative z-10 w-full text-left text-white [text-shadow:0_2px_16px_rgba(5,13,24,0.75)]">
        <span className="block whitespace-nowrap">
          Build what&apos;s next with AI,
        </span>
        <span className="block whitespace-nowrap">
          technology, and the right
        </span>
        <span className="block text-[var(--brand-bright)]">expertise.</span>
      </h1>

      <div className="reveal-delay-1 relative mt-5 w-full max-w-lg rounded-2xl bg-black/45 px-4 py-3.5 ring-1 ring-white/15 backdrop-blur-sm sm:mt-6 sm:px-5 sm:py-4">
        <p className="type-lede relative text-pretty !text-white">
          Comtanix helps you integrate AI, develop software, modernize IT
          systems, and solve complex technical challenges with teams that work
          around your needs.
        </p>

        <div className="reveal-delay-2 relative z-10 mt-5 flex w-full flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <Button href="/about#story" variant="outlineLight" className="w-full sm:w-auto">
            Explore <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/careers" variant="primary" className="w-full sm:w-auto">
            Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
}
