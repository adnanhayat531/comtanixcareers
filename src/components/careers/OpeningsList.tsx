"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  Link2,
  MapPin,
  Share2,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fetchJobs, jobToRole, type UiRole } from "@/lib/api";
import { SITE } from "@/lib/config";
import { ROLES } from "@/lib/data/roles";

const DEFAULT_LOCATION = "Bahria Town Phase 8, Rawalpindi";

function staticRoles(): UiRole[] {
  return ROLES.map((role) => ({
    id: role.id,
    title: role.title,
    summary: role.summary,
    detail: role.detail ?? role.summary,
    tags: role.tags,
    slug: role.id,
    jobId: "",
    applicationDeadline: null as string | null,
    location: DEFAULT_LOCATION,
    salary: null as string | null,
    employmentType: null as string | null,
    department: null as string | null,
  }));
}

function formatDeadline(value: string | null | undefined) {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function shiftLabel(tags: string[]) {
  return tags.find((t) => /night|day|shift/i.test(t)) ?? "Night shift";
}

function displayTags(tags: string[]) {
  return tags.filter((t) => !/night\s*shift/i.test(t)).slice(0, 3);
}

function roleCapsules(role: UiRole) {
  const caps: string[] = [];
  if (role.salary) caps.push(role.salary);
  if (role.employmentType) caps.push(role.employmentType);
  else caps.push("Onsite");
  const shift = shiftLabel(role.tags);
  if (shift && !caps.some((c) => c.toLowerCase() === shift.toLowerCase())) {
    caps.push(shift);
  }
  for (const t of displayTags(role.tags)) {
    if (caps.length >= 4) break;
    if (!caps.some((c) => c.toLowerCase() === t.toLowerCase())) caps.push(t);
  }
  return caps;
}

function descriptionParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function syncJobQuery(slug: string) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (url.searchParams.get("job") === slug) return;
  url.searchParams.set("job", slug);
  // Keep existing hash; never inject #openings here — that can jump/freeze scroll.
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function OpeningsEmpty() {
  return (
    <div className="glass-card rounded-[var(--radius-xl)] px-6 py-12 text-center">
      <p className="type-h3 text-ink">No open roles right now</p>
      <p className="type-meta mx-auto mt-2 max-w-md text-muted">
        Submit your CV to our talent pool and we will reach out when a matching
        role opens.
      </p>
      <div className="mt-5">
        <Button href="/submit-cv" variant="secondary">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function JobCard({
  role,
  selected,
  onSelect,
}: {
  role: UiRole;
  selected: boolean;
  onSelect: () => void;
}) {
  const shift = shiftLabel(role.tags);
  const capsules = roleCapsules(role)
    .filter((c) => c.toLowerCase() !== shift.toLowerCase())
    .slice(0, 3);
  const location = role.location || DEFAULT_LOCATION;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative w-full overflow-hidden rounded-[var(--radius-lg)] text-left transition-[background-color,box-shadow,transform] duration-200 ${
        selected
          ? "bg-[linear-gradient(135deg,rgba(0,238,232,0.14)_0%,rgba(10,61,66,0.95)_45%,rgba(4,36,38,0.98)_100%)] shadow-[inset_0_0_0_1px_rgba(0,238,232,0.55),0_0_28px_-10px_rgba(0,238,232,0.35)]"
          : "bg-surface/70 shadow-[inset_0_0_0_1px_rgba(0,238,232,0.18)] hover:bg-surface hover:shadow-[inset_0_0_0_1px_rgba(0,238,232,0.4)]"
      }`}
    >
      {/* Brand rail */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 transition-colors ${
          selected ? "bg-brand" : "bg-brand/25 group-hover:bg-brand/60"
        }`}
      />

      <div className="flex gap-3 py-4 pr-3 pl-4 sm:gap-4 sm:py-5 sm:pr-4 sm:pl-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-sm px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] uppercase ${
                selected
                  ? "bg-brand text-[var(--on-sea)]"
                  : "bg-brand/15 text-brand"
              }`}
            >
              {shift}
            </span>
            {role.salary ? (
              <span className="type-meta text-muted">{role.salary}</span>
            ) : null}
          </div>

          <h3
            className={`mt-2 font-display text-[0.98rem] leading-snug font-semibold text-balance sm:text-[1.05rem] ${
              selected ? "text-brand-bright" : "text-ink"
            }`}
          >
            {role.title}
          </h3>

          <p className="type-meta mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-muted">
            <span className="font-medium text-ink/80">{SITE.name}</span>
            <span className="text-brand/40" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
              {location}
            </span>
          </p>

          {capsules.length ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {capsules.map((c) => (
                <li
                  key={c}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
                    selected
                      ? "bg-brand/15 text-brand"
                      : "bg-deep/50 text-muted ring-1 ring-line/60"
                  }`}
                >
                  {c}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <ChevronRight
          className={`mt-1 h-5 w-5 shrink-0 self-center transition-transform duration-200 ${
            selected
              ? "translate-x-0.5 text-brand"
              : "text-muted/50 group-hover:translate-x-0.5 group-hover:text-brand"
          }`}
          aria-hidden
        />
      </div>
    </button>
  );
}

