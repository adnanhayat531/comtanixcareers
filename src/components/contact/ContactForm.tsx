"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { submitContact } from "@/lib/api";

const fieldClass = "ui-field";

const labelClass = "type-label mb-1.5 block text-ink";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("");
    setStatusError(false);
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const result = await submitContact(fd);
      setStatus(result.message || "Message sent. We’ll get back to you soon.");
      form.reset();
    } catch (err) {
      setStatusError(true);
      setStatus(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again.",
      );
    } finally {
      setPending(false);
    }
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
          className={`${fieldClass} ui-field-area`}
        />
      </div>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {status ? (
          <p
            className={`type-meta ${statusError ? "font-medium text-red-700" : "text-brand"}`}
            role={statusError ? "alert" : "status"}
          >
            {status}
          </p>
        ) : (
          <p className="type-meta text-muted">We typically reply within one business day.</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="ui-btn ui-btn-primary w-full sm:w-auto"
        >
          {pending ? "Sending…" : "Submit"}
          {!pending ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
        </button>
      </div>
    </form>
  );
}
