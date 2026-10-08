"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StatusBadge } from "@/components/admin/AdminShell";
import {
  adminApplicationCvUrl,
  adminDeleteApplication,
  adminGetApplication,
  adminPatchApplicationStatus,
  downloadAdminFile,
  type AdminApplication,
} from "@/lib/admin-api";

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [row, setRow] = useState<AdminApplication | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGetApplication(params.id)
      .then(setRow)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [params.id]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!row) return <p className="text-muted">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{row.full_name}</h1>
          <p className="type-meta mt-1 text-muted">{row.job_title || "Application"}</p>
        </div>
        <StatusBadge status={row.status} />
      </div>

      <div className="rounded-xl border border-line bg-white p-6 shadow-soft">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="type-meta text-muted">Email</dt>
            <dd className="mt-1 text-ink">{row.email || "—"}</dd>
          </div>
          <div>
            <dt className="type-meta text-muted">Phone</dt>
            <dd className="mt-1 text-ink">{row.phone}</dd>
          </div>
          <div>
            <dt className="type-meta text-muted">Experience</dt>
            <dd className="mt-1 text-ink">{row.experience}</dd>
          </div>
          <div>
            <dt className="type-meta text-muted">Applied</dt>
            <dd className="mt-1 text-ink">{new Date(row.created_at).toLocaleString()}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="type-meta text-muted">Message</dt>
            <dd className="mt-1 whitespace-pre-wrap text-ink">{row.message || "—"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="type-meta text-muted">CV</dt>
            <dd className="mt-2 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white"
                onClick={() =>
                  downloadAdminFile(
                    adminApplicationCvUrl(row.id),
                    row.resume_original_filename,
                  )
                }
              >
                Download CV
              </button>
              <span className="type-meta self-center text-muted">
                {row.resume_original_filename}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="type-label">Change status</label>
        <select
          className="rounded-lg border border-line px-3 py-2 text-sm"
          value={row.status}
          onChange={async (e) => {
            const updated = await adminPatchApplicationStatus(row.id, e.target.value);
            setRow(updated);
          }}
        >
          {["new", "reviewing", "shortlisted", "interview", "rejected", "hired"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-700"
          onClick={async () => {
            if (!confirm("Are you sure you want to delete this application?")) return;
            await adminDeleteApplication(row.id);
            router.push("/admin/applications");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
