"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Clock, Globe2 } from "lucide-react";
import { CONFIG } from "@/lib/config";

type Zone = {
  label: string;
  tz: string;
  hint: string;
  icon: "clock" | "globe" | "building";
};

const ZONES: Zone[] = [
  {
    label: "New York, US (EST)",
    tz: "America/New_York",
    hint: "East Coast Shift",
    icon: "clock",
  },
  {
    label: "Los Angeles, US (PST)",
    tz: "America/Los_Angeles",
    hint: "West Coast Shift",
    icon: "globe",
  },
  {
    label: "Comtanix HQ Floor",
    tz: "OFFICE",
    hint: "Floor 100% Active",
    icon: "building",
  },
];

function formatTime(date: Date, timeZone: string) {
  return date.toLocaleTimeString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDay(date: Date, timeZone: string) {
  return date.toLocaleDateString("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function ZoneIcon({ name }: { name: Zone["icon"] }) {
  const cls = "h-5 w-5 text-brand";
  if (name === "globe") return <Globe2 className={cls} aria-hidden />;
  if (name === "building") return <Building2 className={cls} aria-hidden />;
  return <Clock className={cls} aria-hidden />;
}

export function ClocksPanel() {
  const [now, setNow] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(d);
      try {
        const parts = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          hour12: false,
          weekday: "short",
        }).formatToParts(d);
        const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
        const day = parts.find((p) => p.type === "weekday")?.value ?? "";
        setOpen(!["Sat", "Sun"].includes(day) && hour >= 9 && hour < 17);
      } catch {
        setOpen(false);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside
      className="rounded-xl border border-line bg-surface p-5 shadow-hover md:p-6"
      aria-label="Live time comparison"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-brand md:text-2xl">
            Global Operations Hub
          </h3>
          <p className="mt-1 text-sm text-muted">Real-time synchronization</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            open
              ? "bg-brand/15 text-brand"
              : "bg-tint text-brand"
          }`}
        >
          {open ? "US Hours Active" : "Night Shifts Live"}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {ZONES.map((z) => {
          const tz = z.tz === "OFFICE" ? CONFIG.officeTz : z.tz;
          return (
            <div
              key={z.label}
              className="flex items-center justify-between gap-3 rounded-lg bg-tint px-3.5 py-3.5"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-brand shadow-soft">
                  <ZoneIcon name={z.icon} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{z.label}</p>
                  <p className="text-xs text-muted">
                    {z.icon === "building"
                      ? "Main Operational Centre"
                      : now
                        ? formatDay(now, tz)
                        : "—"}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <b
                  className="block font-display text-lg font-bold tabular-nums text-brand md:text-xl"
                  data-tz={z.tz}
                >
                  {now ? formatTime(now, tz) : "--:--:--"}
                </b>
                <span className="text-[10px] font-semibold tracking-wide text-muted uppercase">
                  {z.hint}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-muted">
          <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden />
          SOC 2 Type II Compliant
        </p>
        <Link
          href="/careers"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
        >
          Explore US Shift Roles <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
