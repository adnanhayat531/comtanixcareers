"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FileUp } from "lucide-react";
import { CONFIG, SITE, waLink } from "@/lib/config";
import { EXPERIENCE_OPTIONS, ROLES } from "@/lib/data/roles";

const fieldClass =
  "type-body box-border h-11 w-full rounded-md border border-line bg-white px-3.5 text-ink outline-none transition placeholder:text-muted/65 focus:border-brand focus:ring-1 focus:ring-brand/25";

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

export function ApplyForm({ mode = "apply" }: { mode?: ApplyFormMode }) {
  const params = useSearchParams();
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [cvName, setCvName] = useState("");
  const [status, setStatus] = useState("");
  const [cvErr, setCvErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");
  const [pending, setPending] = useState(false);
  const [checks, setChecks] = useState({
    confirmNight: false,
    confirmOnsite: false,
    confirmLocation: false,
  });

  const isCv = mode === "cv";

  useEffect(() => {
    const q = params.get("role");
    if (q) setRole(q);
  }, [params]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCvErr("");
    setConfirmErr("");
    setStatus("");
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

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

    const cv = fd.get("cv");
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

    if (CONFIG.formEndpoint) {
      try {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setStatus(
            isCv
              ? "CV received. We will review it for future openings."
              : "Application received. Our team will contact you soon.",
          );
          form.reset();
          setRole("");
          setExp("");
          setCvName("");
          setChecks({
            confirmNight: false,
            confirmOnsite: false,
            confirmLocation: false,
          });
          setPending(false);
          return;
        }
      } catch {
        /* fall through to WhatsApp */
      }
    }

    const name = String(fd.get("name") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const position = String(fd.get("role") ?? "");
    const experience = String(fd.get("exp") ?? "");
    const msg = String(fd.get("msg") ?? "").trim();

    const text = isCv
      ? `CV submission - ${SITE.name} (future openings only)\nName: ${name}\nPhone: ${phone}\nInterest: ${position}\nExperience: ${experience}` +
        `\nConfirmed: Night shift · Onsite · Bahria Town Phase 8` +
        (msg ? `\nNote: ${msg}` : "") +
        `\nCV: ${cv.name} (sending it in this chat)`
      : `Job application - ${SITE.name} (current opening)\nName: ${name}\nPhone: ${phone}\nPosition: ${position}\nExperience: ${experience}` +
        `\nConfirmed: Night shift · Onsite · Bahria Town Phase 8` +
        (msg ? `\nNote: ${msg}` : "") +
        `\nCV: ${cv.name} (sending it in this chat)`;

    window.open(waLink(text), "_blank", "noopener");
    setStatus(
      `WhatsApp opened. Press Send, then attach your CV (“${cv.name}”) using the paperclip and choose Document.`,
    );
    setPending(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid w-full max-w-xl gap-4"
      noValidate
    >
      <input type="hidden" name="intent" value={isCv ? "cv-future" : "apply-current"} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={labelClass} htmlFor="apply-name">
            Full name
          </label>
          <input
            id="apply-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClass}
          />
        </div>
        <div className="min-w-0">
          <label className={labelClass} htmlFor="apply-phone">
            Phone number
          </label>
          <input
            id="apply-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="03xx xxxxxxx"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={labelClass} htmlFor="apply-role">
            {isCv ? "Role interest" : "Open role"}
          </label>
          <select
            id="apply-role"
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`${fieldClass} ${role ? "text-ink" : "text-muted/65"}`}
          >
            <option value="">
              {isCv ? "Select interest" : "Select open role"}
            </option>
            {ROLES.map((r) => (
              <option key={r.id} value={r.title}>
                {r.title}
              </option>
            ))}
            {isCv ? (
              <>
                <option value="General / future openings">
                  General / future openings
                </option>
                <option value="Other">Other</option>
              </>
            ) : null}
          </select>
        </div>
        <div className="min-w-0">
          <label className={labelClass} htmlFor="apply-exp">
            Experience
          </label>
          <select
            id="apply-exp"
            name="exp"
            required
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            className={`${fieldClass} ${exp ? "text-ink" : "text-muted/65"}`}
          >
            <option value="" disabled>
              Select experience
            </option>
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="min-w-0">
        <span className={labelClass} id="apply-cv-label">
          Upload CV
        </span>
        <label
          htmlFor="apply-cv"
          aria-labelledby="apply-cv-label"
          className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-dashed border-line bg-white px-3.5 py-2.5 transition hover:border-brand/50 hover:bg-tint/40 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/25"
        >
          <FileUp className="h-4 w-4 shrink-0 text-brand" aria-hidden />
          <span className="type-body min-w-0 truncate text-ink">
            {cvName || "PDF or Word (.pdf, .doc, .docx), max 5 MB"}
          </span>
          <input
            id="apply-cv"
            type="file"
            name="cv"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => {
              setCvErr("");
              const file = e.target.files?.[0];
              setCvName(file?.name ?? "");
            }}
          />
        </label>
        {cvErr ? (
          <p className="type-meta mt-1.5 font-medium text-red-700" role="alert">
            {cvErr}
          </p>
        ) : null}
      </div>

      <div className="min-w-0">
        <label className={labelClass} htmlFor="apply-msg">
          Message <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="apply-msg"
          name="msg"
          rows={4}
          placeholder="Anything you’d like us to know"
          className={`${fieldClass} h-auto min-h-[120px] resize-y py-3 leading-relaxed`}
        />
      </div>

      <fieldset className="min-w-0 rounded-md border border-line bg-tint/50 px-4 py-4">
        <legend className="type-label px-1 text-ink">
          {isCv ? "Confirm before you submit" : "Confirm before you apply"}
        </legend>
        <p className="type-meta mt-1 text-muted">
          {isCv
            ? "Please read and check each point. Only submit your CV if all three fit you."
            : "Please read and check each point. Only apply if all three fit you."}
        </p>
        <ul className="mt-3 space-y-2.5">
          {CONFIRMATIONS.map((c) => (
            <li key={c.id}>
              <label
                htmlFor={`${mode}-${c.id}`}
                className="type-meta flex cursor-pointer items-start gap-2.5 leading-snug text-ink"
              >
                <input
                  id={`${mode}-${c.id}`}
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
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand accent-brand focus:ring-brand/30"
                />
                <span>{c.label}</span>
              </label>
            </li>
          ))}
        </ul>
        {confirmErr ? (
          <p className="type-meta mt-2.5 font-medium text-red-700" role="alert">
            {confirmErr}
          </p>
        ) : null}
      </fieldset>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {status ? (
          <p className="type-meta text-brand" role="status">
            {status}
          </p>
        ) : (
          <p className="type-meta text-muted">
            {isCv
              ? "We review CVs for future openings."
              : "We’ll confirm next steps after review."}
          </p>
        )}
        <button
          type="submit"
          disabled={
            pending ||
            !checks.confirmNight ||
            !checks.confirmOnsite ||
            !checks.confirmLocation
          }
          className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-6 font-display text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Submitting…" : isCv ? "Submit CV" : "Submit application"}
          {!pending ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
        </button>
      </div>
    </form>
  );
}
