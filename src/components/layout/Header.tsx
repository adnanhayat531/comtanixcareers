"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/ui/Section";
import { SITE } from "@/lib/config";

const aboutLinks = [
  { href: "/about#story", label: "Our Story" },
  { href: "/about#values", label: "Core Values" },
  { href: "/about#learning", label: "Learning & Development" },
];

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`relative px-2.5 py-1.5 text-base font-semibold tracking-tight transition-colors xl:px-3 ${
        active
          ? "text-brand after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-0.5 after:rounded-full after:bg-brand"
          : "text-ink/85 hover:text-brand"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dropLink =
    "block rounded-md px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-tint hover:text-brand";

  const desktopLink = (active: boolean) =>
    `${"relative inline-flex items-center gap-1 px-2.5 py-1.5 text-base font-semibold tracking-tight transition-colors xl:px-3"} ${
      active
        ? "text-brand after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-0.5 after:rounded-full after:bg-brand"
        : "text-ink/85 hover:text-brand"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 shadow-soft backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between gap-4 px-3 sm:px-4 md:h-16 md:px-5 lg:px-6">
        <Link
          href="/"
          className="shrink-0 focus-visible:rounded-sm"
          aria-label={`${SITE.name} home`}
        >
          <BrandLogo className="h-8 w-auto md:h-9" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          <NavLink href="/" label="Home" active={pathname === "/"} />

          <div className="relative group">
            <Link
              href="/about"
              className={desktopLink(pathname.startsWith("/about"))}
              aria-current={pathname.startsWith("/about") ? "page" : undefined}
            >
              About
              <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
            </Link>
            <div className="invisible absolute left-0 top-full z-50 min-w-[240px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-lg border border-line bg-surface p-2 shadow-[var(--shadow-overlay)]">
                {aboutLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={dropLink}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink
            href="/careers"
            label="Careers"
            active={pathname.startsWith("/careers")}
          />
          <NavLink
            href="/life"
            label={`Life at ${SITE.name}`}
            active={pathname.startsWith("/life")}
          />
          <NavLink
            href="/contact"
            label="Contact"
            active={pathname.startsWith("/contact")}
          />

          <Button
            href="/apply"
            className="ml-3 !h-9 !min-h-9 !rounded-full !px-4 !text-sm md:!h-9 md:!min-h-9 md:!px-4 md:!text-sm"
          >
            Apply Now
          </Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            href="/apply"
            className="hidden !h-8 !min-h-8 !rounded-full !px-3 !text-sm md:!h-8 md:!min-h-8 md:!px-3 md:!text-sm sm:inline-flex"
          >
            Apply
          </Button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm font-semibold text-ink transition hover:bg-tint"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-surface lg:hidden">
          <Container className="flex max-h-[calc(100dvh-3.5rem)] flex-col gap-0.5 overflow-y-auto py-3 pb-6">
            <NavLink href="/" label="Home" active={pathname === "/"} onClick={() => setOpen(false)} />

            <button
              type="button"
              className="flex items-center justify-between px-3 py-3 text-left text-[15px] font-semibold text-ink"
              onClick={() => setAboutOpen((v) => !v)}
              aria-expanded={aboutOpen}
            >
              About
              <ChevronDown className={`h-5 w-5 transition ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen
              ? aboutLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-5 py-2.5 text-sm text-muted hover:bg-tint hover:text-brand"
                  >
                    {l.label}
                  </Link>
                ))
              : null}

            <NavLink href="/careers" label="Careers" onClick={() => setOpen(false)} />
            <NavLink href="/life" label={`Life at ${SITE.name}`} onClick={() => setOpen(false)} />
            <NavLink href="/contact" label="Contact" onClick={() => setOpen(false)} />
            <Button href="/apply" className="mt-4 w-full rounded-full">
              Apply Now <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
