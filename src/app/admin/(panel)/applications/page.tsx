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
        <h1 className="font-display text-2xl font-semibold text-ink">Applications</h1>
        <p className="type-meta mt-1 text-muted">Review candidates for open roles.</p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-xl border border-line bg-white p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, phone…"
          className="h-10 rounded-lg border border-line px-3 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-lg border border-line px-3 text-sm"
        >
          <option value="">All statuses</option>
          {["new", "reviewing", "shortlisted", "interview", "rejected", "hired"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => load(1)} className="rounded-md border border-line px-4 text-sm">
          Filter
        </button>
      </div>

      {error ? <p className="text-red-700">{error}</p> : null}

      <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-canvas text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Applicant</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Job</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium">{a.full_name}</td>
                <td className="px-4 py-3 text-muted">{a.email || "—"}</td>
                <td className="px-4 py-3 text-muted">{a.phone}</td>
                <td className="px-4 py-3 text-muted">{a.job_title || "—"}</td>
                <td className="px-4 py-3 text-muted">
                  {new Date(a.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/applications/${a.id}`} className="text-brand hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
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
