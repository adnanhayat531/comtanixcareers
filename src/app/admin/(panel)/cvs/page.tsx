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
        <h1 className="type-page-title text-ink">CV Submissions</h1>
        <p className="type-meta mt-1 text-muted">Talent pool for future openings.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-4">
        <div className="min-w-[12rem] flex-1 sm:max-w-xs">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="ui-field" />
        </div>
        <div className="w-40">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="ui-field">
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button type="button" onClick={() => load(1)} className="ui-btn border border-line">Filter</button>
      </div>

      {error ? <p className="text-red-700">{error}</p> : null}

      <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-soft">
        <table className="ui-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Interest</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td className="font-medium">{c.full_name}</td>
                <td className="text-muted">{c.email || "—"}</td>
                <td className="text-muted">{c.phone}</td>
                <td className="text-muted">{c.role_interest}</td>
                <td className="text-muted">{new Date(c.created_at).toLocaleDateString()}</td>
                <td><StatusBadge status={c.status} /></td>
                <td>
                  <Link href={`/admin/cvs/${c.id}`} className="text-brand hover:underline">View</Link>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr><td colSpan={7} className="py-10 text-center text-muted">No CV submissions found.</td></tr>
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
