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
        <h1 className="type-page-title text-ink">Dashboard</h1>
        <p className="type-meta mt-1 text-muted">Hiring overview for Comtanix.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-line bg-white p-5 shadow-soft"
          >
            <p className="type-meta text-muted">{c.label}</p>
            <p className="type-stat mt-2 text-ink">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-xl border border-line bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="type-section-title text-ink">
              Recent Applications
            </h2>
            <Link href="/admin/applications" className="type-meta text-brand hover:underline">
              View all
            </Link>
          </div>
          <div className="ui-table-wrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Job</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_applications.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <Link href={`/admin/applications/${a.id}`} className="font-medium text-ink hover:text-brand">
                        {a.full_name}
                      </Link>
                      <p className="text-xs text-muted">{a.email || "—"}</p>
                    </td>
                    <td className="text-muted">{a.job_title || "—"}</td>
                    <td className="text-muted">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))}
                {!data.recent_applications.length ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted">
                      No applications yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="type-section-title text-ink">
              Recent Contact Messages
            </h2>
            <Link href="/admin/contacts" className="type-meta text-brand hover:underline">
              View all
            </Link>
          </div>
          <div className="ui-table-wrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_contacts.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <Link href={`/admin/contacts/${c.id}`} className="font-medium text-ink hover:text-brand">
                        {c.name}
                      </Link>
                      <p className="text-xs text-muted">{c.email}</p>
                    </td>
                    <td className="text-muted">{c.subject || "—"}</td>
                    <td className="text-muted">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                  </tr>
                ))}
                {!data.recent_contacts.length ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted">
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
