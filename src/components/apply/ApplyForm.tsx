"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FileUp, RefreshCw, X } from "lucide-react";
import {
  fetchJobBySlug,
  fetchJobs,
  jobToRole,
  parseCareerCv,
  submitCareerCv,
  submitJobApplication,
  type UiRole,
} from "@/lib/api";
import {
  EXPERIENCE_OPTIONS,
  ROLE_INTEREST_OPTIONS,
  ROLES,
} from "@/lib/data/roles";

const fieldClass = "ui-field";

const labelClass = "type-label mb-1.5 block text-ink";

const CONFIRMATIONS = [
  {
    id: "confirm-night",
    name: "confirmNight",
    label: "I understand this is a night-shift role.",
  },
  {
    id: "confirm-onsite",
    name: "confirmOnsite",
    label: "I understand this is an onsite office job (not remote).",
  },
  {
    id: "confirm-location",
    name: "confirmLocation",
    label:
      "I can commute to Bahria Town Phase 8, Rawalpindi (Noor Heights).",
  },
] as const;

export type ApplyFormMode = "apply" | "cv";

function fallbackRoles(): UiRole[] {
  return ROLES.map((role) => ({
    id: role.id,
    title: role.title,
    summary: role.summary,
    detail: role.detail ?? role.summary,
    tags: role.tags,
    slug: role.id,
    jobId: "",
    applicationDeadline: null as string | null,
  }));
}

