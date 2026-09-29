"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { CONFIG, SITE, waLink } from "@/lib/config";

const fieldClass =
  "w-full rounded-2xl border-0 bg-white px-5 py-4 text-base text-ink shadow-soft outline-none ring-0 placeholder:text-muted/70 transition focus:shadow-[var(--shadow-brand)] focus:ring-2 focus:ring-brand/30";

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
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="contact-name">
          Your Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your Name*"
          className={fieldClass}
          autoComplete="name"
        />
        <label className="sr-only" htmlFor="contact-email">
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="Email Address*"
          className={fieldClass}
          autoComplete="email"
        />
      </div>

      <label className="sr-only" htmlFor="contact-subject">
        Subject
      </label>
      <input
        id="contact-subject"
        name="subject"
        type="text"
        placeholder="Subject"
        className={fieldClass}
      />

      <label className="sr-only" htmlFor="contact-message">
        Your message
      </label>
      <textarea
        id="contact-message"
        name="message"
        required
        rows={5}
        placeholder="Your message"
        className={`${fieldClass} min-h-[140px] resize-y`}
      />

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {status ? (
          <p className="text-sm text-brand" role="status">
            {status}
          </p>
        ) : (
          <span className="hidden sm:block" />
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-[52px] items-center justify-center gap-2 self-end rounded-full bg-brand px-8 text-base font-bold text-white transition hover:brightness-105 disabled:opacity-60 md:h-[56px] md:text-lg"
        >
          Submit <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}
