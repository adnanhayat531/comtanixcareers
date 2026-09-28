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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduced]);

  return (
    <div className="min-w-0 flex-1 px-2 text-center sm:px-3">
      <div className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.75rem] lg:text-5xl">
        <span ref={ref}>{display}</span>
        {suffix ? <span className="text-brand">{suffix}</span> : null}
      </div>
      <p className="mt-1.5 text-[10px] font-semibold tracking-[0.12em] text-white/90 uppercase sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="relative z-10 bg-white" aria-label="Company footprint">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex shrink-0 flex-col justify-center px-5 py-5 sm:px-8 md:px-10 lg:w-[32%] lg:max-w-md lg:py-0 xl:w-[30%] xl:px-14 2xl:px-16">
          <h2 className="font-display text-[1.5rem] font-extrabold tracking-tight text-ink leading-snug sm:text-[1.65rem] md:text-[1.85rem] lg:text-[2rem]">
            Our footprint
            <span className="mt-0.5 block text-sea">in numbers</span>
          </h2>
        </div>

        <div className="min-w-0 flex-1 bg-gradient-to-r from-deep via-sea to-[#2a7575] py-5 pl-4 pr-0 sm:py-6 md:pl-6 lg:rounded-bl-[3rem] lg:pl-8">
          <div className="flex flex-wrap items-center justify-around gap-y-4 pr-4 sm:pr-6 md:flex-nowrap md:gap-0 md:pr-8 lg:pr-10 xl:pr-14 2xl:pr-16">
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
