"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroCopy() {
  return (
    <div className="relative flex w-full min-w-0 max-w-2xl flex-col items-start text-left">
      <p className="reveal type-eyebrow mb-3 text-cyan-200/90">
        Your technology partner
      </p>

      <h1 className="type-h1-hero reveal relative z-10 w-full text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
        <span className="block">Build what&apos;s next with</span>
        <span className="block">
          <span className="text-cyan-300">AI</span>
          <span>, </span>
          <span className="text-cyan-300">technology</span>
          <span>, and the right</span>
        </span>
        <span className="block text-cyan-300">expertise.</span>
      </h1>

      <p className="reveal-delay-1 type-lede relative z-10 mt-4 w-full max-w-xl text-pretty text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)] sm:mt-5">
        Comtanix helps you integrate AI, develop software, modernize IT systems,
        and solve complex technical challenges with teams that work around your
        needs.
      </p>

      <div className="reveal-delay-2 relative z-10 mt-5 flex w-full max-w-md flex-col items-stretch gap-2.5 min-[400px]:max-w-none min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center sm:mt-7 sm:gap-3">
        <Button
          href="/about#story"
          variant="primary"
          className="w-full border-0 bg-cyan-400 text-ink shadow-[0_0_28px_-6px_rgba(34,211,238,0.75)] hover:bg-cyan-300 hover:brightness-100 min-[400px]:w-auto"
        >
          Explore <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button
          href="/careers"
          variant="outlineLight"
          className="w-full border-white/55 bg-white/5 backdrop-blur-sm min-[400px]:w-auto"
        >
          Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
