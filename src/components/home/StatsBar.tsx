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
      <Icon
        className="mb-1.5 h-4 w-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.55)]"
        aria-hidden
      />
      <div className="type-stat text-white">
        <span>{value}</span>
        {suffix ? <span className="text-cyan-200">{suffix}</span> : null}
      </div>
      <p className="mt-1.5 max-w-[7.5rem] text-[0.625rem] leading-snug font-semibold break-words uppercase tracking-[0.05em] text-white/75 sm:max-w-[10rem] sm:text-[0.6875rem]">
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
      <Container className="min-w-0">
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-cyan-300/35 bg-[rgba(8,24,32,0.82)] shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_18px_50px_-20px_rgba(0,0,0,0.55),0_0_40px_-18px_rgba(34,211,238,0.45)] backdrop-blur-xl sm:rounded-[var(--radius-xl)]">
          <div className="flex min-w-0 flex-col lg:flex-row lg:items-stretch">
            <div className="flex w-full shrink-0 flex-col items-center justify-center border-b border-white/10 px-4 py-3.5 text-center sm:px-5 sm:py-4 lg:w-[min(24%,15rem)] lg:border-r lg:border-b-0 lg:px-5 xl:px-6">
              <h2 className="type-h3 text-white">
                <BrandAccentText accentClassName="text-cyan-300">
                  Growing with purpose.
                </BrandAccentText>
              </h2>
              <p className="type-meta mt-1 text-white/70">
                Delivering with impact.
              </p>
            </div>

            <div className="relative flex min-w-0 flex-1 items-center justify-center bg-[linear-gradient(90deg,rgba(20,70,78,0.55)_0%,rgba(12,40,48,0.35)_100%)] px-3 py-3.5 sm:px-4 sm:py-4">
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
