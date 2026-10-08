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
    <div className="flex min-w-0 flex-col items-center justify-center px-1.5 text-center sm:px-2">
      <div className="font-display text-[1.75rem] font-bold leading-none tracking-tight text-white sm:text-[2.15rem] md:text-[2.5rem]">
        <span ref={ref}>{display}</span>
        {suffix ? <span className="text-white/95">{suffix}</span> : null}
      </div>
      <p className="mt-2 max-w-[8.5rem] text-[11px] font-semibold tracking-[0.06em] text-white/95 uppercase sm:max-w-[10rem] sm:text-xs md:text-[13px]">
        {label}
      </p>
    </div>
  );
}

export function StatsBar() {
  return (
    <section
      className="stats-overlap relative z-20 w-full min-w-0"
      aria-label="Company footprint"
    >
      <Container>
        <div className="overflow-hidden rounded-xl bg-white shadow-overlay ring-1 ring-line sm:rounded-2xl">
          <div className="flex flex-col xl:flex-row xl:items-stretch">
            <div className="flex shrink-0 flex-col items-center justify-center px-4 py-4 text-center sm:px-6 sm:py-5 xl:w-[26%] xl:max-w-xs xl:items-center xl:px-8 xl:py-5">
              <h2 className="font-display text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl">
                Growing with purpose.
              </h2>
              <p className="type-meta mt-1 text-muted">
                Delivering with impact.
              </p>
            </div>

            <div className="relative flex min-w-0 flex-1 items-center justify-center bg-brand px-3 py-4 sm:px-5 sm:py-5 xl:rounded-tl-[2rem] xl:px-6 xl:py-5">
              <div className="grid w-full grid-cols-2 place-items-center gap-x-3 gap-y-4 sm:grid-cols-4 sm:gap-y-0">
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
