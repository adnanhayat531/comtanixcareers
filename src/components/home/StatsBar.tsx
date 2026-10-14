"use client";

import {
  Award,
  Briefcase,
  CalendarDays,
  Users,
} from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { STATS } from "@/lib/data/content";
import { Container } from "@/components/ui/Section";

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
    <div className="flex min-w-0 flex-col items-center justify-center px-0.5 text-center sm:px-2">
      <span className="mb-1.5 grid h-8 w-8 place-items-center rounded-[0.5rem] bg-[var(--icon-bg)]">
        <Icon className="h-4 w-4 text-brand" aria-hidden />
      </span>
      <div className="type-stat text-ink">
        <span>{value}</span>
        {suffix ? <span className="text-brand">{suffix}</span> : null}
      </div>
      <p className="type-meta mt-1.5 max-w-[7.5rem] text-[0.625rem] leading-snug font-semibold break-words uppercase tracking-[0.05em] text-muted sm:max-w-[10rem] sm:text-[0.6875rem]">
        {label}
      </p>
    </div>
  );
}

export function StatsBar() {
  return (
    <section
      className="stats-overlap relative z-20 w-full min-w-0 bg-canvas"
      aria-label="Company footprint"
    >
      <Container className="min-w-0 py-1">
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] shadow-[0_0_0_1px_var(--glow),0_18px_48px_-20px_rgba(0,0,0,0.55),var(--glow-cyan)] sm:rounded-[var(--radius-xl)]">
          <div className="flex min-w-0 flex-col bg-surface lg:flex-row lg:items-stretch">
            <div className="flex w-full shrink-0 flex-col items-center justify-center border-b border-[var(--line-strong)] px-4 py-3.5 text-center sm:px-5 sm:py-4 lg:w-[min(24%,15rem)] lg:border-r lg:border-b-0 lg:px-5 xl:px-6">
              <h2 className="type-h3 text-ink">
                <BrandAccentText accentClassName="text-brand">
                  Growing with purpose.
                </BrandAccentText>
              </h2>
              <p className="type-meta mt-1 text-muted">
                Delivering with impact.
              </p>
            </div>

            <div className="relative flex min-w-0 flex-1 items-center justify-center bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] px-3 py-3.5 sm:px-4 sm:py-4">
              <div className="grid w-full min-w-0 grid-cols-2 place-items-center gap-x-2 gap-y-3 min-[480px]:grid-cols-4 min-[480px]:gap-y-0 sm:gap-x-3">
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
      </Container>
    </section>
  );
}
