"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  Briefcase,
  CalendarDays,
  MousePointer2,
  Users,
} from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { STATS } from "@/lib/data/content";

const STAT_ICONS = [CalendarDays, Users, Briefcase, Award] as const;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Counts 0 → target whenever `playId` changes (and playId > 0). */
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
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: (typeof STAT_ICONS)[number];
  playId: number;
  active: boolean;
}) {
  const display = useCountUp(value, playId);

  return (
    <div
      data-stat-item
      className={`flex min-w-0 flex-col items-center gap-0 py-0 text-center leading-none transition-transform duration-300 ease-out ${
        active ? "-translate-y-0.5 scale-[1.03]" : ""
      }`}
    >
      <span
        className={`mb-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[0.2rem] bg-[var(--icon-bg)] transition-transform duration-300 ${
          active ? "scale-110" : ""
        }`}
      >
        <Icon className="h-2.5 w-2.5 text-brand" aria-hidden />
      </span>
      <div
        className={`text-xl font-bold leading-none tracking-tight tabular-nums transition-colors duration-300 sm:text-2xl ${
          active ? "text-brand" : "text-ink"
        }`}
      >
        <span>{display}</span>
        {suffix ? <span className="text-brand">{suffix}</span> : null}
      </div>
      <p className="mt-0.5 max-w-[9rem] text-[9px] !leading-tight font-semibold break-words uppercase tracking-[0.04em] text-muted">
        {label}
      </p>
    </div>
  );
}

type CursorPos = { x: number; y: number; visible: boolean };

export function StatsBar() {
  const rootRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [playId, setPlayId] = useState(0);
  const [activeStat, setActiveStat] = useState(-1);
  const [cursor, setCursor] = useState<CursorPos>({
    x: 0,
    y: 0,
    visible: false,
  });
  const ranRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (ranRef.current) return;
      ranRef.current = true;
      setPlayId(1);

      if (prefersReduced) {
        setActiveStat(-1);
        return;
      }

      const motto = bar.querySelector<HTMLElement>("[data-stat-motto]");
      const items = Array.from(
        bar.querySelectorAll<HTMLElement>("[data-stat-item]"),
      );
      const targets = [motto, ...items].filter(Boolean) as HTMLElement[];
      if (targets.length === 0) return;

      const barRect = () => bar.getBoundingClientRect();
      const centerOf = (node: HTMLElement) => {
        const r = node.getBoundingClientRect();
        const b = barRect();
        return {
          x: r.left - b.left + r.width / 2,
          y: r.top - b.top + r.height / 2,
        };
      };

      const first = centerOf(targets[0]!);
      // Start slightly left of motto so the glide is visible
      setCursor({ x: first.x - 36, y: first.y + 10, visible: true });

      const stepMs = 700;
      let cancelled = false;
      const timers: number[] = [];

      const visit = async () => {
        // brief beat before first hop
        await new Promise<void>((resolve) => {
          timers.push(window.setTimeout(resolve, 180));
        });
        for (let i = 0; i < targets.length; i++) {
          if (cancelled) return;
          const point = centerOf(targets[i]!);
          setCursor({ x: point.x + 6, y: point.y + 4, visible: true });
          setActiveStat(i === 0 ? -1 : i - 1);
          await new Promise<void>((resolve) => {
            timers.push(window.setTimeout(resolve, stepMs));
          });
        }
        if (cancelled) return;
        setActiveStat(-1);
        setCursor((c) => ({ ...c, visible: false }));
      };

      void visit();

      return () => {
        cancelled = true;
        timers.forEach((id) => window.clearTimeout(id));
      };
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          cleanupAnim = run() ?? undefined;
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    let cleanupAnim: (() => void) | undefined;
    observer.observe(el);
    return () => {
      observer.disconnect();
      cleanupAnim?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative z-20 w-full min-w-0"
      aria-label="Company footprint"
    >
      <div className="mx-auto w-full max-w-6xl px-[var(--container-pad-x)]">
        <div
          ref={barRef}
          className="relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface shadow-[var(--glow-cyan)] transition-[box-shadow,border-color,transform] duration-300 ease-out sm:rounded-[var(--radius-xl)]"
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute z-30 will-change-transform ${
              cursor.visible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: 0,
              top: 0,
              transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-18%, -12%)`,
              transition:
                "transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease",
            }}
          >
            <span className="relative inline-flex drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <MousePointer2
                className="h-6 w-6 fill-white text-brand-bright sm:h-7 sm:w-7"
                strokeWidth={1.75}
              />
              <span className="absolute top-[70%] left-[35%] h-2 w-2 -translate-x-1/2 rounded-full bg-brand/80 blur-[0.5px]" />
            </span>
          </div>

          <div className="flex w-full flex-col lg:flex-row lg:items-center">
            <div
              data-stat-motto
              className={`flex w-full shrink-0 flex-col items-center justify-center gap-0 border-b border-[var(--line-strong)] px-2.5 py-2.5 text-center transition-transform duration-300 lg:w-[min(20%,16rem)] lg:border-r lg:border-b-0 lg:px-3 lg:py-2 ${
                activeStat === -1 && cursor.visible ? "scale-[1.02]" : ""
              }`}
            >
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
                  active={activeStat === i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
