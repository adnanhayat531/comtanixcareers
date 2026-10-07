"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUp, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONFIG, SITE } from "@/lib/config";
import { SocialLinks } from "@/components/layout/SocialLinks";

const columns = [
  {
    title: "Careers",
    links: [
      { href: "/careers", label: "Open Roles" },
      { href: "/apply", label: "Apply Now" },
      { href: "/submit-cv", label: "Submit CV" },
      { href: "/careers", label: "Paid Training" },
      { href: "/careers", label: "Experienced Hires" },
    ],
  },
  {
    title: "Life",
    links: [
      { href: "/life", label: `Life at ${SITE.name}` },
      { href: "/life", label: "Team Culture" },
      { href: "/life", label: "Sports & Events" },
      { href: "/about#learning", label: "Learning Path" },
      { href: "/life", label: "Perks & Benefits" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about#story", label: "Our Story" },
      { href: "/about#values", label: "Core Values" },
      { href: "/about#learning", label: "Development" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/submit-cv", label: "How to Submit CV" },
      { href: "/contact", label: "Hiring Team" },
      { href: "/careers", label: "Role Guides" },
      { href: "/life", label: "Office Life" },
      { href: "/contact", label: "FAQs" },
    ],
  },
] as const;

const legalLinks = [
  { href: "/contact", label: "Privacy Policy" },
  { href: "/contact", label: "Terms of Use" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="type-eyebrow text-white/90">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={`${title}-${l.label}`}>
            <Link
              href={l.href}
              className="type-meta leading-snug text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubscribeBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    const subject = encodeURIComponent(`${SITE.name} careers updates`);
    const body = encodeURIComponent(
      `Please add me to ${SITE.name} career updates.\nEmail: ${email.trim()}`,
    );
    window.location.href = `mailto:${CONFIG.careersEmail}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app…");
    setEmail("");
  }

  return (
    <div className="w-full max-w-sm shrink-0">
      <h3 className="type-eyebrow text-white/90">Subscribe</h3>
      <p className="type-meta mt-2 leading-snug text-white/75">
        Get open roles and hiring updates from {SITE.name}.
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-4 flex w-full min-w-0 items-center rounded-lg bg-white py-1 pr-1 pl-3.5"
      >
        <label className="sr-only" htmlFor="footer-email">
          Email
        </label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="type-meta min-w-0 flex-1 border-0 bg-transparent py-2 text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="type-eyebrow inline-flex shrink-0 items-center gap-1 pr-0.5 text-brand transition hover:text-ink sm:gap-2"
          aria-label="Subscribe"
        >
          <span className="hidden min-[360px]:inline">Subscribe</span>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </button>
      </form>
      {status ? <p className="type-meta mt-2 text-white">{status}</p> : null}
    </div>
  );
}

function ContactChip({
  href,
  label,
  value,
  icon: Icon,
}: {
  href: string;
  label: string;
  value: string;
  icon: typeof Phone;
}) {
  return (
    <a href={href} className="group flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-brand transition group-hover:bg-white/90">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="type-eyebrow block text-white/65">{label}</span>
        <span className="type-meta mt-0.5 block font-semibold break-words text-white transition group-hover:text-white/90">
          {value}
        </span>
      </span>
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative shrink-0 text-white">
      <div className="bg-footer">
        <Container className="pt-14 pb-8 md:pt-16 md:pb-10">
          <div className="grid min-w-0 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] lg:gap-8 xl:gap-10">
            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label={`${SITE.name} home`}
              >
                <BrandLogo light className="h-9 w-auto" />
              </Link>
              <p className="type-meta mt-4 max-w-[18rem] leading-relaxed text-white/80">
                Pakistan-based IT delivery for global enterprises — hiring,
                training, and operations under one roof.
              </p>
              <div className="mt-5">
                <SocialLinks light />
              </div>
            </div>

            {columns.map((col) => (
              <FooterColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-8 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 sm:gap-y-4">
            <SubscribeBox />
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <ContactChip
                href={`tel:+${CONFIG.whatsapp}`}
                label="Talk to hiring"
                value={CONFIG.whatsappShow}
                icon={Phone}
              />
              <ContactChip
                href={`mailto:${CONFIG.email}`}
                label="Have any questions?"
                value={CONFIG.email}
                icon={Mail}
              />
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="grid h-10 w-10 shrink-0 place-items-center self-start rounded-lg border border-white/40 bg-transparent text-white transition hover:bg-white hover:text-brand sm:self-auto"
                aria-label="Back to top"
              >
                <ArrowUp className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/10 bg-deep">
        <Container className="type-meta flex flex-col justify-center gap-2 py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p className="pr-16 sm:pr-20 md:pr-0">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Legal">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
