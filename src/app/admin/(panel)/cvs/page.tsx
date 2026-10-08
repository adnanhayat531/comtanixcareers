"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/admin/AdminShell";
import { adminListCvs, type AdminCv } from "@/lib/admin-api";

export default function AdminCvsPage() {
  const [items, setItems] = useState<AdminCv[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState("");

  async function load(p = 1) {
    try {
      const data = await adminListCvs({ q, status, page: p, page_size: 20 });
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
        <h1 className="font-display text-2xl font-semibold text-ink">CV Submissions</h1>
        <p className="type-meta mt-1 text-muted">Talent pool for future openings.</p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-xl border border-line bg-white p-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-10 rounded-lg border border-line px-3 text-sm" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-lg border border-line px-3 text-sm">
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="archived">Archived</option>
        </select>
        <button type="button" onClick={() => load(1)} className="rounded-md border border-line px-4 text-sm">Filter</button>
      </div>

      {error ? <p className="text-red-700">{error}</p> : null}

      <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-canvas text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Interest</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium">{c.full_name}</td>
                <td className="px-4 py-3 text-muted">{c.email || "—"}</td>
                <td className="px-4 py-3 text-muted">{c.phone}</td>
                <td className="px-4 py-3 text-muted">{c.role_interest}</td>
                <td className="px-4 py-3 text-muted">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3">
                  <Link href={`/admin/cvs/${c.id}`} className="text-brand hover:underline">View</Link>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-muted">No CV submissions found.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <button type="button" disabled={page <= 1} onClick={() => load(page - 1)} className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40">Prev</button>
        <span className="type-meta self-center text-muted">Page {page} / {pages}</span>
        <button type="button" disabled={page >= pages} onClick={() => load(page + 1)} className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}
