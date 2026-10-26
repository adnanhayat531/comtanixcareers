"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONFIG, SITE } from "@/lib/config";
import { SocialLinks } from "@/components/layout/SocialLinks";

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/life", label: `Life at ${SITE.name}` },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/sitemap.xml", label: "Sitemap" },
] as const;

const FOOTER_TAGLINE = "Technology. People. Progress.";
const FOOTER_BLURB =
  "We help businesses build, scale and innovate with technology and talented people.";

function ContactRow({
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
    <a href={href} className="group flex min-w-0 items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand/70 text-brand transition group-hover:border-brand group-hover:bg-brand/10">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.625rem] font-semibold tracking-[0.1em] text-white/65 uppercase">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-[0.875rem] font-semibold leading-tight text-white transition group-hover:text-white/90">
          {value}
        </span>
      </span>
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="relative shrink-0 text-white">
      <div className="site-petrol-gradient">
        <Container className="pt-10 pb-8 md:pt-12 md:pb-10">
          <div className="grid min-w-0 grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-0">
            {/* Brand */}
            <div className="min-w-0 lg:border-r lg:border-white/15 lg:pr-10">
              <Link
                href="/"
                className="inline-flex max-w-full items-center"
                aria-label={`${SITE.name} home`}
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <BrandLogo
                  light
                  className="h-9 w-auto max-w-[11rem] sm:h-11 sm:max-w-[14rem]"
                />
              </Link>
              <p className="mt-4 text-[0.9375rem] font-semibold tracking-wide text-brand">
                {FOOTER_TAGLINE}
              </p>
              <p className="type-meta mt-3 max-w-sm leading-relaxed text-white/80">
                {FOOTER_BLURB}
              </p>
              <div className="mt-6">
                <SocialLinks light circle large />
              </div>
            </div>

            {/* Company */}
            <div className="min-w-0 md:pl-2 lg:border-r lg:border-white/15 lg:px-10">
              <h3 className="type-eyebrow !font-extrabold tracking-[0.14em] text-white">
                Company
              </h3>
              <span
                className="mt-2 block h-0.5 w-10 rounded-full bg-brand"
                aria-hidden
              />
              <ul className="mt-5 space-y-2.5">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="type-meta inline-block leading-snug text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex min-w-0 flex-col justify-center gap-6 md:col-span-2 lg:col-span-1 lg:pl-10">
              <ContactRow
                href={`tel:+${CONFIG.whatsapp}`}
                label="Talk to HR"
                value={CONFIG.whatsappShow}
                icon={Phone}
              />
              <ContactRow
                href={`mailto:${CONFIG.email}`}
                label="Have any questions?"
                value={CONFIG.email}
                icon={Mail}
              />
            </div>
          </div>
        </Container>

        <div className="border-t border-white/15">
          <Container className="flex flex-col gap-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:justify-between">
            <p className="type-meta text-white/70">
              © {year} {SITE.name}. All rights reserved.
            </p>
            <nav
              className="flex flex-wrap items-center gap-x-0 gap-y-1 type-meta text-white/70"
              aria-label="Legal"
            >
              {LEGAL_LINKS.map((l, i) => (
                <span key={l.label} className="inline-flex items-center">
                  {i > 0 ? (
                    <span className="mx-2.5 text-white/35" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </nav>
          </Container>
        </div>
      </div>
    </footer>
  );
}
