"use client";

import { useSearchParams } from "next/navigation";

export function ApplyPageHeading() {
  const params = useSearchParams();
  const role = (params.get("role") ?? "").trim();

  return (
    <div className="mb-5 max-w-3xl sm:mb-7">
      <p className="type-eyebrow text-brand">Current openings</p>
      {role ? (
        <>
          <p className="type-meta mt-2 text-muted">Applying for</p>
          <h1 className="type-h2 mt-1 text-balance text-ink">{role}</h1>
        </>
      ) : (
        <h1 className="type-h2 mt-2 text-ink">Apply for an open role.</h1>
      )}
      <p className="type-body mt-2.5 text-muted">
        {role
          ? "Confirm the job facts, upload your CV, and send your application."
          : "Choose a listed opening, confirm the job facts, and send your application."}{" "}
        Looking for later roles?{" "}
        <a
          href="/submit-cv"
          className="font-semibold text-brand underline-offset-2 hover:underline"
        >
          Submit your CV
        </a>{" "}
        for the talent pool.
      </p>
    </div>
  );
}
