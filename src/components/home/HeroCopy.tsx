"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { FadeUp, WordFadeUp } from "@/components/motion/Reveal";

const HERO_HEADING = "Build your career on a team that works with the US.";
const WORD_STAGGER = 0.12;
const WORD_COUNT = HERO_HEADING.trim().split(/\s+/).length;
/** Paragraph starts after last word begins + 0.2s */
const PARA_DELAY = (WORD_COUNT - 1) * WORD_STAGGER + 0.2;
/** Buttons start shortly after paragraph */
const BTN_DELAY = PARA_DELAY + 0.15;

export function HeroCopy() {
  return (
    <Container className="relative z-10 flex flex-col items-center px-4 pb-5 pt-8 text-center sm:px-5 sm:pb-7 sm:pt-14 md:pt-20 lg:pt-24">
      <WordFadeUp
        text={HERO_HEADING}
        stagger={WORD_STAGGER}
        className="max-w-3xl font-display text-[clamp(1.55rem,6.8vw,3.5rem)] font-extrabold tracking-tight text-white text-balance leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
      />

      <FadeUp delay={PARA_DELAY} duration={0.7} className="mt-4 max-w-xl sm:mt-5">
        <p className="text-[15px] leading-[1.65] text-white sm:text-base md:text-lg">
          Join an agile international workforce delivering enterprise software
          engineering and IT infrastructure to leading US enterprises.
        </p>
      </FadeUp>

      <FadeUp
        delay={BTN_DELAY}
        duration={0.7}
        className="mt-6 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
      >
        <Button href="/about#story">
          Who We Are <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/apply" variant="outlineLight">
          Apply Now <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </FadeUp>
    </Container>
  );
}
