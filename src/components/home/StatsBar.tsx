"use client";

import { useEffect, useState } from "react";
import { Award, Briefcase, CalendarDays, Users } from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { STATS } from "@/lib/data/content";

const STAT_ICONS = [CalendarDays, Users, Briefcase, Award] as const;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/**
 * Floating glass stats ribbon.
 * Mobile/tablet: purpose on top + 2×2 stats.
 * md+: single horizontal row (purpose + 4 metrics).
 */
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
      className="relative z-20 w-full min-w-0 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:pb-[max(1rem,env(safe-area-inset-bottom,0px))] md:pb-[max(1.15rem,env(safe-area-inset-bottom,0px))]"
      aria-label="Company footprint"
    >
      <div className="mx-auto w-full min-w-0 max-w-none px-[var(--container-pad-x)]">
        <div className="flex w-full min-w-0 items-stretch overflow-hidden rounded-xl border border-white/15 bg-[rgba(4,28,34,0.78)] shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl max-md:flex-col md:rounded-2xl">
          <div className="flex w-full shrink-0 flex-col items-start justify-center border-white/12 px-3.5 py-2.5 max-md:border-b md:w-[min(13rem,22%)] md:border-r md:px-5 md:py-3 lg:w-[14.5rem] lg:px-6 lg:py-3.5">
            <p className="text-[0.8rem] font-semibold leading-snug text-ink md:text-[0.9rem] lg:text-[0.95rem]">
              <BrandAccentText accentClassName="text-brand">
                Growing with purpose.
              </BrandAccentText>
            </p>
            <p className="mt-0.5 text-[0.65rem] leading-snug text-white/60 md:text-[0.7rem]">
              Delivering with impact.
            </p>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 divide-x divide-y divide-white/12 md:grid-cols-4 md:divide-y-0">
            {STATS.map((s, i) => {
              const Icon = STAT_ICONS[i] ?? Award;
              const display = Math.round(s.value * progress);
              return (
                <div
                  key={s.label}
                  className="flex min-w-0 flex-col items-center justify-center gap-0.5 px-2 py-2.5 text-center md:gap-1 md:px-2.5 md:py-3 lg:px-3"
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-brand md:h-3.5 md:w-3.5"
                    aria-hidden
                  />
                  <div className="font-display text-[1.2rem] leading-none font-bold tracking-tight tabular-nums text-ink sm:text-[1.35rem] md:text-[1.45rem] lg:text-[1.7rem]">
                    <span>{display}</span>
                    {s.suffix ? (
                      <span className="text-brand">{s.suffix}</span>
                    ) : null}
                  </div>
                  <p className="w-full max-w-[9rem] px-0.5 text-[0.52rem] font-semibold leading-tight tracking-[0.06em] text-balance text-white/65 uppercase sm:text-[0.55rem] md:text-[0.56rem] lg:text-[0.58rem]">
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
