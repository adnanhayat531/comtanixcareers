"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  Briefcase,
  CalendarDays,
  Users,
} from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { STATS } from "@/lib/data/content";

const STAT_ICONS = [CalendarDays, Users, Briefcase, Award] as const;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Counts 0 Ã¢ÂÂ target whenever `playId` changes (and playId > 0). */
function useCountUp(target: number, playId: number, durationMs = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (playId <= 0) {
      setValue(0);
      return;
    }

    let frame = 0;
    const start = performance.now();
    setValue(0);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(easeOutCubic(t) * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playId, target, durationMs]);

  return value;
}

function StatItem({
  value,
  suffix,
  label,
  icon: Icon,
  playId,
  onHoverReplay,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: (typeof STAT_ICONS)[number];
  playId: number;
  onHoverReplay: () => void;
}) {
  const display = useCountUp(value, playId);

  return (
    <div
      className="group/stat flex min-w-0 cursor-default flex-col items-center gap-0 py-0 text-center leading-none transition-transform duration-300 ease-out hover:-translate-y-0.5"
      onMouseEnter={onHoverReplay}
    >
      <span className="mb-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[0.2rem] bg-[var(--icon-bg)] transition-transform duration-300 group-hover/stat:scale-110">
        <Icon className="h-2.5 w-2.5 text-brand" aria-hidden />
      </span>
      <div className="text-xl font-bold leading-none tracking-tight text-ink tabular-nums transition-colors duration-300 group-hover/stat:text-brand sm:text-2xl">
        <span>{display}</span>
        {suffix ? <span className="text-brand">{suffix}</span> : null}
      </div>
      <p className="mt-0.5 max-w-[9rem] text-[9px] !leading-tight font-semibold break-words uppercase tracking-[0.04em] text-muted">
        {label}
      </p>
    </div>
  );
}

export function StatsBar() {
  const rootRef = useRef<HTMLElement>(null);
  const [playId, setPlayId] = useState(0);
  const hoverLock = useRef(false);

  const replay = () => {
    if (hoverLock.current) return;
    hoverLock.current = true;
    setPlayId((n) => n + 1);
    window.setTimeout(() => {
      hoverLock.current = false;
    }, 1500);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlayId((n) => n + 1);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative z-20 w-full min-w-0"
      aria-label="Company footprint"
    >
      <div className="mx-auto w-full max-w-6xl px-[var(--container-pad-x)]">
        <div
          className="group/bar w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface shadow-[var(--glow-cyan)] transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-brand/45 hover:shadow-[0_0_28px_-8px_color-mix(in_srgb,var(--brand)_35%,transparent)] sm:rounded-[var(--radius-xl)]"
          onMouseEnter={replay}
        >
          <div className="flex w-full flex-col lg:flex-row lg:items-center">
            <div className="flex w-full shrink-0 flex-col items-center justify-center gap-0 border-b border-[var(--line-strong)] px-2.5 py-2.5 text-center lg:w-[min(20%,16rem)] lg:border-r lg:border-b-0 lg:px-3 lg:py-2">
              <p className="text-sm font-semibold !leading-tight text-ink sm:text-[0.9375rem]">
                <BrandAccentText accentClassName="text-brand">
                  Growing with purpose.
                </BrandAccentText>
              </p>
              <p className="text-[10px] !leading-tight text-muted">
                Delivering with impact.
              </p>
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-2 items-center gap-x-2 gap-y-0 px-1 py-2 sm:grid-cols-4 sm:gap-x-3 sm:px-1.5 sm:py-2">
              {STATS.map((s, i) => (
                <StatItem
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  icon={STAT_ICONS[i] ?? Award}
                  playId={playId}
                  onHoverReplay={replay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
