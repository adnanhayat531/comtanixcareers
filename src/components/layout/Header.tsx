"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  shortLabel,
  active,
  menu,
  onClick,
}: {
  href: string;
  label: string;
  shortLabel?: string;
  active?: boolean;
  menu?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={
        menu
          ? `flex min-h-11 items-center rounded-md px-3 text-base font-semibold tracking-tight transition-colors ${
              active ? "bg-tint text-brand" : "text-ink hover:bg-tint hover:text-brand"
            }`
          : `relative px-1.5 py-2 text-[13px] font-semibold tracking-tight transition-colors xl:px-2.5 xl:text-base ${
              active
                ? "text-brand after:absolute after:right-1.5 after:bottom-0 after:left-1.5 after:h-0.5 after:rounded-full after:bg-brand xl:after:right-2.5 xl:after:left-2.5"
                : "text-ink/85 hover:text-brand"
            }`
      }
    >
      {shortLabel ? (
        <>
          <span className="xl:hidden">{shortLabel}</span>
          <span className="hidden xl:inline">{label}</span>
        </>
      ) : (
        label
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const aboutRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMenu, setAboutMenu] = useState(false);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
    setAboutMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!aboutMenu) return;
    function onPointer(e: PointerEvent) {
      if (!aboutRef.current?.contains(e.target as Node)) setAboutMenu(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAboutMenu(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [aboutMenu]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dropLink =
    "flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-ink transition-colors hover:bg-tint hover:text-brand";

  const desktopLink = (active: boolean) =>
    `${"relative inline-flex min-h-11 items-center gap-1 px-1.5 text-[13px] font-semibold tracking-tight transition-colors xl:px-2.5 xl:text-base"} ${
      active
        ? "text-brand after:absolute after:right-1.5 after:bottom-1 after:left-1.5 after:h-0.5 after:rounded-full after:bg-brand xl:after:right-2.5 xl:after:left-2.5"
        : "text-ink/85 hover:text-brand"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 shadow-soft backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4 md:h-16 md:px-5 lg:px-4 xl:px-6">
        <Link
          href="/"
          className="min-w-0 shrink focus-visible:rounded-sm"
          aria-label={`${SITE.name} home`}
        >
          <BrandLogo className="h-7 w-auto sm:h-8 md:h-9" />
        </Link>

        <nav className="hidden min-w-0 items-center lg:flex" aria-label="Main">
          <NavLink href="/" label="Home" active={pathname === "/"} />

          <div className="relative" ref={aboutRef}>
            <button
              type="button"
              className={desktopLink(pathname.startsWith("/about"))}
              aria-expanded={aboutMenu}
              aria-controls="about-menu"
              onClick={() => setAboutMenu((v) => !v)}
            >
              About
              <ChevronDown
                className={`h-4 w-4 opacity-70 transition ${aboutMenu ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <div
              id="about-menu"
              className={`absolute left-0 top-full z-50 min-w-[240px] pt-2 ${
                aboutMenu ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="rounded-lg border border-line bg-surface p-2 shadow-[var(--shadow-overlay)]">
                <Link href="/about" className={dropLink} onClick={() => setAboutMenu(false)}>
                  About Us
                </Link>
                {aboutLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={dropLink}
                    onClick={() => setAboutMenu(false)}
                  >
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
            shortLabel="Life"
            active={pathname.startsWith("/life")}
          />
          <NavLink
            href="/contact"
            label="Contact"
            active={pathname.startsWith("/contact")}
          />

          <Button
            href="/apply"
            className="ml-2 !h-11 !min-h-11 !rounded-full !px-3.5 !text-sm xl:ml-3 xl:!px-4"
          >
            <span className="xl:hidden">Apply</span>
            <span className="hidden xl:inline">Apply Now</span>
          </Button>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Button
            href="/apply"
            className="!h-11 !min-h-11 !rounded-full !px-3.5 !text-sm"
          >
            Apply
          </Button>
          <button
            type="button"
            className="inline-flex h-11 min-h-11 items-center gap-2 rounded-full border border-line px-3 text-sm font-semibold text-ink transition hover:bg-tint"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-surface lg:hidden">
          <Container className="flex max-h-[calc(100dvh-3.5rem)] flex-col gap-1 overflow-y-auto py-3 pb-6">
            <NavLink menu href="/" label="Home" active={pathname === "/"} onClick={() => setOpen(false)} />

            <button
              type="button"
              className="flex min-h-11 items-center justify-between rounded-md px-3 text-left text-base font-semibold text-ink"
              onClick={() => setAboutOpen((v) => !v)}
              aria-expanded={aboutOpen}
            >
              About
              <ChevronDown className={`h-5 w-5 transition ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen ? (
              <div className="grid">
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-md px-5 text-base text-muted hover:bg-tint hover:text-brand"
                >
                  About Us
                </Link>
                {aboutLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-md px-5 text-base text-muted hover:bg-tint hover:text-brand"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <NavLink menu href="/careers" label="Careers" onClick={() => setOpen(false)} />
            <NavLink menu href="/life" label={`Life at ${SITE.name}`} onClick={() => setOpen(false)} />
            <NavLink menu href="/contact" label="Contact" onClick={() => setOpen(false)} />
            <Button href="/apply" className="mt-4 w-full rounded-full">
              Apply Now <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
