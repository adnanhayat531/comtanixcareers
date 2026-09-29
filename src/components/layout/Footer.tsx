"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUp, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONFIG, SITE, mapsLink } from "@/lib/config";
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
              className="text-sm text-white/80 underline-offset-4 transition-colors hover:text-brand hover:underline"
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
    <div className="w-full">
      <h3 className="font-display text-xs font-extrabold tracking-[0.14em] text-white uppercase sm:text-left">
        Subscribe
      </h3>
      <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand sm:mx-0 mx-auto" aria-hidden />
      <p className="mt-2 text-sm leading-snug text-white/70 sm:text-left">
        Get open roles and hiring updates from {SITE.name}.
      </p>
      <form onSubmit={onSubmit} className="mt-3 flex max-w-md overflow-hidden rounded-md sm:mx-0 mx-auto">
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
          className="inline-flex items-center gap-2 bg-sea px-3 py-2.5 text-xs font-extrabold tracking-wide text-white uppercase transition hover:brightness-110"
        >
          Subscribe
          <span className="grid h-5 w-5 place-items-center rounded-sm bg-brand">
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
    <footer className="relative shrink-0 text-white">
      <div className="bg-deep">
        <Container className="pt-12 pb-10 md:pt-14 md:pb-12 lg:pt-16 lg:pb-14">
          {/* Top: brand + link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="inline-flex" aria-label={`${SITE.name} home`}>
                <BrandLogo light className="h-10 w-auto" />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                Trusted IT careers partner for US enterprise teams — training,
                mentoring, and dependable delivery every day.
              </p>
              <div className="mt-5">
                <SocialLinks light circle />
              </div>
            </div>

            {columns.map((col) => (
              <FooterColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </div>

          {/* Bottom band — dense, even, no empty pockets */}
          <div className="mt-8 border-t border-white/15 pt-8 md:mt-10 md:pt-9">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              <a
                href={`tel:+${CONFIG.whatsapp}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center transition hover:border-brand/40 hover:bg-white/[0.07]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-2.5 block text-[10px] font-extrabold tracking-[0.14em] text-white/55 uppercase">
                  Talk to hiring
                </span>
                <span className="mt-1 font-display text-[15px] font-bold text-white transition group-hover:text-brand">
                  {CONFIG.whatsappShow}
                </span>
              </a>

              <a
                href={`mailto:${CONFIG.email}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center transition hover:border-brand/40 hover:bg-white/[0.07]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-2.5 block text-[10px] font-extrabold tracking-[0.14em] text-white/55 uppercase">
                  Have any questions?
                </span>
                <span className="mt-1 break-all font-display text-[15px] font-bold text-white transition group-hover:text-brand">
                  {CONFIG.email}
                </span>
              </a>

              <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-2.5 block text-[10px] font-extrabold tracking-[0.14em] text-white/55 uppercase">
                  Office
                </span>
                <p className="mt-1 max-w-[220px] text-sm leading-snug text-white/85">
                  {CONFIG.address}
                </p>
                <a
                  href={mapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  View on map
                </a>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
                  <Clock3 className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-2.5 block text-[10px] font-extrabold tracking-[0.14em] text-white/55 uppercase">
                  Working hours
                </span>
                <p className="mt-1 max-w-[220px] text-sm leading-snug text-white/85">
                  {CONFIG.hours}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:text-left lg:mt-5">
              <div className="min-w-0 flex-1 sm:max-w-md sm:text-left">
                <SubscribeBox />
              </div>
              <div className="shrink-0 text-center sm:text-right">
                <p className="text-sm text-white/70">
                  Ready to start your US-process career?
                </p>
                <Link
                  href="/apply"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-bold text-white transition hover:brightness-110"
                >
                  Apply Now <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-[#0b2222]">
        <Container className="flex flex-col gap-2 py-3.5 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between md:text-sm">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Legal">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="underline-offset-4 transition-colors hover:text-brand hover:underline"
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
        className="absolute right-4 bottom-[4.5rem] z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-brand text-brand transition hover:bg-brand hover:text-white md:right-6"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" aria-hidden />
      </button>
    </footer>
  );
}
