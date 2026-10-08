import { ArrowRight, MapPin, Clock } from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
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
    month: "long",
    day: "numeric",
  });
}

async function loadOpenings(): Promise<UiRole[]> {
  try {
    const jobs = await fetchJobs({ next: { revalidate: 60 } });
    if (!jobs.length) return staticRoles();
    return jobs.map(jobToRole);
  } catch {
    return staticRoles();
  }
}

export async function OpeningsList() {
  const roles = await loadOpenings();

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
      {roles.map((role) => {
        const shift = role.tags.find((t) => /night/i.test(t)) ?? "Night shift";
        return (
          <article
            key={role.id}
            className="list-row flex flex-col gap-5 px-5 py-7 sm:px-7 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8"
          >
                  <div className="min-w-0 flex-1">
                    <h2 className="type-h3 text-ink">
                      <BrandAccentText>{role.title}</BrandAccentText>
                    </h2>
                    <div className="type-meta mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden />
                        Bahria Town Phase 8 · Onsite
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-brand" aria-hidden />
                        {shift}
                      </span>
                      {formatDeadline(role.applicationDeadline) ? (
                        <span className="inline-flex items-center gap-1.5">
                          Apply by {formatDeadline(role.applicationDeadline)}
                        </span>
                      ) : null}
                    </div>
              <p className="type-body mt-3 max-w-3xl text-muted">
                {role.detail ?? role.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.tags.map((t) => (
                  <span
                    key={t}
                    className="type-eyebrow rounded-md border border-brand/20 bg-tint px-2.5 py-1 text-brand"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto md:items-stretch">
              <Button
                href={`/apply?role=${encodeURIComponent(role.title)}`}
                className="w-full min-h-11 sm:w-auto"
              >
                Apply <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
