"use client";

import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { STATS } from "@/lib/data/content";
import { Container } from "@/components/ui/Section";

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center px-0.5 text-center sm:px-2">
      <div className="type-stat text-white">
        <span>{value}</span>
        {suffix ? <span className="text-white/95">{suffix}</span> : null}
      </div>
      <p className="mt-1.5 max-w-[7.5rem] text-[0.625rem] leading-snug font-semibold break-words uppercase tracking-[0.05em] text-white/90 sm:max-w-[10rem] sm:text-[0.6875rem]">
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
        <div className="overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-overlay ring-1 ring-line sm:rounded-[var(--radius-xl)]">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <div className="flex shrink-0 flex-col items-center justify-center px-3 py-3 text-center sm:px-5 sm:py-4 lg:w-[min(22%,14rem)] lg:items-center lg:px-5 xl:px-6">
              <h2 className="type-h3 text-ink">
                <BrandAccentText>Growing with purpose.</BrandAccentText>
              </h2>
              <p className="type-meta mt-1 text-muted">
                Delivering with impact.
              </p>
            </div>

            <div className="relative flex min-w-0 flex-1 items-center justify-center bg-brand px-2 py-3 sm:px-4 sm:py-4 lg:rounded-tl-[1.25rem]">
              <div className="grid w-full grid-cols-2 place-items-center gap-x-2 gap-y-3 min-[480px]:grid-cols-4 min-[480px]:gap-y-0 sm:gap-x-3">
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
