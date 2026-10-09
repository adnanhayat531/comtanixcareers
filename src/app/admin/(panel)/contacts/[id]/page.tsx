"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StatusBadge } from "@/components/admin/AdminShell";
import {
  adminDeleteContact,
  adminGetContact,
  adminPatchContactStatus,
  type AdminContact,
} from "@/lib/admin-api";

export default function ContactDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [row, setRow] = useState<AdminContact | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGetContact(params.id)
      .then(setRow)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [params.id]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!row) return <p className="text-muted">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="type-page-title text-ink">{row.name}</h1>
          <p className="type-meta mt-1 text-muted">{row.email}</p>
        </div>
        <StatusBadge status={row.status} />
      </div>

      <div className="rounded-xl border border-line bg-white p-6 shadow-soft">
        <p className="type-meta text-muted">Subject</p>
        <p className="mt-1 font-medium text-ink">{row.subject || "—"}</p>
        <p className="type-meta mt-5 text-muted">Message</p>
        <p className="mt-2 whitespace-pre-wrap text-ink">{row.message}</p>
        <p className="type-meta mt-5 text-muted">
          Received {new Date(row.created_at).toLocaleString()}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="w-40">
          <select
            className="ui-field"
            value={row.status}
            onChange={async (e) => setRow(await adminPatchContactStatus(row.id, e.target.value))}
          >
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button
          type="button"
          className="ui-btn border border-red-200 text-red-700"
          onClick={async () => {
            if (!confirm("Are you sure you want to delete this message?")) return;
            await adminDeleteContact(row.id);
            router.push("/admin/contacts");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
