"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StatusBadge } from "@/components/admin/AdminShell";
import {
  adminCvFileUrl,
  adminDeleteCv,
  adminGetCv,
  adminPatchCvStatus,
  downloadAdminFile,
  type AdminCv,
} from "@/lib/admin-api";

export default function CvDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [row, setRow] = useState<AdminCv | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGetCv(params.id)
      .then(setRow)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [params.id]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!row) return <p className="text-muted">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="type-page-title text-ink">{row.full_name}</h1>
          <p className="type-meta mt-1 text-muted">{row.role_interest}</p>
        </div>
        <StatusBadge status={row.status} />
      </div>

      <div className="rounded-xl border border-line bg-white p-6 shadow-soft">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div><dt className="type-meta text-muted">Email</dt><dd className="mt-1">{row.email || "—"}</dd></div>
          <div><dt className="type-meta text-muted">Phone</dt><dd className="mt-1">{row.phone}</dd></div>
          <div><dt className="type-meta text-muted">Experience</dt><dd className="mt-1">{row.experience}</dd></div>
          <div><dt className="type-meta text-muted">Submitted</dt><dd className="mt-1">{new Date(row.created_at).toLocaleString()}</dd></div>
          <div className="sm:col-span-2"><dt className="type-meta text-muted">Message</dt><dd className="mt-1 whitespace-pre-wrap">{row.message || "—"}</dd></div>
        </dl>
        <button
          type="button"
          className="ui-btn ui-btn-primary mt-6"
          onClick={() => downloadAdminFile(adminCvFileUrl(row.id), row.resume_original_filename)}
        >
          Download CV
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="w-40">
          <select
            className="ui-field"
            value={row.status}
            onChange={async (e) => setRow(await adminPatchCvStatus(row.id, e.target.value))}
          >
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button
          type="button"
          className="ui-btn border border-red-200 text-red-700"
          onClick={async () => {
            if (!confirm("Are you sure you want to delete this CV submission?")) return;
            await adminDeleteCv(row.id);
            router.push("/admin/cvs");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
