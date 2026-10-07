"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { CONFIG, SITE, waLink } from "@/lib/config";

const fieldClass =
  "type-body box-border h-11 w-full rounded-lg border border-line bg-white px-3.5 text-ink outline-none transition placeholder:text-muted/65 focus:border-brand focus:ring-1 focus:ring-brand/25";

const labelClass = "type-label mb-1.5 block text-ink";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("");
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (CONFIG.formEndpoint) {
      try {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setStatus("Message sent. We’ll get back to you soon.");
          form.reset();
          setPending(false);
          return;
        }
      } catch {
        /* fall through */
      }
    }

    const text =
      `Contact form - ${SITE.name}\nName: ${name}\nEmail: ${email}` +
      (subject ? `\nSubject: ${subject}` : "") +
      `\nMessage: ${message}`;

    window.open(waLink(text), "_blank", "noopener");
    setStatus("Opening WhatsApp to send your message…");
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid w-full gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
        <div className="min-w-0">
          <label className={labelClass} htmlFor="contact-name">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Full name"
            className={fieldClass}
            autoComplete="name"
          />
        </div>
        <div className="min-w-0">
          <label className={labelClass} htmlFor="contact-email">
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            className={fieldClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="min-w-0">
        <label className={labelClass} htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
          className={fieldClass}
        />
      </div>

      <div className="min-w-0">
        <label className={labelClass} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Write your message"
          className={`${fieldClass} h-auto min-h-[140px] resize-y py-3 leading-relaxed`}
        />
      </div>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {status ? (
          <p className="type-meta text-brand" role="status">
            {status}
          </p>
        ) : (
          <p className="type-meta text-muted">We typically reply within one business day.</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-6 font-display text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Sending…" : "Submit"}
          {!pending ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
        </button>
      </div>
    </form>
  );
}
