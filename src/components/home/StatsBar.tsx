"use client";

import {
  Award,
  Briefcase,
  CalendarDays,
  Users,
} from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { STATS } from "@/lib/data/content";

const STAT_ICONS = [CalendarDays, Users, Briefcase, Award] as const;

function StatItem({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: (typeof STAT_ICONS)[number];
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-0 py-0 text-center leading-none">
      <span className="mb-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[0.2rem] bg-[var(--icon-bg)]">
        <Icon className="h-2.5 w-2.5 text-brand" aria-hidden />
      </span>
      <div className="text-xl font-bold leading-none tracking-tight text-ink sm:text-2xl">
        <span>{value}</span>
        {suffix ? <span className="text-brand">{suffix}</span> : null}
      </div>
      <p className="mt-0.5 max-w-[9rem] text-[9px] !leading-tight font-semibold break-words uppercase tracking-[0.04em] text-muted">
        {label}
      </p>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="relative z-20 w-full min-w-0" aria-label="Company footprint">
      <div className="mx-auto w-full max-w-6xl px-[var(--container-pad-x)]">
        <div className="w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] py-2 shadow-[0_0_0_1px_var(--glow),0_18px_48px_-20px_rgba(0,0,0,0.55),var(--glow-cyan)] sm:rounded-[var(--radius-xl)]">
          <div className="flex w-full flex-col bg-surface lg:flex-row lg:items-center">
            {/* Use div, not h2 — global h2 { font-size: var(--h2) } was forcing tall card */}
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

            <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-2 gap-y-0 px-1 py-2 sm:grid-cols-4 sm:gap-x-3 sm:px-1.5 sm:py-2">
              {STATS.map((s, i) => (
                <StatItem
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  icon={STAT_ICONS[i] ?? Award}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