function JobDetail({
  role,
  onBack,
}: {
  role: UiRole;
  onBack?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const location = role.location || DEFAULT_LOCATION;
  const deadline = formatDeadline(role.applicationDeadline);
  const shift = shiftLabel(role.tags);
  const employment = role.employmentType || "Full-time";
  const paragraphs = descriptionParagraphs(role.detail || role.summary);
  const metaLine = [location, role.salary, employment].filter(Boolean).join(" · ");

  const share = useCallback(async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("job", role.slug);
    url.hash = "openings";
    const href = url.toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: role.title, url: href });
        return;
      }
    } catch {
      /* fall through to clipboard */
    }
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [role.slug, role.title]);

  return (
    <article className="glass-card flex flex-col rounded-[var(--radius-xl)] border border-line">
      <div className="border-b border-line p-5 sm:p-6">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1.5 type-meta text-brand transition-opacity hover:opacity-80 lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to openings
        </button>

        <h2 className="type-h2 text-balance text-ink">{role.title}</h2>
        <p className="type-meta mt-2 text-muted">{SITE.name}</p>
        <p className="type-meta mt-1 text-muted">{metaLine}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button
            href={`/apply?role=${encodeURIComponent(role.title)}`}
            className="w-full sm:w-auto"
          >
            Apply now <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <button
            type="button"
            onClick={share}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-line text-ink transition-colors hover:border-brand hover:text-brand"
            aria-label={copied ? "Link copied" : "Share job"}
            title={copied ? "Link copied" : "Share"}
          >
            {copied ? (
              <Link2 className="h-4 w-4" aria-hidden />
            ) : (
              <Share2 className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="type-eyebrow text-brand">Job details</h3>
        <ul className="mt-3 space-y-2.5">
          {role.salary ? (
            <li className="flex items-center gap-2.5 type-meta text-ink">
              <Wallet className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              {role.salary}
            </li>
          ) : null}
          <li className="flex items-center gap-2.5 type-meta text-ink">
            <Clock className="h-4 w-4 shrink-0 text-brand" aria-hidden />
            {employment}
            {shift ? ` · ${shift}` : ""}
          </li>
          <li className="flex items-center gap-2.5 type-meta text-ink">
            <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden />
            {location}
          </li>
          {deadline ? (
            <li className="flex items-center gap-2.5 type-meta text-ink">
              <CalendarDays className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              Apply by {deadline}
            </li>
          ) : null}
        </ul>

        <h3 className="type-eyebrow mt-8 text-brand">Full job description</h3>
        <div className="mt-3 space-y-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="type-body whitespace-pre-line text-muted">
              {p}
            </p>
          ))}
        </div>

        {role.tags.length ? (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {role.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function OpeningsBoard({ roles }: { roles: UiRole[] }) {
  const searchParams = useSearchParams();
  const jobParam = searchParams.get("job");

  const initialSlug =
    (jobParam && roles.find((r) => r.slug === jobParam)?.slug) ||
    roles[0]?.slug ||
    "";

  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [mobileDetail, setMobileDetail] = useState(Boolean(jobParam));

  useEffect(() => {
    if (!roles.length) return;
    const fromUrl = jobParam && roles.find((r) => r.slug === jobParam);
    if (fromUrl) {
      setSelectedSlug(fromUrl.slug);
      return;
    }
    setSelectedSlug((prev) =>
      roles.some((r) => r.slug === prev) ? prev : roles[0].slug,
    );
  }, [roles, jobParam]);

  const selected =
    roles.find((r) => r.slug === selectedSlug) ?? roles[0] ?? null;

  const selectRole = (slug: string, openMobile = true) => {
    setSelectedSlug(slug);
    syncJobQuery(slug);
    if (openMobile) setMobileDetail(true);
  };

  if (!selected) return null;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:items-start lg:gap-5">
      {/* List — no nested overflow; page scroll only (avoids wheel trap / hang) */}
      <div className={mobileDetail ? "hidden lg:block" : "block"}>
        <ul className="flex flex-col gap-3">
          {roles.map((role) => (
            <li key={role.id}>
              <JobCard
                role={role}
                selected={role.slug === selected.slug}
                onSelect={() => selectRole(role.slug)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Detail sticks while scrolling the list; height follows content */}
      <div
        className={`${
          mobileDetail ? "block" : "hidden lg:block"
        } lg:sticky lg:top-24 lg:self-start`}
      >
        <JobDetail
          role={selected}
          onBack={() => setMobileDetail(false)}
        />
      </div>
    </div>
  );
}

/**
 * Renders static openings immediately so /careers never blocks on the API.
 * Live admin-published jobs replace the list when the backend responds.
 */
export function OpeningsList() {
  const [roles, setRoles] = useState<UiRole[]>(() => staticRoles());

  useEffect(() => {
    let cancelled = false;

    fetchJobs({ cache: "no-store" })
      .then((jobs) => {
        if (cancelled || !jobs.length) return;
        setRoles(jobs.map(jobToRole));
      })
      .catch(() => {
        /* keep static fallback when API is down */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!roles.length) return <OpeningsEmpty />;
  return <OpeningsBoard roles={roles} />;
}
