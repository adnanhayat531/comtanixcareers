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
    <div className="flex min-w-0 flex-col items-center justify-center px-1 text-center sm:px-2">
      <div className="type-stat leading-none text-white">
        <span ref={ref}>{display}</span>
        {suffix ? <span className="text-white/95">{suffix}</span> : null}
      </div>
      <p className="type-eyebrow mt-1 max-w-[7.5rem] leading-tight text-white/85 sm:max-w-[9rem] xl:max-w-none">
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
            <div className="flex shrink-0 flex-col items-center justify-center px-4 py-2.5 text-center sm:px-6 sm:py-3 xl:w-[26%] xl:max-w-xs xl:items-center xl:px-8 xl:py-3">
              <h2 className="font-display text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl">
                Comtanix at a glance
              </h2>
              <p className="type-meta mt-0.5 text-muted">
                Real delivery — real careers
              </p>
            </div>

            <div className="relative flex min-w-0 flex-1 items-center justify-center bg-brand px-3 py-2.5 sm:px-5 sm:py-3 xl:rounded-tl-[2rem] xl:px-6 xl:py-3">
              <div className="grid w-full grid-cols-2 place-items-center gap-x-2 gap-y-2.5 sm:grid-cols-4 sm:gap-y-0">
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
