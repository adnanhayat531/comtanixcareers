import { JobForm } from "@/components/admin/JobForm";

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Add Job</h1>
        <p className="type-meta mt-1 text-muted">Create a draft or publish immediately.</p>
      </div>
      <JobForm mode="create" />
    </div>
  );
}
