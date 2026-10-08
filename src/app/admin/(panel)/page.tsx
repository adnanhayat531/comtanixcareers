"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/admin/AdminShell";
import { adminDashboard } from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof adminDashboard>> | null>(
    null,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    adminDashboard()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, []);

  if (error) {
    return <p className="text-red-700">{error}</p>;
  }
  if (!data) {
    return <p className="text-muted">Loading dashboard…</p>;
  }

  const cards = [
    { label: "Active Jobs", value: data.active_jobs },
    { label: "Total Jobs", value: data.total_jobs },
    { label: "Applications", value: data.total_applications },
    { label: "New Applications", value: data.new_applications },
    { label: "CV Submissions", value: data.total_cvs },
    { label: "Contact Messages", value: data.contact_messages },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="type-meta mt-1 text-muted">Hiring overview for Comtanix.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-line bg-white p-5 shadow-soft"
          >
            <p className="type-meta text-muted">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-ink">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-xl border border-line bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-ink">
              Recent Applications
            </h2>
            <Link href="/admin/applications" className="type-meta text-brand hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-canvas text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Applicant</th>
                  <th className="px-5 py-3 font-medium">Job</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_applications.map((a) => (
                  <tr key={a.id} className="border-t border-line">
                    <td className="px-5 py-3">
                      <Link href={`/admin/applications/${a.id}`} className="font-medium text-ink hover:text-brand">
                        {a.full_name}
                      </Link>
                      <p className="text-xs text-muted">{a.email || "—"}</p>
                    </td>
                    <td className="px-5 py-3 text-muted">{a.job_title || "—"}</td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))}
                {!data.recent_applications.length ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-muted">
                      No applications yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-ink">
              Recent Contact Messages
            </h2>
            <Link href="/admin/contacts" className="type-meta text-brand hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-canvas text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Subject</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_contacts.map((c) => (
                  <tr key={c.id} className="border-t border-line">
                    <td className="px-5 py-3">
                      <Link href={`/admin/contacts/${c.id}`} className="font-medium text-ink hover:text-brand">
                        {c.name}
                      </Link>
                      <p className="text-xs text-muted">{c.email}</p>
                    </td>
                    <td className="px-5 py-3 text-muted">{c.subject || "—"}</td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                  </tr>
                ))}
                {!data.recent_contacts.length ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-muted">
                      No messages yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
