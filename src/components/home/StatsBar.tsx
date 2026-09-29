"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data/content";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const reduced = usePrefersReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduced) {
        setDisplay(value);
        return;
      }
      const t0 = performance.now();
      const dur = 1200;
      const frame = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        setDisplay(Math.round(value * k));
        if (k < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduced]);

  return (
    <div className="flex min-w-[46%] flex-1 flex-col items-center justify-center px-1.5 text-center sm:min-w-0 sm:px-3">
      <div className="font-display text-lg font-extrabold leading-none tracking-tight text-white sm:text-2xl md:text-3xl lg:text-[2.25rem]">
        <span ref={ref}>{display}</span>
        {suffix ? <span className="text-white/95">{suffix}</span> : null}
      </div>
      <p className="mt-1 max-w-[9rem] text-[10px] font-semibold leading-tight tracking-wide text-white/90 uppercase sm:mt-1.5 sm:max-w-none sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export function StatsBar() {
  return (
    <section
      className="relative z-10 w-full bg-white/95 backdrop-blur-sm"
      aria-label="Company footprint"
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="flex shrink-0 flex-col items-center justify-center px-5 py-2 text-center sm:px-8 md:px-10 lg:w-[28%] lg:max-w-sm lg:items-start lg:py-2.5 lg:text-left xl:w-[26%] xl:px-12">
          <h2 className="font-display text-base font-extrabold tracking-tight text-ink leading-snug sm:text-lg md:text-xl">
            Our footprint
            <span className="mt-0.5 block text-brand">in numbers</span>
          </h2>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center bg-brand px-3 py-2 sm:px-5 sm:py-2.5 md:px-8 lg:rounded-bl-[2.5rem] lg:px-10">
          <div className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-3 md:flex-nowrap md:gap-0">
            {STATS.map((s) => (
              <StatItem
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
