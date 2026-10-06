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
    "flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-ink transition-colors hover:bg-tint hover:text-brand";

  const desktopLink = (active: boolean) =>
    `${"relative inline-flex min-h-11 items-center gap-1 px-1.5 text-[13px] font-semibold tracking-tight transition-colors xl:px-2.5 xl:text-base"} ${
      active
        ? "text-brand after:absolute after:right-1.5 after:bottom-1 after:left-1.5 after:h-0.5 after:rounded-full after:bg-brand xl:after:right-2.5 xl:after:left-2.5"
        : "text-ink/85 hover:text-brand"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="flex h-14 w-full items-center justify-between gap-2 pl-2 pr-3 sm:gap-3 sm:pl-3 sm:pr-4 md:h-16 md:pl-3 md:pr-5 lg:pl-4 lg:pr-6 xl:pl-5 xl:pr-10 2xl:pl-6 2xl:pr-14">
        <Link
          href="/"
          className="min-w-0 shrink focus-visible:rounded-sm"
          aria-label={`${SITE.name} home`}
        >
          <BrandLogo className="h-9 w-auto sm:h-10 md:h-11" />
        </Link>

        <nav className="hidden min-w-0 items-center lg:flex" aria-label="Main">
          <NavLink href="/" label="Home" active={pathname === "/"} />

          <div className="group relative">
            <Link
              href="/about"
              className={desktopLink(pathname.startsWith("/about"))}
              aria-current={pathname.startsWith("/about") ? "page" : undefined}
              aria-haspopup="menu"
            >
              About
              <ChevronDown
                className="h-4 w-4 opacity-70 transition group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden
              />
            </Link>
            <div
              id="about-menu"
              role="menu"
              className="invisible absolute left-0 top-full z-[60] min-w-[240px] pt-1 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            >
              <div className="rounded-lg border border-line bg-surface p-2">
                <Link href="/about" className={dropLink} role="menuitem">
                  About Us
                </Link>
                {aboutLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={dropLink} role="menuitem">
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

          <Button href="/apply" className="ml-2 !h-9 !min-h-9 !px-3.5 !text-sm xl:ml-3 xl:!px-4">
            <span className="xl:hidden">Apply</span>
            <span className="hidden xl:inline">Apply</span>
          </Button>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Button href="/apply" className="!h-9 !min-h-9 !px-3.5 !text-sm">
            Apply
          </Button>
          <button
            type="button"
            className="inline-flex h-9 min-h-9 items-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-ink transition hover:bg-tint"
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
            <Button href="/apply" className="mt-4 w-full">
              Apply <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
