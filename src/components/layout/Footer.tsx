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
      { href: "/careers", label: "Paid Training" },
      { href: "/apply", label: "Fresh Graduates" },
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
      { href: "/apply", label: "How to Apply" },
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
      <h3 className="font-display text-[13px] font-bold tracking-[0.08em] text-white uppercase">
        {title}
      </h3>
      <ul className="mt-2.5 space-y-1.5">
        {links.map((l) => (
          <li key={`${title}-${l.label}`}>
            <Link
              href={l.href}
              className="text-[13px] leading-snug text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
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
      <h3 className="font-display text-[13px] font-bold tracking-[0.08em] text-white uppercase">
        Subscribe
      </h3>
      <p className="mt-1 text-[13px] leading-snug text-white/85">
        Get open roles and hiring updates from {SITE.name}.
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-2.5 flex w-full min-w-0 items-center rounded-md bg-white py-1 pr-1 pl-3"
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
          className="min-w-0 flex-1 border-0 bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 pr-0.5 text-[10px] font-extrabold tracking-[0.06em] text-brand uppercase transition hover:text-ink sm:gap-2 sm:text-[11px]"
        >
          Subscribe
          <span className="grid h-7 w-7 place-items-center rounded-md bg-brand text-white">
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </button>
      </form>
      {status ? <p className="mt-1.5 text-xs text-white">{status}</p> : null}
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
    <a href={href} className="group flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-brand transition group-hover:bg-white/90">
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[9px] font-semibold tracking-[0.08em] text-white/75 uppercase">
          {label}
        </span>
        <span className="mt-0.5 block font-display text-[13px] font-semibold break-words text-white transition group-hover:text-white/90">
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
      <div className="bg-brand">
        <Container className="pt-8 pb-5 md:pt-9 md:pb-6">
          <div className="grid min-w-0 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] lg:gap-5 xl:gap-6">
            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label={`${SITE.name} home`}
              >
                <BrandLogo light className="h-8 w-auto" />
              </Link>
              <p className="mt-2.5 max-w-[17rem] text-[13px] leading-snug text-white/90">
                Pakistan-based IT delivery for US enterprise accounts — hiring,
                training, and operations under one roof.
              </p>
              <div className="mt-3">
                <SocialLinks light />
              </div>
            </div>

            {columns.map((col) => (
              <FooterColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-white/25 pt-4 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-3">
            <SubscribeBox />
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
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
                className="grid h-9 w-9 shrink-0 place-items-center self-start rounded-md border border-white bg-brand text-white transition hover:bg-white hover:text-brand sm:self-auto"
                aria-label="Back to top"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/20 bg-brand">
        <Container className="flex flex-col justify-center gap-1.5 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom,0px))] text-[11px] text-white/80 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p className="pr-36 sm:pr-40 md:pr-0">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-3.5 gap-y-1" aria-label="Legal">
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
