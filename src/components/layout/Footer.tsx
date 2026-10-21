"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONFIG, SITE } from "@/lib/config";
import { SocialLinks } from "@/components/layout/SocialLinks";

const columns = [
  {
    title: "Careers",
    links: [
      { href: "/careers#openings", label: "Open Roles" },
      { href: "/apply", label: "Apply Now" },
      { href: "/submit-cv", label: "Submit CV" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about#story", label: "Our Story" },
      { href: "/about#values", label: "Core Values" },
      { href: "/about#learning", label: "Learning & Development" },
    ],
  },
  {
    title: "Life",
    links: [{ href: "/life", label: `Life at ${SITE.name}` }],
  },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div className="min-w-0 text-left">
      <h3 className="type-eyebrow text-white/90">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={`${title}-${l.label}`}>
            <Link
              href={l.href}
              className="type-meta inline-block leading-snug text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactChip({
  href,
  label,
  value,
  icon: Icon,
  compact = false,
}: {
  href: string;
  label: string;
  value: string;
  icon: typeof Phone;
  compact?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group flex min-w-0 items-center ${compact ? "gap-2" : "gap-3"}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-md bg-white text-[#08222b] transition group-hover:bg-white/90 ${
          compact ? "h-7 w-7" : "h-10 w-10 rounded-lg"
        }`}
      >
        <Icon className={compact ? "h-3 w-3" : "h-4 w-4"} aria-hidden />
      </span>
      <span className="min-w-0">
        <span
          className={`block text-white/65 ${
            compact
              ? "text-[0.625rem] font-semibold tracking-[0.08em] uppercase"
              : "type-eyebrow"
          }`}
        >
          {label}
        </span>
        <span
          className={`mt-0.5 block break-words text-white transition group-hover:text-white/90 ${
            compact
              ? "text-[0.75rem] font-semibold leading-tight"
              : "type-meta font-semibold"
          }`}
        >
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
      <div className="bg-footer">
        <Container className="pt-8 pb-6 md:pt-9 md:pb-8">
          <div className="flex min-w-0 flex-col gap-8 md:gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-8">
            <div className="flex min-w-0 shrink-0 flex-col items-start pt-3 sm:pt-4 lg:h-full lg:pt-5">
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
                <BrandLogo light className="h-9 w-auto max-w-[11rem] sm:h-11 sm:max-w-[14rem]" />
              </Link>
              <div className="mt-5 w-full max-w-full overflow-x-auto lg:mt-auto lg:pt-8">
                <SocialLinks light large />
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 text-left sm:grid-cols-3 sm:gap-x-10 lg:flex lg:flex-wrap lg:justify-start lg:gap-x-14">
              {columns.map((col) => (
                <FooterColumn key={col.title} title={col.title} links={col.links} />
              ))}
            </div>

            <div className="flex w-full min-w-0 max-w-md flex-col gap-5 sm:max-w-lg lg:ml-auto lg:max-w-[17rem] lg:justify-self-end">
              <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 min-[420px]:gap-2.5 lg:grid-cols-1 lg:gap-5">
                <ContactChip
                  compact
                  href={`tel:+${CONFIG.whatsapp}`}
                  label="Talk to hiring"
                  value={CONFIG.whatsappShow}
                  icon={Phone}
                />
                <ContactChip
                  compact
                  href={`mailto:${CONFIG.email}`}
                  label="Have any questions?"
                  value={CONFIG.email}
                  icon={Mail}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="theme-light border-t border-line bg-white">
        <Container className="type-meta py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] text-center text-muted">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
