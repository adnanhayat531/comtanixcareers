"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONFIG, SITE } from "@/lib/config";

const CYAN = "#1EBDC0";
const TEAL_DEEP = "#003B3B";
const TEAL_MID = "#004848";
const TEAL_BAR = "#002E2E";

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

/** LinkedIn → Facebook → Instagram — once each, matching reference */
const SOCIAL_ORDER = ["LinkedIn", "Facebook", "Instagram"] as const;

const FOOTER_TAGLINE = "Technology. People. Progress.";
const FOOTER_BLURB =
  "We help businesses build, scale and innovate with technology and talented people.";

const SOCIAL_PATHS: Record<string, string> = {
  Facebook:
    "M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z",
  LinkedIn:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
};

function FooterSocialIcon({ name }: { name: (typeof SOCIAL_ORDER)[number] }) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  );
}

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
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white transition group-hover:brightness-110"
        style={{ backgroundColor: CYAN }}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.8125rem] font-bold tracking-wide text-white">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-[0.8125rem] leading-snug text-white/75 transition group-hover:text-white">
          {value}
        </span>
      </span>
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  const socials = SOCIAL_ORDER.flatMap((name) => {
    const url = CONFIG.socials[name];
    return url ? [{ name, url }] : [];
  });

  return (
    <footer className="relative shrink-0 overflow-hidden text-white">
      <div
        className="relative"
        style={{
          background: `linear-gradient(165deg, ${TEAL_MID} 0%, ${TEAL_DEEP} 48%, #002929 100%)`,
        }}
      >
        {/* Subtle geometric chevron — far right */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(28%,18rem)] opacity-[0.07] lg:block"
          aria-hidden
        >
          <svg viewBox="0 0 200 320" className="h-full w-full" preserveAspectRatio="xMaxYMid meet">
            <path
              d="M40 40 L160 160 L40 280"
              fill="none"
              stroke={CYAN}
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 55 L110 160 L5 265"
              fill="none"
              stroke={CYAN}
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            />
          </svg>
        </div>

        <Container className="relative z-[1] py-7 md:py-8">
          <div className="grid min-w-0 w-full grid-cols-1 items-start gap-7 sm:gap-8 lg:grid-cols-3 lg:gap-0">
            {/* Brand */}
            <div className="min-w-0 lg:border-r lg:pr-8 xl:pr-12" style={{ borderColor: `${CYAN}33` }}>
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
                  className="h-8 w-auto max-w-[10.5rem] sm:h-9 sm:max-w-[12rem]"
                />
              </Link>
              <p className="mt-3 text-[0.875rem] font-medium tracking-wide text-white">
                {FOOTER_TAGLINE}
              </p>
              <span
                className="mt-2.5 block h-px w-9"
                style={{ backgroundColor: CYAN }}
                aria-hidden
              />
              <p className="mt-2.5 max-w-sm text-[0.8125rem] leading-relaxed text-white/75">
                {FOOTER_BLURB}
              </p>
              <div className="mt-4 flex items-center gap-2">
                {socials.map(({ name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="grid h-8 w-8 place-items-center rounded-full border transition hover:bg-white/10"
                    style={{ borderColor: `${CYAN}99`, color: CYAN }}
                  >
                    <FooterSocialIcon name={name} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company — fill middle column free space */}
            <div
              className="min-w-0 lg:border-r lg:px-8 xl:px-12"
              style={{ borderColor: `${CYAN}33` }}
            >
              <div className="min-w-0 w-full">
                <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-white uppercase">
                  Company
                </h3>
                <span
                  className="mt-2 block h-0.5 w-8 rounded-full"
                  style={{ backgroundColor: CYAN }}
                  aria-hidden
                />
                <ul className="mt-3.5 grid grid-cols-2 gap-x-6 gap-y-2 sm:gap-x-8 sm:gap-y-2.5">
                  {COMPANY_LINKS.map((l) => (
                    <li key={l.label} className="min-w-0">
                      <Link
                        href={l.href}
                        className="inline-block max-w-full text-[0.8125rem] leading-snug text-white/85 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact — pinned to the right of the third column */}
            <div className="flex min-w-0 flex-col justify-center gap-6 lg:items-end lg:pl-8 xl:pl-12">
              <div className="flex w-full max-w-[18rem] flex-col gap-6 sm:gap-7 lg:ml-auto">
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
          </div>
        </Container>

        <div className="relative z-[1] border-t" style={{ borderColor: `${CYAN}28`, backgroundColor: TEAL_BAR }}>
          <Container className="flex flex-col gap-2 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-[0.75rem] text-white/65">
              © {year} {SITE.name}. All rights reserved.
            </p>
            <nav
              className="flex flex-wrap items-center text-[0.75rem] text-white/65"
              aria-label="Legal"
            >
              {LEGAL_LINKS.map((l, i) => (
                <span key={l.label} className="inline-flex items-center">
                  {i > 0 ? (
                    <span className="mx-2 text-white/30" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <Link href={l.href} className="transition-colors hover:text-white">
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
