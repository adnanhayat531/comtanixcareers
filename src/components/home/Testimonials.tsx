"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";

function QuoteCard({
  initials,
  name,
  role,
  quote,
}: {
  initials: string;
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <article className="flex w-[min(100%,300px)] shrink-0 snap-start flex-col sm:w-[320px]">
      {/* Speech bubble */}
      <div className="relative rounded-md border border-line bg-white px-5 py-5">
        <q className="block text-[15px] leading-relaxed text-ink/90 [quotes:none]">
          {quote}
        </q>
        <div className="mt-4 flex gap-0.5" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-brand text-brand"
              aria-hidden
            />
          ))}
        </div>
        <span
          className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 border-r border-b border-line bg-white"
          aria-hidden
        />
      </div>

      <div className="mt-5 flex items-center gap-3 pl-2">
        <div
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand font-display text-sm font-semibold text-white"
          aria-hidden
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-ink">{name}</p>
          <p className="text-xs text-muted">{role}</p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollBy = (dir: number) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollBy({
      left: dir * 340,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const progress =
    atStart && atEnd ? 100 : atEnd ? 100 : atStart ? 28 : 55;

  return (
    <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:items-stretch lg:gap-12 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      {/* Left — heading + nav */}
      <div className="flex flex-col">
        <span
          className="font-display text-6xl leading-none text-brand/30 select-none md:text-7xl"
          aria-hidden
        >
          “
        </span>
        <h2 className="mt-2 max-w-[16ch] font-display text-xl font-bold tracking-tight text-ink md:text-2xl lg:text-[1.65rem] lg:leading-snug">
          Team feedback
        </h2>

        <div className="mt-auto flex items-center gap-3 pt-6 lg:pt-8">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Previous stories"
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition disabled:text-muted/40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="h-0.5 flex-1 max-w-[120px] overflow-hidden rounded-sm bg-line">
            <div
              className="h-full rounded-sm bg-brand transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Next stories"
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition disabled:text-muted/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Right — cards */}
      <div
        ref={ref}
        tabIndex={0}
        aria-label="Team stories"
        className="no-scrollbar -mx-1 flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 outline-none sm:gap-6"
      >
        {TESTIMONIALS.map((t) => (
          <QuoteCard key={t.name} {...t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <QuoteCard key={t.name} {...t} />
      ))}
    </div>
  );
}