export function ApplyForm({ mode = "apply" }: { mode?: ApplyFormMode }) {
  const params = useSearchParams();
  const queryRole = params.get("role") ?? "";
  const [roles, setRoles] = useState<UiRole[]>(fallbackRoles);
  /** null = follow ?role= query; string = user/API selection (including ""). */
  const [roleOverride, setRoleOverride] = useState<string | null>(null);
  const role = roleOverride ?? queryRole;
  const [exp, setExp] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvName, setCvName] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [cvErr, setCvErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");
  const [pending, setPending] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parseNote, setParseNote] = useState("");
  const [cvInputKey, setCvInputKey] = useState(0);
  const [checks, setChecks] = useState({
    confirmNight: false,
    confirmOnsite: false,
    confirmLocation: false,
  });

  const isCv = mode === "cv";
  const idPrefix = isCv ? "cv" : "apply";
  const cvInputId = `${idPrefix}-cv-file`;
  const allChecked =
    checks.confirmNight && checks.confirmOnsite && checks.confirmLocation;

  function resetCvFields() {
    setCvName("");
    setCvFile(null);
    setCvErr("");
    setFullName("");
    setEmail("");
    setPhone("");
    setRoleOverride(isCv ? "" : null);
    setExp("");
    setParseNote("");
    setParsing(false);
    setCvInputKey((k) => k + 1);
  }

  function changeCvFile() {
    setCvErr("");
    const input = document.getElementById(cvInputId) as HTMLInputElement | null;
    if (!input) return;
    input.value = "";
    input.click();
  }

  function mapExperience(raw: string): string {
    const value = raw.trim().toLowerCase();
    if (!value) return "";
    if (value.includes("fresh") || value.includes("intern") || value.includes("entry")) {
      return "Fresher";
    }
    if (
      value.includes("less than 1") ||
      value.includes("0-1") ||
      value.includes("0 to 1") ||
      value === "1 year" ||
      value.includes("<1")
    ) {
      return "Less than 1 year";
    }
    if (
      value.includes("1 to 3") ||
      value.includes("1-3") ||
      value.includes("1–3") ||
      value.includes("2 year")
    ) {
      return "1 to 3 years";
    }
    if (
      value.includes("3 or more") ||
      value.includes("3+") ||
      value.includes("5+") ||
      value.includes("3-5") ||
      value.includes("4 year") ||
      value.includes("5 year")
    ) {
      return "3 or more years";
    }
    const exact = EXPERIENCE_OPTIONS.find((o) => o.toLowerCase() === value);
    return exact ?? "";
  }

  async function handleCvFile(file: File | undefined) {
    setCvErr("");
    setParseNote("");
    if (!file) {
      // Picker cancelled — keep the previously selected CV if any
      if (!cvFile) resetCvFields();
      return;
    }
    setCvName(file.name);
    setCvFile(file);
    setParsing(true);
    setParseNote("Reading your CV…");
    try {
      const parsed = await parseCareerCv(file);
      setFullName(parsed.name || "");
      setEmail(parsed.email || "");
      setPhone(parsed.phone || "");
      setExp(mapExperience(parsed.exp));
      if (isCv) {
        setRoleOverride(parsed.role || "General / future openings");
      } else if (!role && parsed.role) {
        const match = roles.find(
          (r) =>
            r.title.toLowerCase() === parsed.role.toLowerCase() ||
            r.slug.toLowerCase() === parsed.role.toLowerCase(),
        );
        if (match) setRoleOverride(match.title);
      }
      const filled = [parsed.name, parsed.email, parsed.phone].filter(Boolean)
        .length;
      setParseNote(
        filled > 0
          ? "We filled what we could from your CV. Edit anything that looks wrong."
          : "Could not auto-detect details from this file. Please fill the fields manually.",
      );
    } catch (err) {
      setParseNote(
        err instanceof Error
          ? `${err.message} Please fill the fields manually.`
          : "Could not read your CV. Please fill the fields manually.",
      );
    } finally {
      setParsing(false);
      requestAnimationFrame(() => {
        document.getElementById("cv-details")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const jobs = await fetchJobs({ cache: "no-store" });
        if (cancelled || !jobs.length) return;
        setRoles(jobs.map(jobToRole));
      } catch {
        /* keep static fallback roles */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Job details via GET /api/jobs/{slug} when an open role is chosen.
  useEffect(() => {
    if (isCv || !role) return;

    let cancelled = false;
    (async () => {
      try {
        const jobs = await fetchJobs({ cache: "no-store" });
        const match = jobs.find(
          (j) => j.title === role || j.slug === role || j.code === role,
        );
        if (!match) return;
        const detailed = await fetchJobBySlug(match.slug, { cache: "no-store" });
        if (cancelled || !detailed) return;
        const ui = jobToRole(detailed);
        setRoles((prev) => {
          const byId = new Map(prev.map((r) => [r.title, r]));
          byId.set(ui.title, ui);
          for (const job of jobs) {
            const mapped = jobToRole(job);
            if (!byId.has(mapped.title)) byId.set(mapped.title, mapped);
          }
          return Array.from(byId.values()).sort((a, b) =>
            a.title.localeCompare(b.title),
          );
        });
        if (ui.title !== role) setRoleOverride(ui.title);
      } catch {
        /* keep list data */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isCv, role]);

  async function resolveJobId(roleTitle: string): Promise<string> {
    const fromState = roles.find((r) => r.title === roleTitle)?.jobId;
    if (fromState) return fromState;

    const jobs = await fetchJobs({ cache: "no-store" });
    const match = jobs.find(
      (j) => j.title === roleTitle || j.slug === roleTitle || j.code === roleTitle,
    );
    if (!match) return "";
    const detailed = await fetchJobBySlug(match.slug, { cache: "no-store" });
    return detailed?.id ?? match.id;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCvErr("");
    setConfirmErr("");
    setStatus("");
    setStatusError(false);
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const emailValue = String(fd.get("email") ?? email).trim();
    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setStatusError(true);
      setStatus("Please enter a valid email address.");
      setPending(false);
      return;
    }
    if (!String(fd.get("name") ?? fullName).trim()) {
      setStatusError(true);
      setStatus("Please enter your full name.");
      setPending(false);
      return;
    }
    if (!String(fd.get("phone") ?? phone).trim()) {
      setStatusError(true);
      setStatus("Please enter your phone number.");
      setPending(false);
      return;
    }
    if (!isCv && !String(fd.get("role") ?? role).trim()) {
      setStatusError(true);
      setStatus("Please select an open role.");
      setPending(false);
      return;
    }

    if (
      !checks.confirmNight ||
      !checks.confirmOnsite ||
      !checks.confirmLocation
    ) {
      setConfirmErr(
        isCv
          ? "Please confirm night shift, onsite work, and Bahria Town Phase 8 location before submitting your CV."
          : "Please confirm night shift, onsite work, and Bahria Town Phase 8 location before applying.",
      );
      setPending(false);
      return;
    }

    let cv = fd.get("cv");
    if (
      (!(cv instanceof File) || !cv.name || cv.size === 0) &&
      cvFile
    ) {
      fd.set("cv", cvFile);
      cv = cvFile;
    }
    const hasCv = cv instanceof File && cv.name.length > 0 && cv.size > 0;

    if (!hasCv) {
      setCvErr("Please upload your CV to continue.");
      setPending(false);
      return;
    }

    if (!/\.(pdf|docx?)$/i.test(cv.name)) {
      setCvErr("Please upload a PDF or Word file (.pdf, .doc, .docx).");
      setPending(false);
      return;
    }

    if (cv.size > 5 * 1024 * 1024) {
      setCvErr("Your CV must be 5 MB or smaller.");
      setPending(false);
      return;
    }

    try {
      if (isCv) {
        const result = await submitCareerCv(fd);
        setStatus(
          result.message ||
            "CV received. We will review it for future openings.",
        );
      } else {
        const roleTitle = String(fd.get("role") ?? role);
        const jobId = await resolveJobId(roleTitle);
        if (!jobId) {
          throw new Error(
            "Selected open role was not found. Please choose a current opening.",
          );
        }
        const result = await submitJobApplication(jobId, fd);
        setStatus(
          result.message ||
            "Application received. Our team will contact you soon.",
        );
      }

      form.reset();
      setRoleOverride(isCv ? "" : null);
      setExp("");
      setFullName("");
      setEmail("");
      setPhone("");
      setCvName("");
      setCvFile(null);
      setParseNote("");
      setCvInputKey((k) => k + 1);
      setChecks({
        confirmNight: false,
        confirmOnsite: false,
        confirmLocation: false,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      const lower = message.toLowerCase();
      if (
        lower.includes("cv") ||
        lower.includes("pdf") ||
        lower.includes("word") ||
        lower.includes("upload") ||
        lower.includes("5 mb")
      ) {
        setCvErr(message);
      } else if (lower.includes("confirm")) {
        setConfirmErr(message);
      } else {
        setStatusError(true);
        setStatus(message);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid w-full max-w-none gap-8 lg:gap-10"
      noValidate
    >
      <input
        type="hidden"
        name="intent"
        value={isCv ? "cv-future" : "apply-current"}
      />

      <section className="min-w-0">
        <div className="mb-4 flex items-center gap-3">
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold ${
              allChecked
                ? "bg-brand text-white"
                : "bg-tint text-brand ring-1 ring-brand/25"
            }`}
          >
            1
          </span>
          <div className="min-w-0">
            <h3 className="type-label text-ink">Confirm role basics</h3>
            <p className="type-meta text-muted">
              All three required before upload
            </p>
          </div>
        </div>

        <ul className="grid divide-y divide-line/80 rounded-xl border border-line/80 bg-canvas/40 xl:grid-cols-3 xl:divide-x xl:divide-y-0">
          {CONFIRMATIONS.map((c) => (
            <li key={c.id} className="min-w-0">
              <label
                htmlFor={`${idPrefix}-${c.id}`}
                className="flex h-full cursor-pointer items-start gap-3 px-4 py-4 transition hover:bg-tint/50 sm:px-5"
              >
                <input
                  id={`${idPrefix}-${c.id}`}
                  name={c.name}
                  type="checkbox"
                  required
                  checked={checks[c.name]}
                  onChange={(e) => {
                    setConfirmErr("");
                    setChecks((prev) => ({
                      ...prev,
                      [c.name]: e.target.checked,
                    }));
                    if (!e.target.checked) resetCvFields();
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand accent-brand focus:ring-brand/30"
                />
                <span className="type-meta leading-snug text-ink">
                  {c.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
        {confirmErr ? (
          <p className="type-meta mt-2.5 font-medium text-red-700" role="alert">
            {confirmErr}
          </p>
        ) : null}
      </section>

      <section className="min-w-0">
        <div className="mb-4 flex items-center gap-3">
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold ${
              allChecked
                ? "bg-brand text-white"
                : "bg-canvas text-muted ring-1 ring-line"
            }`}
          >
            2
          </span>
          <div className="min-w-0">
            <h3 className="type-label text-ink">Upload CV</h3>
            <p className="type-meta text-muted">PDF or Word · max 5 MB</p>
          </div>
        </div>

        {cvName && !parsing ? (
          <div className="flex min-h-[10rem] flex-col items-center justify-center gap-3 rounded-xl border border-brand/30 bg-tint/25 px-6 py-8 text-center sm:min-h-[11rem]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-soft">
              <FileUp className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 max-w-full">
              <p className="type-body truncate font-medium text-ink">{cvName}</p>
              <p className="type-meta mt-0.5 text-muted">
                Selected — you can change it anytime
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={changeCvFile}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-brand px-3.5 py-2 type-meta font-semibold text-white transition hover:bg-deep"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                Change CV
              </button>
              <button
                type="button"
                onClick={resetCvFields}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-line bg-white px-3.5 py-2 type-meta font-medium text-ink transition hover:border-brand/40 hover:bg-tint/40"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Remove
              </button>
            </div>
            <input
              key={`cv-selected-${cvInputKey}`}
              id={cvInputId}
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(e) => {
                void handleCvFile(e.target.files?.[0]);
              }}
            />
          </div>
        ) : (
          <label
            htmlFor={cvInputId}
            aria-disabled={!allChecked}
            className={`flex min-h-[10rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-10 text-center transition sm:min-h-[11rem] ${
              allChecked
                ? "cursor-pointer border-brand/35 bg-tint/30 hover:border-brand hover:bg-tint/50"
                : "cursor-not-allowed border-line bg-canvas/50"
            }`}
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-full ${
                allChecked
                  ? "bg-white text-brand shadow-soft"
                  : "bg-white/70 text-muted"
              }`}
            >
              <FileUp className="h-5 w-5" aria-hidden />
            </span>
            <span className="type-body font-medium text-ink">
              {parsing
                ? "Reading your CV…"
                : allChecked
                  ? "Choose a file, or drop it here"
                  : "Unlocks after you confirm above"}
            </span>
            {!parsing && allChecked ? (
              <span className="type-meta text-muted">Browse your device</span>
            ) : null}
            <input
              key={
                allChecked
                  ? `cv-open-${cvInputKey}`
                  : `cv-locked-${cvInputKey}`
              }
              id={cvInputId}
              type="file"
              name="cv"
              required={allChecked}
              disabled={!allChecked || parsing}
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(e) => {
                void handleCvFile(e.target.files?.[0]);
              }}
            />
          </label>
        )}
        {cvErr ? (
          <p className="type-meta mt-2.5 font-medium text-red-700" role="alert">
            {cvErr}
          </p>
        ) : null}
      </section>

      {cvName || parsing ? (
        <section className="min-w-0" id="cv-details">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-[0.75rem] font-semibold text-white">
              3
            </span>
            <div className="min-w-0">
              <h3 className="type-label text-ink">Your details</h3>
              <p className="type-meta text-muted">
                Auto-filled from CV — edit if anything is wrong
              </p>
            </div>
          </div>

          {parseNote ? (
            <p className="type-meta mb-4 rounded-lg bg-tint/60 px-3 py-2 text-ink/80">
              {parseNote}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            <div className="min-w-0">
              <label className={labelClass} htmlFor={`${idPrefix}-name`}>
                Full name
              </label>
              <input
                id={`${idPrefix}-name`}
                name="name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                placeholder="Your full name"
                className={fieldClass}
              />
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor={`${idPrefix}-email`}>
                Email address
              </label>
              <input
                id={`${idPrefix}-email`}
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="name@example.com"
                className={fieldClass}
              />
            </div>
            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <label className={labelClass} htmlFor={`${idPrefix}-phone`}>
                Phone number
              </label>
              <input
                id={`${idPrefix}-phone`}
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                placeholder="03xx xxxxxxx"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
            <div className="min-w-0">
              <label className={labelClass} htmlFor={`${idPrefix}-role`}>
                {isCv ? "Role interest" : "Open role"}
              </label>
              <select
                id={`${idPrefix}-role`}
                name="role"
                required
                value={role}
                onChange={(e) => setRoleOverride(e.target.value)}
                className={`${fieldClass} ${role ? "text-ink" : "text-muted/65"}`}
              >
                <option value="">
                  {isCv ? "Select interest" : "Select open role"}
                </option>
                {role &&
                !roles.some((r) => r.title === role) &&
                (isCv
                  ? !(ROLE_INTEREST_OPTIONS as readonly string[]).includes(role)
                  : true) ? (
                  <option value={role}>{role}</option>
                ) : null}
                {roles.map((r) => (
                  <option key={r.id} value={r.title}>
                    {r.title}
                  </option>
                ))}
                {isCv
                  ? ROLE_INTEREST_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor={`${idPrefix}-exp`}>
                Experience
              </label>
              <select
                id={`${idPrefix}-exp`}
                name="exp"
                required
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                className={`${fieldClass} ${exp ? "text-ink" : "text-muted/65"}`}
              >
                <option value="" disabled>
                  Select experience
                </option>
                {exp &&
                !(EXPERIENCE_OPTIONS as readonly string[]).includes(exp) ? (
                  <option value={exp}>{exp}</option>
                ) : null}
                {EXPERIENCE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!isCv ? (
            <div className="mt-4 min-w-0">
              <label className={labelClass} htmlFor={`${idPrefix}-msg`}>
                Message{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id={`${idPrefix}-msg`}
                name="msg"
                rows={4}
                placeholder="Anything you’d like us to know"
                className={`${fieldClass} h-auto min-h-[110px] resize-y py-3 leading-relaxed`}
              />
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-line/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {status ? (
          <p
            className={`type-meta ${statusError ? "font-medium text-red-700" : "text-brand"}`}
            role={statusError ? "alert" : "status"}
          >
            {status}
          </p>
        ) : (
          <p className="type-meta text-muted">
            {!allChecked
              ? "Complete step 1 to continue."
              : !cvName
                ? "Upload your CV to continue."
                : parsing
                  ? "Reading your CV…"
                  : "Review the fields, then submit."}
          </p>
        )}
        <button
          type="submit"
          disabled={
            pending ||
            parsing ||
            !allChecked ||
            !cvName ||
            !fullName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            (!isCv && !role.trim())
          }
          className="ui-btn ui-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-45 sm:min-w-[12rem] sm:w-auto"
        >
          {pending
            ? "Submitting…"
            : isCv
              ? "Submit CV"
              : "Submit application"}
          {!pending ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
        </button>
      </div>
    </form>
  );
}
