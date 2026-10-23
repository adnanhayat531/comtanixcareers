"use client";

import { useEffect, useState } from "react";
import { Award, Briefcase, CalendarDays, Users } from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { STATS } from "@/lib/data/content";

const STAT_ICONS = [CalendarDays, Users, Briefcase, Award] as const;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Floating glass stats ribbon — matches design: purpose + iconed metrics */
export function StatsBar() {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    setProgress(0);
    let raf = 0;
    let cancelled = false;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      setProgress(easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative z-20 w-full min-w-0 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]"
      aria-label="Company footprint"
    >
      <div className="mx-auto w-full min-w-0 max-w-none px-[var(--container-pad-x)]">
        <div className="flex w-full items-stretch overflow-hidden rounded-2xl border border-white/15 bg-[rgba(4,28,34,0.78)] shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl max-sm:flex-col">
          <div className="flex w-full shrink-0 flex-col items-start justify-center border-white/12 px-4 py-3.5 max-sm:border-b sm:w-[12rem] sm:border-r sm:px-5 sm:py-4 md:w-[14.5rem] md:px-6 md:py-5">
            <p className="text-[0.88rem] font-semibold leading-snug text-ink sm:text-[1.05rem]">
              <BrandAccentText accentClassName="text-brand">
                Growing with purpose.
              </BrandAccentText>
            </p>
            <p className="mt-0.5 text-[0.7rem] leading-snug text-white/60 sm:text-[0.78rem]">
              Delivering with impact.
            </p>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 divide-x divide-y divide-white/12 sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((s, i) => {
              const Icon = STAT_ICONS[i] ?? Award;
              const display = Math.round(s.value * progress);
              return (
                <div
                  key={s.label}
                  className="flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-3 text-center sm:gap-1.5 sm:px-3 sm:py-4 md:py-5"
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-brand sm:h-4 sm:w-4"
                    aria-hidden
                  />
                  <div className="font-display text-[1.25rem] leading-none font-bold tracking-tight tabular-nums text-ink sm:text-[1.65rem] md:text-[1.85rem] lg:text-[2rem]">
                    <span>{display}</span>
                    {s.suffix ? (
                      <span className="text-brand">{s.suffix}</span>
                    ) : null}
                  </div>
                  <p className="max-w-[9rem] text-[0.55rem] font-semibold leading-tight tracking-[0.08em] text-white/65 uppercase sm:text-[0.64rem]">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
