"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CONFIG, SITE, waLink } from "@/lib/config";
import { EXPERIENCE_OPTIONS, ROLES } from "@/lib/data/roles";

export function ApplyForm() {
  const params = useSearchParams();
  const [role, setRole] = useState("");
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

  const field =
    "h-11 w-full rounded-md border border-line bg-surface px-3.5 font-body text-[15px] font-normal leading-none text-ink placeholder:text-muted/80 transition focus:border-sea focus:outline-none focus:ring-[3px] focus:ring-sea/15";
  const area =
    "w-full resize-y rounded-md border border-line bg-surface px-3.5 py-3 font-body text-[15px] font-normal leading-relaxed text-ink placeholder:text-muted/80 transition focus:border-sea focus:outline-none focus:ring-[3px] focus:ring-sea/15";
  const labelCls =
    "grid gap-2 font-body text-[13px] font-semibold tracking-wide text-ink";

  return (
    <form onSubmit={onSubmit} className="grid w-full max-w-xl gap-5" noValidate>
      <fieldset className="grid gap-4 rounded-lg border border-line bg-surface p-5 md:p-6">
        <legend className="px-1 font-display text-[13px] font-bold tracking-wide text-sea uppercase">
          Candidate details
        </legend>
        <label className={labelCls}>
          Full name
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={field}
          />
        </label>
        <label className={labelCls}>
          Phone number
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="03xx xxxxxxx"
            className={field}
          />
        </label>
      </fieldset>

      <fieldset className="grid gap-4 rounded-lg border border-line bg-surface p-5 md:p-6">
        <legend className="px-1 font-display text-[13px] font-bold tracking-wide text-sea uppercase">
          Role preference
        </legend>
        <label className={labelCls}>
          Position
          <select
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={field}
          >
            <option value="">Select a role</option>
            {ROLES.map((r) => (
              <option key={r.id} value={r.title}>
                {r.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>
        <label className={labelCls}>
          Experience
          <select name="exp" required className={field} defaultValue="">
            <option value="" disabled>
              Select experience
            </option>
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <fieldset className="grid gap-4 rounded-lg border border-line bg-surface p-5 md:p-6">
        <legend className="px-1 font-display text-[13px] font-bold tracking-wide text-sea uppercase">
          Supporting materials
        </legend>
        <label className={labelCls}>
          Upload your CV
          <input
            type="file"
            name="cv"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="mt-0.5 block w-full font-body text-sm font-normal text-ink file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-sea file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-sea-mid"
            onChange={() => setCvErr("")}
          />
          <span className="font-normal text-[12px] leading-snug text-muted">
            Required. PDF or Word (.pdf, .doc, .docx), max 5 MB.
          </span>
        </label>
        {cvErr ? (
          <p className="rounded-md bg-red-50 px-3 py-2 font-body text-sm font-medium text-red-700" role="alert">
            {cvErr}
          </p>
        ) : null}
        <label className={labelCls}>
          Message
          <textarea
            name="msg"
            rows={3}
            placeholder="Optional — anything you’d like us to know"
            className={area}
          />
        </label>
      </fieldset>

      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? "Submitting…" : "Submit"}
      </Button>

      {status ? (
        <p
          className="rounded-md border border-line bg-tint px-4 py-3 font-body text-sm leading-relaxed text-ink"
          role="status"
        >
          {status}
        </p>
      ) : null}
    </form>
  );
}
