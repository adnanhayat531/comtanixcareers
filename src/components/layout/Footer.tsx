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

const SOCIAL_ORDER = ["LinkedIn", "Facebook", "Instagram"] as const;

const FOOTER_TAGLINE = "Technology. People. Progress.";

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

/** Hex mark paths (logo geometry) — reused for multi-shade stack */
const MARK_HEX =
  "M16 0 L51 0 L68 29 L52 59 L15 59 L0 28 Z M43 14 L52 30 L42 45 L34 30 Z";
const MARK_FACET = "M26 14 L43 14 L34 30 L42 45 L25 45 L16 30 Z";

/** Drawn mark + left multi-shade layers (chevron / offset hexs) */
function FooterBrandMark() {
  const layers = [
    { x: -118, body: "#00363C", facet: "#004248", opacity: 0.55 },
    { x: -78, body: "#003E44", facet: "#004E54", opacity: 0.7 },
    { x: -40, body: "#004A50", facet: "#005C64", opacity: 0.85 },
    { x: 0, body: "#00555C", facet: "#006B74", opacity: 1 },
  ] as const;

  return (
    <div
      className="pointer-events-none absolute inset-y-0 -left-[220%] right-0 flex items-center justify-end xl:-left-[260%]"
      aria-hidden
    >
      <svg
        viewBox="-130 0 210 60"
        className="h-[min(100%,15rem)] w-auto max-w-none select-none"
        preserveAspectRatio="xMaxYMid meet"
      >
        {layers.map((layer) => (
          <g key={layer.x} transform={`translate(${layer.x} 0)`} opacity={layer.opacity}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill={layer.body}
              d={MARK_HEX}
            />
            <path fill={layer.facet} d={MARK_FACET} />
          </g>
        ))}
      </svg>
    </div>
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
        <Container className="relative z-[1] py-7 md:py-8">
          <div className="relative grid min-w-0 w-full grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[72%_28%] lg:items-stretch lg:gap-0">
            {/* Content block — stays above decorative mark layers */}
            <div className="relative z-[1] grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-0">
            {/* Brand — left */}
            <div
              className="flex min-w-0 flex-col items-start lg:border-r lg:pr-6 xl:pr-8"
              style={{ borderColor: `${CYAN}33` }}
            >
              <Link
                href="/"
                className="inline-flex max-w-full items-center self-start"
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
                  className="h-8 w-auto max-w-[10.5rem] object-left sm:h-9 sm:max-w-[12rem]"
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
              <p className="mt-2.5 max-w-[16.5rem] text-[0.75rem] leading-snug text-white/70">
                Technology and operational expertise spanning AI, software,
                cloud, cybersecurity, and core business functions.
              </p>
            </div>

            {/* Company — middle */}
            <div
              className="min-w-0 lg:flex lg:justify-start lg:border-r lg:pl-6 lg:pr-4 xl:pl-8 xl:pr-6"
              style={{ borderColor: `${CYAN}33` }}
            >
              <div className="min-w-0 text-left">
                <h3 className="text-[0.6875rem] font-extrabold leading-none tracking-[0.16em] text-white uppercase">
                  Company
                </h3>
                <span
                  className="mt-1 ml-0 block h-0.5 w-8 self-start rounded-full"
                  style={{ backgroundColor: CYAN }}
                  aria-hidden
                />
                <ul className="mt-1.5 space-y-1">
                  {COMPANY_LINKS.map((l) => (
                    <li key={l.label} className="leading-snug">
                      <Link
                        href={l.href}
                        className="inline-block text-[0.8125rem] leading-snug text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact + socials near divider — right side kept open for logo design */}
            <div className="relative flex min-w-0 flex-col lg:h-full lg:items-start lg:pl-6 xl:pl-8">
              <div className="flex w-full max-w-[18rem] flex-1 flex-col gap-6 sm:gap-7">
                <ContactRow
                  href={`tel:+${CONFIG.whatsapp}`}
                  label="Get in Touch"
                  value={CONFIG.whatsappShow}
                  icon={Phone}
                />
                <ContactRow
                  href={`mailto:${CONFIG.email}`}
                  label="Email Us"
                  value={CONFIG.email}
                  icon={Mail}
                />
                <div className="mt-auto flex items-center justify-start gap-2">
                  {socials.map(({ name, url }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      title={name}
                      className="grid h-8 w-8 place-items-center rounded-full border transition hover:bg-white/10 sm:h-9 sm:w-9"
                      style={{ borderColor: `${CYAN}99`, color: CYAN }}
                    >
                      <FooterSocialIcon name={name} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            </div>

            {/* Large brand mark + multi-shade stack into left empty zone */}
            <div
              className="pointer-events-none relative z-0 hidden min-h-0 min-w-0 items-center justify-center self-stretch overflow-visible lg:flex"
              aria-hidden
            >
              <FooterBrandMark />
            </div>
          </div>
        </Container>

        <div
          className="relative z-[1] border-t"
          style={{ borderColor: `${CYAN}28`, backgroundColor: TEAL_BAR }}
        >
          <Container className="py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] text-center">
            <p className="text-[0.75rem] text-white/65">
              © {year} {SITE.name}. All rights reserved.
            </p>
          </Container>
        </div>
      </div>
    </footer>
  );
}
