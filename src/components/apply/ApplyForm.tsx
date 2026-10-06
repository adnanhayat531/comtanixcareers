"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FileUp } from "lucide-react";
import { CONFIG, SITE, waLink } from "@/lib/config";
import { EXPERIENCE_OPTIONS, ROLES } from "@/lib/data/roles";

const fieldClass =
  "box-border h-11 w-full rounded-md border border-line bg-white px-3.5 font-body text-[15px] text-ink outline-none transition placeholder:text-muted/65 focus:border-brand focus:ring-1 focus:ring-brand/25";

const labelClass =
  "mb-1.5 block font-body text-[13px] font-semibold tracking-wide text-ink";

export function ApplyForm() {
  const params = useSearchParams();
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [cvName, setCvName] = useState("");
  const [status, setStatus] = useState("");
  const [cvErr, setCvErr] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const q = params.get("role");
    if (q) setRole(q);
  }, [params]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCvErr("");
    setStatus("");
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
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
          setStatus("Application received. Our team will contact you soon.");
          form.reset();
          setRole("");
          setExp("");
          setCvName("");
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

    const text =
      `Job application - ${SITE.name}\nName: ${name}\nPhone: ${phone}\nPosition: ${position}\nExperience: ${experience}` +
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
            Position
          </label>
          <select
            id="apply-role"
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`${fieldClass} ${role ? "text-ink" : "text-muted/65"}`}
          >
            <option value="">Select a role</option>
            {ROLES.map((r) => (
              <option key={r.id} value={r.title}>
                {r.title}
              </option>
            ))}
            <option value="Other">Other</option>
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
          <span className="min-w-0 truncate text-[15px] text-ink">
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
          <p className="mt-1.5 text-sm font-medium text-red-700" role="alert">
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

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {status ? (
          <p className="text-sm leading-relaxed text-brand" role="status">
            {status}
          </p>
        ) : (
          <p className="text-sm text-muted">
            We’ll confirm next steps after review.
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-6 text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-60 sm:w-auto md:text-[15px]"
        >
          {pending ? "Submitting…" : "Submit application"}
          {!pending ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
        </button>
      </div>
    </form>
  );
}
