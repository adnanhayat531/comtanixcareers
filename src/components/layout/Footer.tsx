import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONFIG, SITE } from "@/lib/config";
import { SocialLinks } from "@/components/layout/SocialLinks";

const footerNav = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: `/life`, label: `Life At ${SITE.name}` },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white">
      {/* Main footer */}
      <div className="bg-deep">
        <Container className="grid gap-10 py-12 md:grid-cols-2 md:gap-12 lg:gap-16 lg:py-14">
          {/* Left — logo + socials */}
          <div>
            <Link href="/" className="inline-flex" aria-label={`${SITE.name} home`}>
              <BrandLogo light className="h-10 w-auto" />
            </Link>
            <p className="mt-2 text-xs text-white/55">
              {SITE.name} — {SITE.tagline}
            </p>
            <div className="mt-6">
              <SocialLinks light circle />
            </div>
          </div>

          {/* Right — nav + copy + emails */}
          <div>
            <nav
              className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90 md:gap-x-6"
              aria-label="Footer"
            >
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75">
              {SITE.description} We train, support, and grow people who ship
              reliable outcomes every day — from software engineering to IT
              operations and customer care.
            </p>

            <div className="mt-8 flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:items-center sm:gap-0">
              <a
                href={`mailto:${CONFIG.email}`}
                className="transition-colors hover:text-brand"
              >
                {CONFIG.email}
              </a>
              <span className="mx-3 hidden text-white/40 sm:inline" aria-hidden>
                |
              </span>
              <a
                href={`mailto:${CONFIG.careersEmail}`}
                className="transition-colors hover:text-brand"
              >
                {CONFIG.careersEmail}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright bar */}
      <div className="bg-[#0f2a2a] py-4 text-center text-xs text-white/70 md:text-sm">
        <p>
          Copyright © {year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
