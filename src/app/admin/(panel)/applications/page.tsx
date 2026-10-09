"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/admin/AdminShell";
import {
  adminListApplications,
  type AdminApplication,
} from "@/lib/admin-api";

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<AdminApplication[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState("");

  async function load(p = 1) {
    try {
      const data = await adminListApplications({ q, status, page: p, page_size: 20 });
      setItems(data.items);
      setPage(data.page);
      setPages(data.pages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="type-page-title text-ink">Applications</h1>
        <p className="type-meta mt-1 text-muted">Review candidates for open roles.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-4">
        <div className="min-w-0 w-full sm:min-w-[12rem] sm:flex-1 sm:max-w-xs">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, phone…"
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
            {["new", "reviewing", "shortlisted", "interview", "rejected", "hired"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => load(1)} className="ui-btn border border-line">
          Filter
        </button>
      </div>

      {error ? <p className="text-red-700">{error}</p> : null}

      <div className="ui-table-wrap rounded-xl border border-line bg-white shadow-soft">
        <table className="ui-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Job</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <td className="font-medium">{a.full_name}</td>
                <td className="text-muted">{a.email || "—"}</td>
                <td className="text-muted">{a.phone}</td>
                <td className="text-muted">{a.job_title || "—"}</td>
                <td className="text-muted">
                  {new Date(a.created_at).toLocaleDateString()}
                </td>
                <td>
                  <StatusBadge status={a.status} />
                </td>
                <td>
                  <Link href={`/admin/applications/${a.id}`} className="text-brand hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-muted">
                  No applications found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <button type="button" disabled={page <= 1} onClick={() => load(page - 1)} className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40">
          Prev
        </button>
        <span className="type-meta self-center text-muted">
          Page {page} / {pages}
        </span>
        <button type="button" disabled={page >= pages} onClick={() => load(page + 1)} className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40">
          Next
        </button>
      </div>
    </div>
  );
}
