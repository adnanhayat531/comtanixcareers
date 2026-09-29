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
      <h3 className="font-display text-xs font-extrabold tracking-[0.14em] text-white uppercase">
        {title}
      </h3>
      <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand" aria-hidden />
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={`${title}-${l.label}`}>
            <Link
              href={l.href}
              className="text-sm text-white/80 transition-colors hover:text-brand"
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
    <div className="mt-8">
      <h3 className="font-display text-xs font-extrabold tracking-[0.14em] text-white uppercase">
        Subscribe
      </h3>
      <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand" aria-hidden />
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">
        Get open roles and hiring updates from {SITE.name}.
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex max-w-sm overflow-hidden rounded-md shadow-soft">
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
          className="min-w-0 flex-1 border-0 bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-sea to-brand px-3 py-2.5 text-xs font-extrabold tracking-wide text-white uppercase transition hover:brightness-110"
        >
          Subscribe
          <span className="grid h-5 w-5 place-items-center rounded-sm bg-white/20">
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </button>
      </form>
      {status ? <p className="mt-2 text-xs text-brand">{status}</p> : null}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-white">
      {/* Logo palette: deep (#0b2c35) → sea → brand (#49A4AE) */}
      <div className="bg-gradient-to-br from-deep via-sea to-sea-mid">
        <Container className="pt-14 pb-10 md:pt-16 md:pb-12 lg:pt-20 lg:pb-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8 xl:gap-10">
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="inline-flex" aria-label={`${SITE.name} home`}>
                <BrandLogo light className="h-10 w-auto" />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                Trusted IT careers partner for US enterprise teams — training,
                mentoring, and dependable delivery every day.
              </p>
              <div className="mt-6">
                <SocialLinks light circle />
              </div>
              <SubscribeBox />
            </div>

            {columns.map((col) => (
              <FooterColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-brand/30 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-10 lg:gap-14">
            <a
              href={`tel:+${CONFIG.whatsapp}`}
              className="group flex items-center gap-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white shadow-brand">
                <Phone className="h-4 w-4" aria-hidden />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-[0.14em] text-white/60 uppercase">
                  Talk to hiring
                </span>
                <span className="font-display text-sm font-bold text-white transition group-hover:text-brand md:text-base">
                  {CONFIG.whatsappShow}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${CONFIG.email}`}
              className="group flex items-center gap-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white shadow-brand">
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-[0.14em] text-white/60 uppercase">
                  Have any questions?
                </span>
                <span className="font-display text-sm font-bold text-white transition group-hover:text-brand md:text-base">
                  {CONFIG.email}
                </span>
              </span>
            </a>
          </div>
        </Container>
      </div>

      <div className="border-t border-brand/25 bg-deep">
        <Container className="flex flex-col gap-3 py-4 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between md:text-sm">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-4 bottom-20 z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-brand bg-deep text-brand shadow-soft transition hover:bg-brand hover:text-white md:right-6 md:bottom-24"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </button>
    </footer>
  );
}
