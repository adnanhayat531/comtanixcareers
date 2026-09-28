"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { FadeUp, WordFadeUp } from "@/components/motion/Reveal";
import { SITE } from "@/lib/config";

const HERO_HEADING = "Build your career on a team that works with the US.";
const WORD_STAGGER = 0.12;
const WORD_COUNT = HERO_HEADING.trim().split(/\s+/).length;
/** Brand lands first; heading words start after a short beat */
const HEADING_DELAY = 0.15;
/** Paragraph starts after last word begins + 0.2s */
const PARA_DELAY = HEADING_DELAY + (WORD_COUNT - 1) * WORD_STAGGER + 0.2;
/** Buttons start shortly after paragraph */
const BTN_DELAY = PARA_DELAY + 0.15;

export function HeroCopy() {
  return (
    <Container className="relative z-10 flex flex-col items-center pb-14 pt-28 text-center md:pb-16 md:pt-32 lg:pb-20 lg:pt-36">
      <FadeUp delay={0} duration={0.7}>
        <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
          {SITE.name}
        </h1>
      </FadeUp>

      <WordFadeUp
        as="p"
        text={HERO_HEADING}
        stagger={WORD_STAGGER}
        delay={HEADING_DELAY}
        className="mt-4 max-w-3xl font-display text-[clamp(1.35rem,2.8vw,2rem)] font-semibold tracking-tight text-white/95 text-balance leading-[1.25] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
      />

      <FadeUp delay={PARA_DELAY} duration={0.7} className="mt-5 max-w-xl">
        <p className="text-base leading-[1.7] text-white md:text-lg">
          Join {SITE.name} — an agile international workforce delivering enterprise
          software engineering and IT infrastructure to leading US enterprises.
        </p>
      </FadeUp>

      <FadeUp
        delay={BTN_DELAY}
        duration={0.7}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
