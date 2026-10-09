"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/admin/AdminShell";
import { adminDeleteJob, adminListJobs, adminPatchJobStatus, type AdminJob } from "@/lib/admin-api";

export default function AdminJobsPage() {
  const [items, setItems] = useState<AdminJob[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function load(p = page) {
    try {
      const data = await adminListJobs({ q, status, page: p, page_size: 20 });
      setItems(data.items);
      setPages(data.pages);
      setPage(data.page);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load jobs");
    }
  }

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="type-page-title text-ink">Jobs</h1>
          <p className="type-meta mt-1 text-muted">Create and manage openings.</p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="ui-btn ui-btn-primary"
        >
          Add Job
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-4">
        <div className="min-w-0 w-full sm:min-w-[12rem] sm:flex-1 sm:max-w-xs">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title…"
            className="ui-field"
          />
        </div>
        <div className="w-40">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="ui-field"
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => load(1)}
          className="ui-btn border border-line"
        >
          Filter
        </button>
      </div>

      {error ? <p className="text-red-700">{error}</p> : null}

      <div className="ui-table-wrap rounded-xl border border-line bg-white shadow-soft">
        <table className="ui-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Posted</th>
              <th>Ending</th>
              <th>Apps</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((job) => (
              <tr key={job.id}>
                <td className="font-medium text-ink">{job.title}</td>
                <td className="text-muted">{job.department || "—"}</td>
                <td className="text-muted">{job.location}</td>
                <td className="text-muted">{job.employment_type || "—"}</td>
                <td>
                  <StatusBadge status={job.status} />
                </td>
                <td className="text-muted">{job.posted_date || "—"}</td>
                <td className="text-muted">{job.application_deadline || "—"}</td>
                <td className="text-muted">{job.applications_count}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/jobs/${job.id}/edit`} className="text-brand hover:underline">
                      Edit
                    </Link>
                    {job.status !== "published" ? (
                      <button
                        type="button"
                        className="text-brand hover:underline"
                        onClick={async () => {
                          await adminPatchJobStatus(job.id, "published");
                          load(page);
                        }}
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-brand hover:underline"
                        onClick={async () => {
                          await adminPatchJobStatus(job.id, "closed");
                          load(page);
                        }}
                      >
                        Deactivate
                      </button>
                    )}
                    <button
                      type="button"
                      className="text-red-700 hover:underline"
                      onClick={async () => {
                        if (!confirm("Are you sure you want to delete this job?")) return;
                        try {
                          await adminDeleteJob(job.id);
                          load(page);
                        } catch (e) {
                          alert(e instanceof Error ? e.message : "Delete failed");
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-muted">
                  No jobs found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => load(page - 1)}
          className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Prev
        </button>
        <span className="type-meta self-center text-muted">
          Page {page} / {pages}
        </span>
        <button
          type="button"
          disabled={page >= pages}
          onClick={() => load(page + 1)}
          className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
