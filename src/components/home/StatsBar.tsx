"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data/content";
import { Container } from "@/components/ui/Section";

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
    <div className="flex min-w-[46%] flex-1 flex-col items-center justify-center px-2 text-center sm:min-w-0 sm:px-3 md:px-4">
      <div className="type-stat leading-none text-white">
        <span ref={ref}>{display}</span>
        {suffix ? <span className="text-white/95">{suffix}</span> : null}
      </div>
      <p className="type-eyebrow mt-0.5 max-w-[9rem] leading-tight text-white/85 sm:max-w-none">
        {label}
      </p>
    </div>
  );
}

export function StatsBar() {
  return (
    <section
      className="stats-overlap relative z-20 w-full pb-2 md:pb-3"
      aria-label="Company footprint"
    >
      <Container>
        <div className="overflow-hidden rounded-2xl bg-white shadow-overlay ring-1 ring-line md:rounded-3xl">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <div className="flex shrink-0 flex-col items-center justify-center px-5 py-3 text-center sm:px-7 md:px-9 lg:w-[28%] lg:max-w-sm lg:py-3.5 xl:w-[26%] xl:px-10">
              <h2 className="type-h2 text-ink">Comtanix at a glance</h2>
              <p className="type-meta mt-0.5 text-muted">
                Real delivery — real careers
              </p>
            </div>

            <div className="relative flex min-w-0 flex-1 items-center justify-center bg-brand px-3 py-3 sm:px-5 sm:py-3 md:px-6 lg:rounded-tl-[2.25rem] lg:px-8 lg:py-3.5 xl:rounded-tl-[2.75rem]">
              <div className="flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-2 md:flex-nowrap md:justify-evenly md:gap-0">
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
        </div>
      </Container>
    </section>
  );
}
