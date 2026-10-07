"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { SITE } from "@/lib/config";

const HERO_HEADING = "Technology. People. Progress.";

export function HeroCopy() {
  return (
    <Container className="relative z-10 flex min-h-full w-full flex-col items-center justify-center px-1 py-10 text-center sm:px-2 sm:py-16 md:py-20">
      <div className="relative flex w-full max-w-3xl flex-col items-center px-1">
        <p className="type-eyebrow reveal text-white/75">{SITE.name}</p>

        <h1 className="type-h1-hero reveal-delay-1 relative z-10 mt-3 text-balance text-white sm:mt-4">
          {HERO_HEADING}
        </h1>

        <p className="type-lede reveal-delay-2 relative z-10 mt-4 max-w-xl text-pretty text-white/92 sm:mt-6 sm:max-w-2xl">
          Comtanix is an IT company helping businesses worldwide move forward
          through technology and talented people.
        </p>

        <div className="reveal-delay-3 relative z-10 mt-6 flex w-full max-w-sm flex-col items-stretch justify-center gap-2.5 sm:mt-9 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button href="/about#story" variant="outlineLight" className="w-full sm:w-auto">
            Explore Comtanix <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/careers" variant="primary" className="w-full sm:w-auto">
            Build Your Career <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </Container>
  );
}
