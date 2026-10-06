"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FileUp } from "lucide-react";
import { CONFIG, SITE, waLink } from "@/lib/config";
import { EXPERIENCE_OPTIONS, ROLES } from "@/lib/data/roles";

const fieldClass =
  "w-full rounded-lg border border-line bg-white px-5 py-3.5 text-base text-ink outline-none ring-0 placeholder:text-muted/70 transition focus:border-brand focus:ring-1 focus:ring-brand/25";

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
    const exp = String(fd.get("exp") ?? "");
    const msg = String(fd.get("msg") ?? "").trim();

    const text =
      `Job application - ${SITE.name}\nName: ${name}\nPhone: ${phone}\nPosition: ${position}\nExperience: ${exp}` +
      (msg ? `\nNote: ${msg}` : "") +
      `\nCV: ${cv.name} (sending it in this chat)`;

    window.open(waLink(text), "_blank", "noopener");
    setStatus(
      `WhatsApp opened. Press Send, then attach your CV (“${cv.name}”) using the paperclip and choose Document.`,
    );
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="apply-name">
          Full name
        </label>
        <input
          id="apply-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Full name*"
          className={fieldClass}
        />
        <label className="sr-only" htmlFor="apply-phone">
          Phone number
        </label>
        <input
          id="apply-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Phone number*"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="apply-role">
          Position
        </label>
        <select
          id="apply-role"
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`${fieldClass} ${role ? "text-ink" : "text-muted/70"}`}
        >
          <option value="">Position*</option>
          {ROLES.map((r) => (
            <option key={r.id} value={r.title}>
              {r.title}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        <label className="sr-only" htmlFor="apply-exp">
          Experience
        </label>
        <select
          id="apply-exp"
          name="exp"
          required
          value={exp}
          onChange={(e) => setExp(e.target.value)}
          className={`${fieldClass} ${exp ? "text-ink" : "text-muted/70"}`}
        >
          <option value="" disabled>
            Experience*
          </option>
          {EXPERIENCE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="apply-cv"
          className="flex cursor-pointer flex-col items-start gap-2 rounded-lg border border-dashed border-line bg-white px-5 py-4 transition hover:border-brand/50 hover:bg-tint/40 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/25"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <FileUp className="h-4 w-4 text-brand" aria-hidden />
            {cvName ? "CV selected" : "Upload your CV*"}
          </span>
          <span className="text-sm text-muted">
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
          <p className="mt-2 text-sm font-medium text-red-700" role="alert">
            {cvErr}
          </p>
        ) : null}
      </div>

      <label className="sr-only" htmlFor="apply-msg">
        Message
      </label>
      <textarea
        id="apply-msg"
        name="msg"
        rows={4}
        placeholder="Optional message — anything you’d like us to know"
        className={`${fieldClass} min-h-[120px] resize-y`}
      />

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {status ? (
          <p className="text-sm leading-relaxed text-brand" role="status">
            {status}
          </p>
        ) : (
          <span className="hidden text-sm text-muted sm:block">
            We’ll confirm next steps after review.
          </span>
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center gap-2 self-end rounded-md bg-brand px-6 text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-60 md:h-11 md:text-[15px]"
        >
          {pending ? "Submitting…" : "Submit application"}
          {!pending ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
        </button>
      </div>
    </form>
  );
}
