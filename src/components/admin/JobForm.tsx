"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  adminCreateJob,
  adminUpdateJob,
  type AdminJob,
} from "@/lib/admin-api";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 220);
}

const field =
  "type-body w-full rounded-lg border border-line bg-white px-3.5 py-2.5 outline-none focus:border-brand focus:ring-1 focus:ring-brand/25";

type Props = {
  initial?: AdminJob | null;
  mode: "create" | "edit";
};

export function JobForm({ initial, mode }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  async function onSubmit(e: FormEvent<HTMLFormElement>, nextStatus?: string) {
    e.preventDefault();
    setError("");
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const body = {
      title: String(fd.get("title") || "").trim(),
      slug: String(fd.get("slug") || "").trim(),
      department: String(fd.get("department") || "").trim() || null,
      location: String(fd.get("location") || "").trim(),
      employment_type: String(fd.get("employment_type") || "").trim() || null,
      experience_required: String(fd.get("experience_required") || "").trim() || null,
      salary: String(fd.get("salary") || "").trim() || null,
      summary: String(fd.get("summary") || "").trim(),
      description: String(fd.get("description") || "").trim(),
      responsibilities: String(fd.get("responsibilities") || "").trim() || null,
      requirements: String(fd.get("requirements") || "").trim() || null,
      qualifications: String(fd.get("qualifications") || "").trim() || null,
      benefits: String(fd.get("benefits") || "").trim() || null,
      posted_date: String(fd.get("posted_date") || "") || null,
      application_deadline: String(fd.get("application_deadline") || "") || null,
      status: nextStatus || String(fd.get("status") || "draft"),
      tags: String(fd.get("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (mode === "create") {
        const job = await adminCreateJob(body);
        router.push(`/admin/jobs/${job.id}/edit`);
      } else if (initial) {
        await adminUpdateJob(initial.id, body);
        router.refresh();
        setError("");
        alert("Job saved.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => onSubmit(e)}
    >
      <section className="rounded-xl border border-line bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-ink">Basic information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="type-label mb-1.5 block">Job title</label>
            <input name="title" required className={field} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="type-label mb-1.5 block">Slug</label>
            <input
              name="slug"
              required
              className={field}
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Department</label>
            <input name="department" className={field} defaultValue={initial?.department || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Location</label>
            <input name="location" required className={field} defaultValue={initial?.location || "Bahria Town Phase 8, Rawalpindi"} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Employment type</label>
            <input name="employment_type" className={field} defaultValue={initial?.employment_type || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Experience required</label>
            <input name="experience_required" className={field} defaultValue={initial?.experience_required || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Salary (optional)</label>
            <input name="salary" className={field} defaultValue={initial?.salary || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Tags (comma separated)</label>
            <input name="tags" className={field} defaultValue={(initial?.tags || []).join(", ")} />
          </div>
          <div className="sm:col-span-2">
            <label className="type-label mb-1.5 block">Short description</label>
            <textarea name="summary" required rows={2} className={field} defaultValue={initial?.summary || ""} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-ink">Job content</h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label className="type-label mb-1.5 block">Full description</label>
            <textarea name="description" required rows={5} className={field} defaultValue={initial?.description || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Responsibilities</label>
            <textarea name="responsibilities" rows={4} className={field} defaultValue={initial?.responsibilities || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Requirements</label>
            <textarea name="requirements" rows={4} className={field} defaultValue={initial?.requirements || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Qualifications</label>
            <textarea name="qualifications" rows={3} className={field} defaultValue={initial?.qualifications || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Benefits</label>
            <textarea name="benefits" rows={3} className={field} defaultValue={initial?.benefits || ""} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-ink">Publishing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="type-label mb-1.5 block">Posted date</label>
            <input type="date" name="posted_date" className={field} defaultValue={initial?.posted_date || ""} />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Application ending date</label>
            <input
              type="date"
              name="application_deadline"
              className={field}
              defaultValue={initial?.application_deadline || ""}
            />
          </div>
          <div>
            <label className="type-label mb-1.5 block">Status</label>
            <select name="status" className={field} defaultValue={initial?.status || "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="closed">Closed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </section>

      {error ? <p className="font-medium text-red-700">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-brand px-5 py-2.5 font-display text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : mode === "create" ? "Save job" : "Save changes"}
        </button>
        {mode === "create" ? (
          <button
            type="button"
            disabled={pending}
            className="rounded-md border border-brand px-5 py-2.5 font-display text-sm font-semibold text-brand"
            onClick={(e) => {
              const form = (e.currentTarget as HTMLButtonElement).form;
              if (form) onSubmit({ preventDefault() {}, currentTarget: form } as FormEvent<HTMLFormElement>, "published");
            }}
          >
            Publish
          </button>
        ) : null}
      </div>
    </form>
  );
}
