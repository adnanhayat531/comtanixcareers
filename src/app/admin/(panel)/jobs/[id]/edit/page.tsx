"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { JobForm } from "@/components/admin/JobForm";
import { adminGetJob, type AdminJob } from "@/lib/admin-api";

export default function EditJobPage() {
  const params = useParams<{ id: string }>();
  const [job, setJob] = useState<AdminJob | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGetJob(params.id)
      .then(setJob)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [params.id]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!job) return <p className="text-muted">Loading job…</p>;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Edit Job</h1>
        <p className="type-meta mt-1 text-muted">
          Update content, status, and application ending date.
        </p>
      </div>
      <JobForm mode="edit" initial={job} />
    </div>
  );
}
