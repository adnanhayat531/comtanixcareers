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
    <article className="flex w-[min(100%,300px)] shrink-0 flex-col sm:w-[320px]">
      {/* Speech bubble */}
      <div className="relative rounded-2xl bg-white px-6 py-6 shadow-soft">
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
        {/* Bubble tail */}
        <span
          className="absolute -bottom-2.5 left-8 h-5 w-5 rotate-45 bg-white shadow-soft"
          aria-hidden
        />
      </div>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3 pl-2">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand font-display text-sm font-bold text-white shadow-brand"
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
    <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-stretch lg:gap-12 xl:grid-cols-[minmax(0,320px)_1fr]">
      {/* Left — heading + nav */}
      <div className="flex flex-col">
        <span
          className="font-display text-6xl leading-none text-brand/30 select-none md:text-7xl"
          aria-hidden
        >
          “
        </span>
        <h2 className="mt-2 max-w-[14ch] font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2rem] lg:leading-tight">
          What our team is saying
        </h2>

        <div className="mt-auto flex items-center gap-3 pt-8 lg:pt-12">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Previous stories"
            className="grid h-9 w-9 place-items-center text-ink transition disabled:text-muted/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="h-0.5 flex-1 max-w-[120px] overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-brand transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Next stories"
            className="grid h-9 w-9 place-items-center text-ink transition disabled:text-muted/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Right — cards */}
      <div
        ref={ref}
        tabIndex={0}
        aria-label="Team stories"
        className="no-scrollbar flex gap-6 overflow-x-auto pb-2 outline-none"
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
