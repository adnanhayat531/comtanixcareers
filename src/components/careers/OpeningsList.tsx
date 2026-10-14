import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fetchJobs, jobToRole, type UiRole } from "@/lib/api";
import { ROLES } from "@/lib/data/roles";

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

async function loadOpenings(): Promise<UiRole[]> {
  try {
    // Always hit the API so admin publish/create shows immediately.
    const jobs = await fetchJobs({ cache: "no-store" });
    if (!jobs.length) return staticRoles();
    return jobs.map(jobToRole);
  } catch {
    return staticRoles();
  }
}

function displayTags(tags: string[]) {
  return tags
    .filter((t) => !/night\s*shift/i.test(t))
    .slice(0, 3);
}

export async function OpeningsList() {
  const roles = await loadOpenings();

  if (!roles.length) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-line bg-white px-6 py-12 text-center">
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

  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
      {roles.map((role) => {
        const shift =
          role.tags.find((t) => /night/i.test(t)) ?? "Night shift";
        const deadline = formatDeadline(role.applicationDeadline);
        const tags = displayTags(role.tags);
        const blurb = role.summary || role.detail;

        return (
          <li key={role.id}>
            <article className="card-lift flex h-full flex-col rounded-[var(--radius-xl)] border border-line bg-white p-5 sm:p-6">
              <div className="min-w-0 flex-1">
                <h2 className="type-h3 text-balance text-ink">{role.title}</h2>

                <ul className="mt-3 flex flex-wrap gap-2">
                  <li className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-brand/40 bg-white px-2.5 py-1 type-meta text-brand">
                    <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {shift}
                  </li>
                  <li className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-brand/40 bg-white px-2.5 py-1 type-meta text-brand">
                    Onsite
                  </li>
                  <li className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-brand/40 bg-white px-2.5 py-1 type-meta text-brand">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Bahria Town Phase 8, Rawalpindi
                  </li>
                  {deadline ? (
                    <li className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-brand/40 bg-white px-2.5 py-1 type-meta text-brand">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      Apply by {deadline}
                    </li>
                  ) : null}
                </ul>

                <p className="type-meta mt-4 line-clamp-3 text-muted">
                  {blurb}
                </p>

                {tags.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tags.map((t) => (
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

              <div className="mt-5 border-t border-line pt-4">
                <Button
                  href={`/apply?role=${encodeURIComponent(role.title)}`}
                  className="w-full sm:w-auto"
                >
                  Apply now <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
